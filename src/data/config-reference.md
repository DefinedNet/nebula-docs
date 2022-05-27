---
en:
  options:
    - name: pki
      required: true
      description: >
        Defines the path of each file required for a Nebula host: CA certificate,
        host certificate, and host key. Each of these files can also be stored
        inline as YAML multiline strings.
      example: |
        pki:
          ca: /etc/nebula/ca.crt
          cert: /etc/nebula/host.crt
          key: /etc/nebula/host.key
          blocklist:
            - c99d4e650533b92061b09918e838a5a0a6aaee21eed1d12fd937682865936c72
      suboptions:
        - name: ca
          required: true
          reloadable: true
          description: The ca is a collection of one or more certificate authorities this
            host should trust. In the above example, `/etc/nebula/ca.crt`
            contains PEM-encoded data for each CA we should trust, concatenated
            into a single file. The following example shows a CA cert inlined
            as a YAML multiline string.
          example: |
            pki:
              ca: |
                -----BEGIN NEBULA CERTIFICATE-----
                CkgKFlRoZSBPbmUtSG91ciBOZWJ1bGEgQ0Eo/pL7jAYwjq/7jAY6IDIi7yqkRV9F
                1+tozxvnHCmuuuwdArt7YbMMdCR4AYm/QAESQHBitbcetbJ06RQckqGi+hXJXd/U
                TXKEul4TxP4Qxmd7g+cHDE6oYZhRwup+1xg/Sv9bMg2E2/LNXKV3rNf1Yw8=
                -----END NEBULA CERTIFICATE-----
        - name: cert
          required: true
          reloadable: true
          description: >
            The cert is a certificate unique to every host on a Nebula network.
            The certificate identifies a host's IP address, name, and group
            membership within a Nebula network. The certificate is signed by a
            certificate authority when created, which informs other hosts on
            whether to trust a particular host certificate.
        - name: key
          required: true
          reloadable: true
          description: The key is a private key unique to every host on a Nebula network.
            It is used in conjunction with the host certificate to prove a
            host's identity to other members of the Nebula network. The private
            key should never be shared with other hosts.
        - name: blocklist
          reloadable: true 
          description: The blocklist contains a list of individual host certificates to
            ignore. In the case a host's credentials are stolen or compromised,
            this allows us to block connectivity from a host, even if it is
            signed by a certificate authority we trust.
        - name: disconnect_invalid
          default: false
          description: disconnect_invalid is a toggle to force a client to be disconnected if the certificate is expired or invalid.
    - name: static_host_map
      reloadable: true
      description: >-
        The static host map defines a set of hosts with fixed IP addresses on
        the internet (or any network).

        A host can have multiple fixed IP addresses defined here, and nebula will try each when establishing a tunnel.

        The syntax is:


        `"<nebula ip>": ["<routable ip/dns name>:<routable port>"]`


        Example, if your lighthouse has the nebula IP of 192.168.100.1 and has the real ip address of 100.64.22.11 and runs on port 4242:
      example: |-
        static_host_map:
          "192.168.100.1": ["100.64.22.11:4242"]
    - name: lighthouse
      description: " "
      example: |-
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
      suboptions:
        - name: am_lighthouse
          description: am_lighthouse is used to enable lighthouse functionality for a
            node. This should ONLY be `true` on nodes you have configured to be
            lighthouses in your network
        - name: serve_dns
          description: >-
            serve_dns optionally starts a DNS listener that responds to `A` and
            `TXT` queries and can even be delegated to for name resolution by
            external DNS hosts.


            The DNS listener can only respond to requests about hosts it's aware of. For this reason, it can only be enabled on Lighthouses.


            `A` records contain the Nebula IP for a host name and can be queried by any host that can reach the DNS listener, regardless of whether it is communicating over the Nebula network.


            `TXT` records can only be queried over the Nebula network, and contain certificate information for the requested host IP address.


            For example, if `192.168.100.1` was your Lighthouse node running a DNS server and you wanted to find the Nebula IP address of a host named `web01`:


            ```shell

            $ dig @192.168.100.1 +short web01 A

            192.168.100.5

            ```


            Or if you wanted to get certificate information about the host:


            ```shell

            $ dig +short @192.168.100.1 192.168.100.5 TXT

            "Name: web01" "Ips: [192.168.100.5/24]" "Subnets []" "Groups [servers web]" "NotBefore 2021-06-15 14:19:22 +0000 UTC" "NotAFter 2022-04-28 21:49:15 +0000 UTC" "PublicKey dde33784fb2bbada73f8bf4cafbf9271dc864b770b1e44002f81563856711f7c" "IsCA false" "Issuer 91f795c52f601d3110ee5232b22c13a89a76d3e3fb89bed3c21929c873cb6ec9"


            ```


            _NOTE: To allow hosts to make queries against the DNS server over the Nebula network, don't forget to allow access in the [firewall](#firewall)._
        - name: dns
          description: >-
            dns is used to configure the address (`host`) and port (`port`) the
            DNS server should listen on. By listening on the host's Nebula IP,
            you can make the DNS server accessible only on the Nebula network.
            Alternatively, listening on `0.0.0.0` will allow anyone that can
            reach the host to make queries.


            See the [serve_dns](#lighthouse-serve_dns) docs for more information, or the [example Lighthouse config](#lighthouse) for syntax.
        - name: interval
          reloadable: true
          default: 10 
          description: interval specifies how often a nebula host should report itself to
            a lighthouse. By default, hosts report themselves to lighthouses
            once every 60 seconds. Use caution when changing this interval, as
            it may affect host discovery times in a large nebula network.
        - name: hosts
          description: >-
            **IMPORTANT: THIS SHOULD BE EMPTY ON LIGHTHOUSE NODES**


            hosts is a list of lighthouse hosts this node should report to and query from. The lighthouses listed here should be referenced by their **nebula IP**, not by the IPs of their physical network interfaces.
          example: |-
            hosts:
              - "192.168.100.1"
        - name: remote_allow_list
          description: remote_allow_list allows you to control ip ranges that this node
            will consider when handshaking to another node. By default, any
            remote IPs are allowed. You can provide CIDRs here with `true` to
            allow and `false` to deny. The most specific CIDR rule applies to
            each remote. If all rules are "allow", the default will be "deny",
            and vice-versa. If both "allow" and "deny" rules are present, then
            you MUST set a rule for "0.0.0.0/0" as the default.
          example: |-
            remote_allow_list:
              # Example to block IPs from this subnet from being used for remote IPs.
              "172.16.0.0/12": false

              # A more complicated example, allow public IPs but only private IPs from a specific subnet
              "0.0.0.0/0": true
              "10.0.0.0/8": false
              "10.42.42.0/24": true
        - name: local_allow_list
          description: local_allow_list allows you to filter which local IP addresses we
            advertise to the lighthouses. This uses the same logic as
            `remote_allow_list`, but additionally, you can specify an
            `interfaces` map of regular expressions to match against interface
            names. The regexp must match the entire name. All interface rules
            must be either true or false (and the default will be the inverse).
            CIDR rules are matched after interface name rules. Default is all
            local IP addresses.
          example: |-
            local_allow_list:
              # Example to block tun0 and all docker interfaces.
              interfaces:
                tun0: false
                'docker.*': false
              # Example to only advertise this subnet to the lighthouse.
                "10.0.0.0/8": true
    - name: listen
      description: listen sets the UDP port Nebula will use for sending/receiving
        traffic and for handshakes. The default here is 4242. For a lighthouse
        node, the port should be defined, however using port 0 will dynamically
        assign a port and is recommended for roaming nodes.
      example: |-
        listen:
          host: 0.0.0.0
          port: 4242
          batch: 64
          read_buffer: 10485760
          write_buffer: 10485760
      suboptions:
        - name: host
          default: 0.0.0.0 
          description: >
            host is the ip of the interface to use when binding the listener.
            the default is 0.0.0.0, which is what most people should use.
            To listen on both any ipv4 and ipv6 use `[::]`
        - name: port
          default: 0
          description: >
            port is the UDP port nebula should use on a host. setting this to `0`
            will dynamically assign a port number. This must be set on a lighthouse, conventionally to `4242`
        - name: batch
          default: 64
          description: >
            Sets the max number of packets to pull from the kernel for each syscall (under systems that support recvmmsg)
            default is 64, does not support reload 
        - name: read_buffer, write_buffer
          default: uses system defaults 
          description: Configure socket buffers for the udp side (outside), leave unset to
            use the system defaults. Values will be doubled by the kernel.
            Default is `net.core.rmem_default` and `net.core.wmem_default`
            (`/proc/sys/net/core/rmem_default` and
            `/proc/sys/net/core/rmem_default`). Maximum is limited by memory in
            the system, `SO_RCVBUFFORCE` and `SO_SNDBUFFORCE` is used to avoid
            having to raise the system wide max, `net.core.rmem_max` and
            `net.core.wmem_max`
    - name: punchy
      description: punchy configures the sending of inbound/outbound packets at a
        regular interval to avoid expiration of firewall nat mappings.
      example: |-
        punchy:
          punch: true
          respond: true
          delay: 1s
      suboptions:
        - name: punch
          default: false 
          description: >
            punch enables its functionality, which causes the node to send small
            packets at the regular interval.
        - name: respond
          default: false
          description: respond means that a node unable to receive handshakes will attempt
            to initiate a handshake to the host attempting to establish a
            tunnel, which can be the case when hole punching fails in one
            direction. This can be extremely useful if one node is behind a
            difficult nat, such as a symmetric NAT.
        - name: delay
          default: 1s
          description: delay slows down punch responses, which can be helpful for
            misbehaving NATs or conditions where a NAT router's conntrack map is
            unable to handle a race, default is 1 second, respond must be true
            to take effect.
    - name: cipher
      description: >-
        **IMPORTANT: this value must be identical on ALL NODES/LIGHTHOUSES. We
        do not/will not support use of different ciphers simultaneously!**


        Cipher allows you to choose between the available ciphers for your network. The default is `aes`, and the available options are `chachapoly` or `aes`.
      example: "cipher: chachapoly"
    - name: local_range
      description: Local range is used to define a hint about the local network range,
        which speeds up discovering the fastest path to a network adjacent
        nebula node.
      example: 'local_range: "172.16.0.0/24"'
    - name: sshd
      description: sshd enables nebula's built-in debugging console, which can be
        accessed via ssh. it can expose informational and administrative
        functions, and allows manual tweaking of various network settings when
        debugging or testing.
      example: |-
        sshd:
          enabled: true
          listen: 127.0.0.1:2222
          host_key: ./ssh_host_ed25519_key
          authorized_users:
            - user: steeeeve
              keys:
                - "[ssh public key string]"
      suboptions:
        - name: enabled
          reloadable: true
          default: false 
          description: |
            enabled toggles this feature globally
        - name: listen
          description: >
            listen is used to specify the host ip and port number for the nebula
            debug console to listen on, port 22 is not allowed for your safety.
        - name: host_key
          description: >
            host_key points to a file containing the ssh host private key to use
            for the ssh server side of the console.


            You can generate a host key using the `ssh-keygen` command line utility.


            `ssh-keygen -t ed25519 -f ssh_host_ed25519_key -N "" < /dev/null`
        - name: authorized_users, user, keys
          description: >
            These options are how you create 'users' for the debug ssh daemon.
            Password authentication for the ssh debug console is NOT supported.
    - name: tun
      example: >-
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
      suboptions:
        - name: disabled
          default: false
          reloadable: true 
          description: >
            Allows the nebula interface (tun) to be disabled, which lets you run
            a lighthouse without a nebula interface (and therefore without
            root). You will not be able to communiate over IP with a nebula node
            that uses this setting.
        - name: dev
          description: |
            Name of the device. If not set, a default will be chosen by the OS.
            For macOS: Not required. If set, must be in the form `utun[0-9]+`.
            For FreeBSD: Required to be set, must be in the form `tun[0-9]+`.
        - name: drop_local_broadcast
          description: >
            Toggles forwarding of local broadcast packets, the address of which
            depends on the ip/mask encoded in pki.cert
        - name: drop_multicast
          description: |
            Toggles forwarding of multicast packets
        - name: tx_queue
          default: 500
          reloadable: true
          description: >
            Sets the transmit queue length, if you notice lots of transmit drops
            on the tun it may help to raise this number. Default is 500.
        - name: mtu
          default: 1300
          reloadable: true
          description: >
            Default MTU for every packet, safe setting is (and the default) 1300
            for internet routed packets.
        - name: routes
          reloadable: true 
          description: >
            Route based MTU overrides, you have known vpn ip paths that can
            support larger MTUs you can increase/decrease them here
          example: |-
            routes:
              - mtu: 8800
                route: 10.0.0.0/16
        - name: unsafe_routes
          reloadable: true
          description: >-
            ***IMPORTANT NOTE: The nebula certificate of the "via" node *MUST*
            have the "route" defined as a subnet in its certificate***


            Unsafe routes allows you to route traffic over nebula to non-nebula nodes. Unsafe routes should be avoided unless you have hosts/services that cannot run nebula.
          example: |-
            unsafe_routes:
              - route: 172.16.1.0/24
                via: 192.168.100.99
                mtu: 1300
                metric: 100
      description: " "
    - name: logging
      description: " "
      example: |-
        logging:
          level: info
          format: text
          #disable_timestamp: true
          #timestamp_format: "2006-01-02T15:04:05.000Z07:00"
      suboptions:
        - name: level
          reloadable: true
          default: info
          description: options are `panic`, `fatal`, `error`, `warning`, `info`, or `debug`.
        - name: format
          reloadable: true
          default: text
          description: options are `json` or `text`
        - name: disable_timestamp
          reloadable: true
          default: false
          description: Disable timestamp logging. useful when output is redirected to logging system that already adds timestamps.
        - name: timestamp_format
          reloadable: true
          example: |-
            # timestamp format is specified in Go time format, see:
            #     https://golang.org/pkg/time/#pkg-constants
            # default when `format: json`: "2006-01-02T15:04:05Z07:00" (RFC3339)
            # default when `format: text`:
            #     when TTY attached: seconds since beginning of execution
            #     otherwise: "2006-01-02T15:04:05Z07:00" (RFC3339)
            # As an example, to log as RFC3339 with millisecond precision:
            timestamp_format: "2006-01-02T15:04:05.000Z07:00"
          
    - name: firewall
      reloadable: true 
      description: >-
        The default state of the Nebula interface host firewall is _deny all_
        for all inbound and outbound traffic. Firewall rules can be added to
        _allow_ traffic for specified ports and protocols, but it is not
        possible to explicitly define a _deny_ rule.


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
      example: |-
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
      suboptions:
        - name: conntrack
          reloadable: true 
          description: Settings for the Connection Tracker.
          example: |-
            conntrack:
              tcp_timeout: 12m
              udp_timeout: 3m
              default_timeout: 10m
        - name: outbound
          reloadable: true 
          description: It is quite common to allow any _outbound_ traffic to flow from a
            host. This simply means that the host can use any port or protocol
            to _attempt_ to connect to any other host in the overlay network.
            (Whether or not those other hosts _allow_ that inbound traffic is up
            to them.)
          example: |-
            outbound:
              - port: any
                proto: any
                host: any
        - name: inbound
          reloadable: true 
          description: At a minimum, it is recommended to enable ICMP so that `ping` can
            be used to verify connectivity. Additionally, if enabling the
            built-in Nebula SSH server, you may wish to grant access over the
            Nebula network via firewall rules.
---
