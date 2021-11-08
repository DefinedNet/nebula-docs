---
title: "Configuration Reference"
description: "Nebula Docs: Configuration variables and example values for the config.yaml file, which is located on every Nebula overlay network host"
slug: 'config'
locale: 'en'
---

# Configuration reference guide for Nebula

This section documents all available options within the standard Nebula configuration file, organized by section.

## `pki`

<span class="mt-16 badge badge-info">Required</span>

PKI defines the location of credentials for this node. Each of these can also be inlined by using the yaml ": |" syntax.

**_Example PKI_**

```yaml
pki:
  ca: /etc/nebula/ca.crt
  cert: /etc/nebula/host.crt
  key: /etc/nebula/host.key
  blocklist:
    - c99d4e650533b92061b09918e838a5a0a6aaee21eed1d12fd937682865936c72
```

Each line is explained below

### `ca`

<span class="mt-16 badge badge-info">Required</span>

The ca is a collection of one or more certificate authorities this host should trust. In the above example, `/etc/nebula/ca.crt` contains PEM-encoded data for each CA we should trust, concatenated into a single file.

### `cert`

<span class="mt-16 badge badge-info">Required</span>

The cert is a certificate unique to every host on a Nebula network. The certificate identifies a host's IP address, name, and group membership within a Nebula network. The certificate is signed by a certificate authority when created, which informs other hosts on whether to trust a particular host certificate.

### `key`

<span class="mt-16 badge badge-info">Required</span>

The key is a private key unique to every host on a Nebula network. It is used in conjunction with the host certificate to prove a host's identity to other members of the Nebula network. The private key should never be shared with other hosts.

### `blocklist`

The blocklist contains a list of individual host certificates to ignore. In the case a host's credentials are stolen or compromised, this allows us to block connectivity from a host, even if it is signed by a certificate authority we trust.

<hr />

## `static_host_map`

The static host map defines a set of hosts with fixed IP addresses on the internet (or any network).
A host can have multiple fixed IP addresses defined here, and nebula will try each when establishing a tunnel.
The syntax is:

`"<nebula ip>": ["<routable ip/dns name>:<routable port>"]`

Example, if your lighthouse has the nebula IP of 192.168.100.1 and has the real ip address of 100.64.22.11 and runs on port 4242:

**_Example static_host_map_**

```yaml
static_host_map:
  "192.168.100.1": ["100.64.22.11:4242"]
```

<hr />

## `lighthouse`

**_Example lighthouse_**

```yaml
lighthouse:
  am_lighthouse: false
  serve_dns: true
  dns:
    host: 0.0.0.0
    port: 53
  interval: 60
  hosts:
    - "192.168.100.1"

  remote_allow_list:
    "172.16.0.0/12": false
    "0.0.0.0/0": true
    "10.0.0.0/8": false
    "10.42.42.0/24": true

  local_allow_list:
    interfaces:
      tun0: false
      "docker.*": false
    "10.0.0.0/8": true
```

### `am_lighthouse`

am_lighthouse is used to enable lighthouse functionality for a node. This should ONLY be `true` on nodes you have configured to be lighthouses in your network

### `serve_dns`

serve_dns optionally starts a dns listener that responds to various queries and can even be delegated to for name resolution by external dns hosts. additonally, you can specify the address and port to listen on via the nested options. This option can be enabled on any host, but is most likely to be useful on a lighthouse server.

### `interval`

interval specifies how often a nebula host should report itself to a lighthouse. By default, hosts report themselves to lighthouses once every 60 seconds. Use caution when changing this interval, as it may affect host discovery times in a large nebula network.

### `hosts`

**IMPORTANT: THIS SHOULD BE EMPTY ON LIGHTHOUSE NODES**

hosts is a list of lighthouse hosts this node should report to and query from. The lighthouses listed here should be referenced by their **nebula IP**, not by the IPs of their physical network interfaces.

### `remote_allow_list`

remote_allow_list allows you to control ip ranges that this node will consider when handshaking to another node. By default, any remote IPs are allowed. You can provide CIDRs here with `true` to allow and `false` to deny. The most specific CIDR rule applies to each remote. If all rules are "allow", the default will be "deny", and vice-versa. If both "allow" and "deny" rules are present, then you MUST set a rule for "0.0.0.0/0" as the default.

### `local_allow_list`

