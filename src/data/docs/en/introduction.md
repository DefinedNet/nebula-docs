---
title: Introduction
slug: introduction
summary: Nebula is a scalable overlay networking tool with a focus on
  performance, simplicity and security. It enables you to seamlessly connect
  computers **anywhere** in the world. Nebula is portable, and runs on Linux,
  MacOS, Windows, iOS, and Android.
---

# Introduction to Nebula

### What is Nebula?

Nebula is a scalable overlay networking tool with a focus on performance, simplicity and security. It enables you to seamlessly connect computers **anywhere** in the world. Nebula is portable, and runs on Linux, MacOS, Windows, iOS, and Android.

It can be used to connect a small number of computers, but was built to connect tens of thousands of computers. Nebula incorporates a number of existing concepts like encryption, security groups, certificates, and tunneling, and each of those individual pieces existed before Nebula in various forms.

What makes Nebula different to existing offerings is that it brings all of these ideas together, resulting in a sum that is greater than its individual parts.

Our primary goal when creating Nebula was to allow seamless connectivity between any set of computers, regardless of where they are in the world. When enabling such connectivity, it is very important that users have the tooling to separate those computers from each other.

##### What’s an overlay network?

Put simply, an overlay network is a virtual network that runs on top of another network. A virtual Private Network (VPN) is an overlay network. A SSH tunnel is an overlay network. A SOCKS proxy is an overlay network. A Virtual Private Cloud (VPC) is an overlay network.

Nebula was designed to be extensible: You can use it to secure traffic between two sites

##### So, it’s a VPN?

You can use Nebula to replace an existing VPN, but it has features not present in most other solutions:

- Security groups and fully-featured, cross platform firewall
- High performance under varied workloads
- NAT traversal
- Certificate and key management (done well)
- Decentralized infrastructure with no single points of failure
- Analogy: HOSTS file : DNS :: VPN : Nebula;

### Technical Details

Nebula is a mutually authenticated peer-to-peer software defined network based on the Noise Protocol Framework. Nebula uses certificates to assert a node's IP address, name, and membership within user-defined groups. Nebula's user-defined groups allow for provider agnostic traffic filtering between nodes. Discovery nodes allow individual peers to find each other and optionally use UDP hole punching to establish connections from behind most firewalls or NATs. Users can move data between nodes in any number of cloud service providers, datacenters, and endpoints, without needing to maintain a particular addressing scheme.

Nebula uses elliptic curve Diffie-Hellman key exchange, and AES-256-GCM in its default configuration.

Nebula was created to provide a mechanism for groups hosts to communicate securely, even across the internet, while enabling expressive firewall definitions similar in style to cloud security groups.

### Components of a Nebula network

##### Lighthouse

In Nebula, a lighthouse is a Nebula host that is responsible for keeping track of all of the other Nebula hosts, and helping them find each other within a Nebula network.

##### Certificate Authority

In its simplest form, a Nebula Certificate Authority (CA) consists of two files, a CA certificate, and an associated private key. A CA certificate is distributed to, and trusted by, every host on the network. The CA private key should not be distributed, and can be kept offline when not being used to add hosts to a Nebula network.

##### Hosts

A Nebula host is simply any single node in the network, e.g. a server, laptop, phone, tablet. The Certificate Authority is used to sign keys for each host added to a Nebula network. A host certificate contains the name, IP address, group membership, and a number of other details about a host. Individual hosts cannot modify their own certificate, because doing so will invalidate it. This allows us to trust that a host cannot impersonate another host within a Nebula network. Each host will have its own private key, which is used to validate the identity of that host when Nebula tunnels are created.
