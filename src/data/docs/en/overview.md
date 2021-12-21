---
title: Overview
slug: overview
summary: Nebula is an open-source overlay networking tool designed
  to be fast, secure, and scalable. Connect hosts across any network
  with on-demand, encrypted tunnels.
---

# Nebula: Open Source Overlay Networking

Nebula is an overlay networking tool designed to be fast, secure, and scalable. Connect any number of hosts with on-demand, encrypted tunnels that work across any IP networks and without opening firewall ports.

[Download Nebula on GitHub](https://github.com/slackhq/nebula)

## Core features

- Peer-to-peer, layer 3, virtual network ([Technical Details](#technical-details))
- Supports TCP/UDP/ICMP traffic via TUN adapter with split-tunneling
- Host firewall with groups-based rules engine for overlay traffic
- Route discovery and NAT traversal assisted by simple "lookup" hosts

### Identity and Authorization

Nebula uses a PKI model for establishing trust between hosts and networks.

- Host certificates are used to securely identify and authorize peers
- Hosts mutually authenticate by validating certificates and CAs
- Firewall rules enforced by evaluating certificate "security groups"

Releases include `nebula-cert` executable to generate keys, certs, CAs, and to sign host certificates.

## Compatibility

Nebula is written in Go and is designed for portability.

- Packaged for Linux, macOS, Windows, iOS, Android, and FreeBSD
- Efficiently runs on x86, ARM, MIPS, PPC, and RISC hardware (32 & 64-bit)
- A single `nebula` executable runs host firewall and service
- Host config file defines CA trust, host cert & key, and firewall rules
- At least one host in overlay network should be a _Lighthouse_, which helps hosts discover routes to one another and assists in NAT traversal.

## Getting Started

_How to create your first overlay network_ is a step-by-step guide that explains how to deploy Nebula. It's a great place to get started and learn how to connect a few hosts.

[Nebula Quick Start guide](/nebula/quick-start/)

### Overview presentation

Watch a 90-minute deep-dive on Nebula presented by one of its creators, Ryan Huber, at the _All Things Open_ conference in 2020.

[Creating a Fast, Secure, Location Agnostic Mesh Network with Nebula](https://www.youtube.com/watch?v=qy2cgqglt3o)

<div width="100%" height="0" style="padding-bottom: 56.25%; overflow: hidden; position: relative; margin-bottom: 16px;">
  <iframe width="100%" height="100%" style="position: absolute;" src="https://www.youtube.com/embed/qy2cgqglt3o" title="All Things Open YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### What’s an overlay network?

Put simply, an overlay network is a virtual network that runs on top of another network. A virtual Private Network (VPN) is an overlay network. A SSH tunnel can help create an overlay network. A Virtual Private Cloud (VPC) is an overlay network offered by cloud infrastructure providers.

Inspired by a number of existing tools and projects, Nebula was created to make it much easier to design, deploy, and manage overlay networks that were highly performant, portable, and secure.

## Technical Details

Nebula is a mutually authenticated peer-to-peer software defined network based on the Noise Protocol Framework. Nebula uses certificates to assert a node's IP address, name, and membership within user-defined groups. Nebula's user-defined groups allow for provider-agnostic traffic filtering between nodes.

Discovery nodes allow individual peers to find each other and optionally use UDP hole punching to establish connections from behind most firewalls or NATs. Users can move data between nodes in any number of cloud service providers, datacenters, and endpoints, without needing to maintain a particular addressing scheme.

Nebula uses elliptic curve Diffie-Hellman key exchange, and AES-256-GCM in its default configuration.

Nebula was created to provide a mechanism for groups hosts to communicate securely, even across the internet, while enabling expressive firewall definitions similar in style to cloud security groups.

## News & Press

[Listen](https://techsnap.systems/419) a discussion Nebula on TechSNAP Episode 419.

[Read](https://arstechnica.com/gadgets/2019/12/nebula-vpn-routes-between-hosts-privately-flexibly-and-efficiently/) "Nebula VPN routes between hosts privately, flexibly, and efficiently" at ArsTechnica

## History

After several years of internal development, Nebula was open-sourced by Slack in 2019. Read the announcement posted on Slack's Engineering blog.

[Introducing Nebula, the open source global overlay network from Slack](https://slack.engineering/introducing-nebula-the-open-source-global-overlay-network-from-slack/)

By early 2020, the project had over 4,000 stars on GitHub and it was being adopted by organizations of all sizes.

As of December 2021, Nebula continues to power Slack's global overlay network of over 50,000 production hosts.

[Read Nebula's Release Notes on GitHub](https://github.com/slackhq/nebula/releases) to learn about additions and changes to the project.

## About Defined Networking

Nebula's creators, Ryan Huber and Nate Brown, founded Defined Networking in 2020 to focus on Nebula development and to broaden the adoption of overlay networking in organizations.

As of early 2021, Slack continues to be a primary sponsor of the Nebula open source project. Defined Networking is publishing this official documentation with their support.