local_allow_list allows you to filter which local IP addresses we advertise to the lighthouses. This uses the same logic as `remote_allow_list`, but additionally, you can specify an `interfaces` map of regular expressions to match against interface names. The regexp must match the entire name. All interface rules must be either true or false (and the default will be the inverse). CIDR rules are matched after interface name rules. Default is all local IP addresses.

<hr />

## `listen`

listen sets the UDP port Nebula will use for sending/receiving traffic and for handshakes. The default here is 4242. For a lighthouse node, the port should be defined, however using port 0 will dynamically assign a port and is recommended for roaming nodes.

**_Example listen_**

```yaml
listen:
  host: 0.0.0.0
  port: 4242
  batch: 64
  read_buffer: 10485760
  write_buffer: 10485760
```

### `host`

host is the ip of the interface to use when binding the listener. the default is 0.0.0.0, which is what most people should use.

### `port`

port is the UDP port nebula should use on a host. setting this to 0 will dynamically assign a port number.

### `batch`, `read_buffer`, `write_buffer`

Configure socket buffers for the udp side (outside), leave unset to use the system defaults. Values will be doubled by the kernel. Default is `net.core.rmem_default` and `net.core.wmem_default` (`/proc/sys/net/core/rmem_default` and `/proc/sys/net/core/rmem_default`). Maximum is limited by memory in the system, `SO_RCVBUFFORCE` and `SO_SNDBUFFORCE` is used to avoid having to raise the system wide max, `net.core.rmem_max` and `net.core.wmem_max`

<hr />

## `punchy`

punchy configures the sending of inbound/outbound packets at a regular interval to avoid expiration of firewall nat mappings

**_Example punchy_**

```yaml
punchy:
  punch: true
  respond: true
  delay: 1s
```

### `punch`

punch enables is functionality, which causes the node to send small packets at the regular interval

### `respond`

respond means that a node unable to receive handshakes will attempt to initiate a handshake to the host attempting to establish a tunnel, which can be the case when hole punching fails in one direction. This can be extremely useful if one node is behind a difficult nat, such as a symmetric NAT

### `delay`

delay slows down punch responses, which can be helpful for misbehaving NATs or conditions where a NAT router's conntrack map is unable to handle a race, default is 1 second, respond must be true to take effect

<hr />

## `cipher`

**IMPORTANT: this value must be identical on ALL NODES/LIGHTHOUSES. We do not/will not support use of different ciphers simultaneously!**

Cipher allows you to choose between the available ciphers for your network. The default is aes, and the available options are chachapoly or aes

**_Example cipher_**

```yaml
cipher: chachapoly
```

<hr />

## `local_range`

Local range is used to define a hint about the local network range, which speeds up discovering the fastest path to a network adjacent nebula node.

**_Example local_range_**

```yaml
local_range: "172.16.0.0/24"
```

<hr />

## `sshd`

sshd enables nebula's built-in debugging console, which can be accessed via ssh. it can expose informational and administrative functions, and allows manual tweaking of various network settings when debugging or testing.

**_Example sshd_**

```yaml
sshd:
  enabled: true
  listen: 127.0.0.1:2222
  host_key: ./ssh_host_ed25519_key
  authorized_users:
    - user: steeeeve
      keys:
        - "[ssh public key string]"
```

### `enabled`

enabled toggles this feature globally

### `listen`

listen is used to specify the host ip and port number for the nebula debug console to listen on, port 22 is not allowed for your safety.

### `host_key`

host_key points to a file containing the ssh host private key to use for the ssh server side of the console.

You can generate a host key using the `ssh-keygen` command line utility.

`ssh-keygen -t ed25519 -f ssh_host_ed25519_key -N "" < /dev/null`

### `authorized_users`, `user`, `keys`

these options are how you create 'users' for the debug ssh daemon. password authentication for the ssh debug console is NOT supported.

<hr />

## `tun`

**_Example tun_**

```yaml
tun:
  disabled: false
  dev: nebula1
  drop_local_broadcast: false
  drop_multicast: false
  tx_queue: 500
  mtu: 1300
  routes:
    - mtu: 8800
      route: 10.0.0.0/16
  unsafe_routes:
    - route: 172.16.1.0/24
      via: 192.168.100.99
      mtu: 1300 #mtu will default to tun mtu if this option is not sepcified
```

### `disabled`

