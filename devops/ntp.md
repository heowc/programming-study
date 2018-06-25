## NTP

- [위키백과 - 네트워크 타임 프로토콜](https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%ED%83%80%EC%9E%84_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
- NTP Pool Time Server List: http://support.ntp.org/bin/view/Servers/NTPPoolServers


### 1. NTP 설치

```bash
$ sudo apt install ntp
```

### 2. Korea NTP Server List 확인

Korea는 다음 URL에서 목록을 확인할 수 있다. (http://www.pool.ntp.org/zone/kr)

```bash
server 3.kr.pool.ntp.org
server 1.asia.pool.ntp.org
server 3.asia.pool.ntp.org
```

### 3. server 등록

[2]에서 확인한 목록을 추가한다.

```bash
$ sudo vi /etc/ntp.conf
```

### 4. NTP 재시작 및 확인

```bash
$ sudo service ntp restart
```

```bash
$ sudo ntpq -p
```

## 참고

- http://www.ntp.org/
- https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/set-time.html
