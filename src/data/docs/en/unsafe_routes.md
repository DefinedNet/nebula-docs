---
title: Extend access to any host with unsafe_routes
slug: unsafe_routes
summary: This guide explains how to configure Nebula to route traffic destined for a specific subnet through a specific host, which is useful for accessing hosts that cannot be modified to run Nebula.
---

# Extend access to any host with unsafe_routes

This guide explains how to configure Nebula to route traffic destined for a specific subnet through a specific host.

This is especially useful for accessing hosts that cannot be modified to run Nebula, such as printers, physical access control systems, and other proprietary devices on which you cannot install arbitrary software.

## Prerequisites

_Read the [Quick Start](quick-start) guide to learn how to create your first overlay network._

You will need a working overlay network with at least one lighthouse and the following to complete this guide.

1.  `nebula-cert` binary to sign host certificates
1.  The ca.key and ca.crt files for the working overlay network
1.  Root access to a Linux host on the network that will route traffic using `unsafe_routes`
1.  Root access to a Linux, macOS, or Windows host on a different network than the Linux host that will route traffic.

## Example Network

_The following IP addresses and subnets are used in this guide._

### Home network

This is the subnet that we want to be able to access remotely over our Nebula overlay.

- `192.168.86.0/24` (192.168.86.1–192.168.86.254)
- The Linux host routing traffic from Nebula using `unsafe_routes` is connected to this network

**Hosts on the Home network**

| LAN Host IP     | LAN Hostname  | Overlay Hostname | Description                                    |
| --------------- | ------------- | ---------------- | ---------------------------------------------- |
| `192.168.86.10` | `raspi.lan`   | `home-raspi`     | Linux host running Nebula and routing traffic  |
| `192.168.86.5`  | `printer.lan` | (none)           | Printer on Home network that cannot run Nebula |

### Overlay network

This is the overlay network that will be used by hosts running Nebula.

- `192.168.100.0/24` (192.168.100.1–192.168.86.254)
- The macOS host in this example has Internet access but it not on the same, physical LAN as the Linux host.

**Hosts on the Nebula overlay network**

| Overlay Host IP  | Overlay Hostname | Description                                             |
| ---------------- | ---------------- | ------------------------------------------------------- |
| `192.168.100.10` | `home-raspi`     | Linux host on Home network                              |
| `192.168.100.11` | `laptop-mac`     | Mac host that will access printer using `unsafe_routes` |

The following steps explain how to configure the Linux host (`home-raspi`, `192.168.100.10`) and macOS host (`laptop-mac`, `192.168.100.11`) so that the macOS host can access the home printer from anywhere.

## Step 1. Sign cert with subnets you want to route

..

## Step 2. Enable ip forwarding on via host

..

## Step 3. Set up via host

..

## Step 4. Edit config on other nodes to tell them where to route

..

# Notes and related guides

..
