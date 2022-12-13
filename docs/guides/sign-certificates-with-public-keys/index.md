---
title: Signing a Certificate Without a Private Key
description:
  'Nebula Docs: How to sign certificates without copying private keys across devices.'
summary:
  After reading this guide you will be able to create public/private keypairs on devices you wish to add to the Nebula
  network and generate certificates for them using only the public key.
---

# How to use public keys to create signed certificates

## Prerequisites

This guide assumes you have already created a CA (certificate authority) for your Nebula network.

You will also need Nebula installed on each device you wish to add to your network. This includes both the `nebula`
application as well as the `nebula-cert` utility.

If you have not already done so, you can use the [Quick Start](/docs/guides/quick-start/) guide to get up and running.

## Generating a public / private keypair

On the device you wish to add to your network, create a public / private Nebula keypair. This is done through the
`nebula-cert keygen` command. For example:

```shell
nebula-cert keygen -out-key alice.key -out-pub alice.pub
```

This will save the private and public keys to `alice.key` and `alice.pub` respectively.

:::note

The private key, along with certificate you will create below, is what nebula will use to prove its identity during
handshakes. Do not share this private key with anyone else! It is recommended that you do not copy the private key to
any other device.

:::

## Transfer the public key and sign a new certificate

Copy `alice.pub` (the public key) to the host you store your CA key material on. You will need both the CA certificate
as well as the CA private key. We will assume these are named `ca.crt` and `ca.key` respectively.

Before signing a certificate you will need to choose an IP address for the new device as well as any groups you'd
like to apply. For the sake of this guide, let's assume your Nebula network space is `192.168.100.0/24` and you want
to assign the IP address `192.168.100.25` to the new host. We'll use the groups `users` and `developers`.

```shell
nebula-cert sign -in-pub alice.pub -name "Alice" -ip "192.168.100.25/24" --groups "users,developers"
```

This will create a certificate at `Alice.crt`. To verify the certificate you can use `nebula-cert print`. For example:

```text
$ nebula-cert print -path Alice.crt
NebulaCertificate {
	Details {
		Name: Alice
		Ips: [
			192.168.100.25/24
		]
		Subnets: []
		Groups: [
			"users"
			"developers"
		]
		Not before: 2022-12-13 12:01:17 -0500 EST
		Not After: 2023-07-27 11:58:08 -0400 EDT
		Is CA: false
		Issuer: 0e1f5f42920c4e24c12496c4d0f199ecbe0fff92bda4edac352ebd6c2eb7ce84
		Public key: 3a216468d4f237b36392b7c6d4f3ede49abd9e0704f9bd4a05ff708b535f3054
	}
	Fingerprint: de9dff9d99c0c85af854279cec30314640dc1f89050507061d38fa3aa8bec010
	Signature: 07d607d3dc4579a261049a103465738299621d122ebfe9f91792eac7795302e5032a5807d328ab584283b655a83d3d31711e14148c33aace73c40a4760724e0e
}
```

## Final steps

Now you can copy the certificate back to the original device and reference it in the device's Nebula config, alongside
the private key named `alice.key`.

Congratulations! You've successfully signed a new certificate without the private key.
