# iproute2

> `https://www.tecmint.com/deprecated-linux-networking-commands-and-their-replacements/`를 참고

### Why?

- 지금까지의 리눅스 networking 관련 명령어는 오래 방치되어 있었고 산재되어 있었음
- `arp`, `ifconfig`, `netstat`, `route`, ...

### What!

- RedHat 7.2부터 기본으로 들어감
- 이를 대체하기 위한 [`iproute2`](https://wiki.linuxfoundation.org/networking/iproute2) 포함
- 대체 명령어 목록

| Linux Deprecated Commands | Linux Replacement Commands |
|---------------------------|-----------------------------|
| arp	| ip n (ip neighbor) |
| ifconfig |	ip a (ip addr), ip link, ip -s (ip -stats) |
| iptunnel |	ip tunnel |
| iwconfig |	iw |
| nameif |	ip link, ifrename |
| netstat |	ss, ip route (for netstat -r), ip -s link (for netstat -i), ip maddr (for netstat -g) |
| route |	ip r (ip route) |

### How?!

#### Install

```bash
$ yum install iproute2 # CentOS
$ apt install iproute2 # Ubuntu
```

#### Frequently used commands

- ip 확인: `ip address show` ~~`ifconfig`~~
- 실행 중인 프로세스(PID, Port 등) 확인: `ss -ntlp` ~~`netstat -ntlp`~~