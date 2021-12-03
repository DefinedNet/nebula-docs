---
title: Extend access beyond overlay network hosts with unsafe_routes
slug: unsafe_routes
summary: This guide explains how to configure Nebula to route traffic destined for a specific subnet through a specific overlay network host, which is useful for accessing hosts that cannot be modified to run Nebula.
---

# Extend access beyond overlay network hosts with unsafe_routes

This guide explains how to configure Nebula to route traffic destined for a specific subnet through a specific overlay network host.

This is especially useful for accessing hosts that cannot be modified to run Nebula, such as printers, physical access control systems, and other proprietary devices on which you cannot install arbitrary software.

## Prerequisites

_Read the [Quick Start](quick-start) guide to learn how to create your first overlay network._

You will need a working overlay network with at least one lighthouse and the following to complete this guide.

1.  `nebula-cert` binary to sign host certificates
1.  The ca.key and ca.crt files for the working overlay network
1.  Root access to a Linux host on the network that will route traffic using `unsafe_routes`
1.  Root access to a Linux, macOS, or Windows host on a different network than the Linux host that will route traffic.`

This guide assumes that you have the directory for the `nebula` and `nebula-cert` binaries in your `$PATH`.

You will also need to confirm that your CA is able to sign host certificates with the metadata required to route traffic using `unsafe_routes`. If you didn't specify `-subnets` when creating your CA you're good to go. To confirm, run the following from the directory containing your CA cert.

```shell
nebula-cert print -path ca.crt
```

If _Subnets_ is an empty set or if it contains the CIDR that you want to access, you are good to go.

Here's an example of a CA generated without specifying any subnets.

_Tip: Add a `-json` flag to the `nebula-cert print` command and pipe the output to `jq`._

```json
nebula-cert print -json -path ca.crt | jq .details
{
  "groups": [],
  "ips": [],
  "isCa": true,
  "issuer": "",
  "name": "BK Labs",
  "notAfter": "2022-12-02T19:21:05-05:00",
  "notBefore": "2021-12-02T19:21:05-05:00",
  "publicKey": "50dd6fb1d2c02f17ddfeb017fe1bf16cf69d42ec28e8a2e02fde5ad2f944f136",
  "subnets": []
}
```

## Example Network

The following IP addresses, hostnames, and subnets are used throughout this guide to illustate a valid configuration for our use case.

### Home network

This is the subnet that we want to be able to access remotely over our Nebula overlay.

- `192.168.86.0/24` (192.168.86.1–192.168.86.254)
- The Linux host routing traffic from Nebula using `unsafe_routes` is connected to this network

| LAN Host IP     | LAN Hostname  | Overlay Hostname | Description                                    |
| --------------- | ------------- | ---------------- | ---------------------------------------------- |
| `192.168.86.10` | `raspi.lan`   | `home-raspi`     | Linux host running Nebula and routing traffic  |
| `192.168.86.5`  | `printer.lan` | (none)           | Printer on Home network that cannot run Nebula |

### Overlay network

This is the overlay network that will be used by hosts running Nebula.

- `192.168.100.0/24` (192.168.100.1–192.168.86.254)
- The macOS host in this example has Internet access but it not on the same, physical LAN as the Linux host.

| Overlay Host IP  | Overlay Hostname | Description                                             |
| ---------------- | ---------------- | ------------------------------------------------------- |
| `192.168.100.10` | `home-raspi`     | Linux host on Home network                              |
| `192.168.100.11` | `laptop-mac`     | Mac host that will access printer using `unsafe_routes` |

## Steps to configure Nebula hosts to work with unsafe_routes

Using the example network and hosts referenced above, the following steps explain how to configure the macOS host (`laptop-mac`, `192.168.100.11`) to route traffic through the Linux host (`home-raspi`, `192.168.100.10`) in order to reach home printer from anywhere.

### Step 1. Sign cert with subnets you want to route

From the same directory containing our CA cert (ca.crt) and key (ca.key), run the following command to sign a new cert for our Linux host that will be routing traffic to the home network.

```shell
nebula-cert sign -name 'home-raspi' -ip '192.168.100.10/24' -subnets '192.168.86.0/24'
```

Inspect the new certificate to confirm that `subnets` is now correctly set to the Home LAN CIDR.

```shell
nebula-cert print -json -path home-raspi.crt | jq .details
{
  "groups": [],
  "ips": [
    "192.168.100.10/24"
  ],
  "isCa": false,
  "issuer": "57903a07e52a8f5464636aeccb1942560324dcd1f6c4f0457d77b00372b5d9f2",
  "name": "home-raspi",
  "notAfter": "2022-12-02T19:21:04-05:00",
  "notBefore": "2021-12-03T11:19:38-05:00",
  "publicKey": "defd2478b4818659d21d862a7dc51a6630fce8fc1fafdec1026c6552f01c0655",
  "subnets": [
    "192.168.86.0/24"
  ]
}
```

Next, copy the new host certificate and key over to the Linux host that will handle the routing.

```shell
scp home-raspi.crt home-raspi.key raspi.lan:
home-raspi.crt                 100%  320    12.9KB/s   00:00
home-raspi.key                 100%  127     4.5KB/s   00:00
```

We'll get to the config file that will reference that host and key file shortly.

### Step 2. Enable IP forwarding on Linux host on home LAN

Linux hosts need a kernel parameter set in order to allow packet forwarding. This is not typically enabled by default as shown in the following read example.

```shell
sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 0
```

Here's how you update that variable at runtime.

```shell
sudo sysctl -w net.ipv4.ip_forward=1
net.ipv4.ip_forward = 1
```

Note: This change is only persistent until you reboot. To make it permanent, add a new line with `net.ipv4.ip_forward = 1` to the end of the `/etc/sysctl.conf` file.

### Step 3. Configure iptables on Linux host on home LAN

Now that IP forwarding is enabled, we need to add a few iptables rules so that our Linux host running Nebula will be able to act as a NAT and masquerade as the other Nebula nodes that are using `unsafe_routes` to connect through the Linux host to any host on the local LAN.

Run the following commands to add the rules specific to our example networks.

```shell
sudo iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -d 192.168.86.0/24 -j MASQUERADE
sudo iptables -I FORWARD 1 -s 192.168.100.0/24 -d 192.168.86.0/24 -j ACCEPT
sudo iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
```

Once complete, you can confirm that the new rules are active by running the following.

This first list shows the second and third rule.
```shell
sudo iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination
ACCEPT     all  --  192.168.100.0/24     192.168.86.0/24
ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

And this command shows the first rule, specific to the NAT table.

```shell
sudo iptables -t nat -L
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination

Chain INPUT (policy ACCEPT)
target     prot opt source               destination

Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination
MASQUERADE  all  --  192.168.100.0/24     192.168.86.0/24

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```
You may see additional rules listed depending on your host and whether or not you've modified it.

Note: These rules will only be persistent until you reboot the host. Depending on your distribution, you need to run additional commands to save these rules to disk and load them at boot.

### Step 4. Edit config on other nodes to tell them where to route

..

## Notes and related guides

..
