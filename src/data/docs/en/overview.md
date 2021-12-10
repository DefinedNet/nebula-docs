---
title: Overview
slug: overview
summary: Nebula is a scalable overlay networking tool with a focus on
  performance, simplicity and security. It enables you to seamlessly connect
  computers anywhere in the world. Nebula is portable, and runs on Linux,
  MacOS, Windows, iOS, and Android.
---

# The Open Source Overlay Networking Tool

## What is Nebula?

Nebula is a scalable overlay networking tool with a focus on performance, simplicity and security. It enables you to seamlessly connect computers anywhere in the world. Nebula is portable, and runs on Linux, MacOS, Windows, iOS, and Android.

Nebula was open-sourced by Slack, and it continues to power their overlay network for over 50,000 production hosts. Check it out on GitHub. [slackhq/nebula](https://github.com/slackhq/nebula)

Nebula incorporates a number of existing concepts like encryption, security groups, certificates, and tunneling, and each of those individual pieces existed before Nebula in various forms. What makes Nebula different from existing offerings is that it brings all of these ideas together, resulting in a sum that is greater than its individual parts.

Our primary goal when creating Nebula was to allow seamless connectivity between any computer independent of location or network. When enabling such connectivity, it is very important that users have the tooling to logically separate those computers from each other.

## Getting Started

"[How to create your first overlay network](quick-start)" is a step-by-step walkthrough that explains how to deploy Nebula.

Prefer video? [Watch](https://www.youtube.com/watch?v=qy2cgqglt3o) a 90-minute deep-dive on Nebula from the 2020 All Things Open conference.

<div width="100%" height="0" style="padding-bottom: 56.25%; overflow: hidden; position: relative; margin-bottom: 16px;">
  <iframe width="100%" height="100%" style="position: absolute;" src="https://www.youtube.com/embed/qy2cgqglt3o" title="All Things Open YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### What’s an overlay network?

Put simply, an overlay network is a virtual network that runs on top of another network. A virtual Private Network (VPN) is an overlay network. A SSH tunnel is an overlay network. A SOCKS proxy is an overlay network. A Virtual Private Cloud (VPC) is an overlay network.

Nebula was designed to be extensible: You can use it to secure traffic between two sites.

### So, it’s a VPN?

You can use Nebula to replace an existing VPN, but it has features not present in most other solutions:

- Security groups and fully-featured, cross platform firewall
- High performance under varied workloads
- NAT traversal
- Certificate and key management (done well)
- Decentralized infrastructure with no single points of failure
- Analogy: HOSTS file : DNS :: VPN : Nebula;

## Technical Details

Nebula is a mutually authenticated peer-to-peer software defined network based on the Noise Protocol Framework. Nebula uses certificates to assert a node's IP address, name, and membership within user-defined groups. Nebula's user-defined groups allow for provider agnostic traffic filtering between nodes. Discovery nodes allow individual peers to find each other and optionally use UDP hole punching to establish connections from behind most firewalls or NATs. Users can move data between nodes in any number of cloud service providers, datacenters, and endpoints, without needing to maintain a particular addressing scheme.

Nebula uses elliptic curve Diffie-Hellman key exchange, and AES-256-GCM in its default configuration.

Nebula was created to provide a mechanism for groups hosts to communicate securely, even across the internet, while enabling expressive firewall definitions similar in style to cloud security groups.

## Components of a Nebula network

### Lighthouse

In Nebula, a lighthouse is a Nebula host that is responsible for keeping track of all of the other Nebula hosts, and helping them find each other within a Nebula network.

### Certificate Authority

In its simplest form, a Nebula Certificate Authority (CA) consists of two files, a CA certificate, and an associated private key. A CA certificate is distributed to, and trusted by, every host on the network. The CA private key should not be distributed, and can be kept offline when not being used to add hosts to a Nebula network.

### Hosts

A Nebula host is simply any single node in the network, e.g. a server, laptop, phone, tablet. The Certificate Authority is used to sign keys for each host added to a Nebula network. A host certificate contains the name, IP address, group membership, and a number of other details about a host. Individual hosts cannot modify their own certificate, because doing so will invalidate it. This allows us to trust that a host cannot impersonate another host within a Nebula network. Each host will have its own private key, which is used to validate the identity of that host when Nebula tunnels are created.

## News & Press

[Listen](https://techsnap.systems/419) a discussion Nebula on TechSNAP Episode 419.

[Read](https://arstechnica.com/gadgets/2019/12/nebula-vpn-routes-between-hosts-privately-flexibly-and-efficiently/) "Nebula VPN routes between hosts privately, flexibly, and efficiently" at ArsTechnica

## About Defined Networking

Nebula was originally created at Slack Technologies, Inc. by Nate Brown and Ryan Huber, with contributions by a number of their colleagues. Slack open sourced Nebula in November 2019.

[Slack Engineering blog post announcing Nebula](https://slack.engineering/introducing-nebula-the-open-source-global-overlay-network-from-slack/)

In 2020, Nate and Ryan left Slack and founded Defined Networking together. Defined is focused on making Nebula useful to organizations of all sizes.

As of early 2021, Slack continues to be a primary sponsor of the Nebula open source project. Defined Networking is publishing this official documentation with their support.