Allows the nebula interface (tun) to be disabled, which lets you run a lighthouse without a nebula interface (and therefore without root). You will not be able to communiate over IP with a nebula node that uses this setting.

### `dev`

dev sets the interface name for your nebula interface.

### `drop_local_broadcast`

Toggles forwarding of local broadcast packets, the address of which depends on the ip/mask encoded in pki.cert

### `drop_multicast`

Toggles forwarding of multicast packets

### `tx_queue`

Sets the transmit queue length, if you notice lots of transmit drops on the tun it may help to raise this number. Default is 500.

### `mtu`

Default MTU for every packet, safe setting is (and the default) 1300 for internet routed packets.

### `routes`

Route based MTU overrides, you have known vpn ip paths that can support larger MTUs you can increase/decrease them here

### `unsafe_routes`

***IMPORTANT NOTE: The nebula certificate of the "via" node *MUST* have the "route" defined as a subnet in its certificate***

Unsafe routes allows you to route traffic over nebula to non-nebula nodes. Unsafe routes should be avoided unless you have hosts/services that cannot run nebula.

<hr />

## `logging`

```yaml
logging:
  level: info
  format: text
  #disable_timestamp: true
  #timestamp_format: "2006-01-02T15:04:05.000Z07:00"
```

### `level`

### `format`

### `disable_timestamp`

### `timestamp_format`

<hr />

## `firewall`

The default state of the Nebula interface host firewall is _deny all_ for all inbound and outbound traffic. Firewall rules can be added to _allow_ traffic for specified ports and protocols, but it is not possible to explicitly define a _deny_ rule.

Firewall rules consist of one or more ports, a protocol, and one or more Nebula certificate properties denoting which hosts the rule should apply to. The `Groups` section of a Nebula certificate is particularly useful in this context. For example, by issuing certificates for use on employee laptops with the group `user-endpoint`, that group could then be referenced to allow inbound web traffic to a Nebula host:

```yaml
inbound:
  - port: 443
    proto: tcp
    group: user-endpoint

  - port: 80
    proto: tcp
    group: user-endpoint
```

Continuing with that example, you could write another rule to allow an employee who _also_ belongs to the `ops` group to access that same webserver using SSH. This would be added inside the `inbound:` section.

```yaml
- port: 22
  proto: tcp
  groups:
    - user-endpoint
    - ops
```

When the plural `groups` property is specified, the rule only applies to hosts that have a certificate with each of the groups listed.

The possible fields of a firewall rule are:

- `port`: Takes `0` or `any` as any, a single number (e.g. `80`), a range (e.g. `200-901`), or `fragment` to match second and further fragments of fragmented packets (since there is no port available).
- `proto`: One of `any`, `tcp`, `udp`, or `icmp`
- `ca_name`: An issuing CA name
- `ca_sha`: An issuing CA shasum
- `host`: Can be `any` or a literal hostname, ie `test-host`
- `group`: Can be `any` or a literal group name, ie `default-group`
- `groups`: Same as `group` but accepts a list of values. Multiple values are AND'd together and a certificate must contain all groups to pass.
- `cidr`: a CIDR, `0.0.0.0/0` is any.

Logical evaluation is roughly: port AND proto AND (ca_sha OR ca_name) AND (host OR group OR groups OR cidr).

**_Example firewall_**

```yaml
# Nebula security group configuration
firewall:
  conntrack:
    tcp_timeout: 12m
    udp_timeout: 3m
    default_timeout: 10m
    max_connections: 100000

  outbound:
    # Allow all outbound traffic from this node
    - port: any
      proto: any
      host: any

  inbound:
    # Allow icmp between any nebula hosts
    - port: any
      proto: icmp
      host: any

    # Allow tcp/443 from any host with BOTH laptop and home group
    - port: 443
      proto: tcp
      groups:
        - laptop
        - home
```

### `conntrack`

### `outbound`

It is quite common to allow any _outbound_ traffic to flow from a host. This simply means that the host can use any port or protocol to _attempt_ to connect to any other host in the overlay network. (Whether or not those other hosts _allow_ that inbound traffic is up to them.)

```yaml
outbound:
  - port: any
    proto: any
    host: any
```

### `inbound`

At a minimum, it is recommended to enable ICMP so that `ping` can be used to verify connectivity. Additionally, if enabling the built-in Nebula SSH server, you may wish to grant access over the Nebula network via firewall rules.
