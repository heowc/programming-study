# 웹 브라우저에서부터 내 서버로 오기까지

![alt image](https://upload.wikimedia.org/wikipedia/commons/9/9f/Internet_Connectivity_Access_layer.svg)

### DNS
- 도메인(example.com)을 IP 주소로 변환
- 도메인을 사용하려면 도메인 정보를 관리하는 도메인 등록 기관과 DNS 호스팅 서비스를 연결해야 함

### 도메인 등록 기관
- 도메인을 등록하는 회사
- 모든 도메인 등록 기관은 [ICANN](https://www.icann.org/)에서 인증을 받아야 함
- [한국 - 둥록대행자 현황](https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/popup/agencyIng.jsp)

### DNS 호스팅 서비스
- 도메인에 대한 DNS 레코드가 포함된 DNS 서버를 소유하는  있는 회사
- 등록된 도메인 이름과 공용 IP 주소가 있는 개인이나 회사는 공용 DNS 서버를 만들어서 도메인에 대한 DNS 레코드를 호스팅할 수 있음
- 호스팅 회사에 따라 DNS 레코드를 수정할 수 있고 없을 수 도 있다.

### 참고
- 가비아는 도메인 등록 기관이면서 호스팅 회사이다.
- 카페24는 호스팅만 하는 회사이다.

### 번외)
- [DNSSEC(Domain Name System Security Extension)](https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/resources/dns/dnssecInfo/dnssecInfo.jsp)

### 네임서버
- 디렉토리 서비스 프로토콜을 실행하는 프로그램이나 서버를 말함
- 일반적으로 DNS 제공하는 서버를 말함

### DNS 레코드
- 이름과 형식이 존재
- 가장 일반적인 형식은 이름을 IPv4를 매핑하는 A레코드

### 유형
- 와일드카드 레코드
    - '*'
- CAA 레코드
- CNAME
- NS
- SOA
- SPF
- SRV
- TXT
- AAAA
- A6
- ANY
- ALL

### TTL(Time-to-Live)
- 각 레코드가 다시 쿼리되기 전에 클라이언트에 캐시되는 기간
- 1 ~ 2^32/2 사이의 값으로 지정 가능

### IP
- 인터넷에 연결된 기기를 식별하기 위해 기기들이 가지고 있는 유일한 번호
- IPv4, IPv6 주소체계를 가짐


### 과정
> 웹 브라우저에 google.com을 검색해본다고 가정하자

1. 브라우저에 'google.com'을 검색한다.
2. 로컬에 캐싱되어 있는 DNS 정보를 읽어 확인한다. (윈도우에 경우는 hosts)
3. [2] 에서 찾을 수 없다면, 루트 네임 서버로 부터 탐색
    - 도메인은 트리 구조로 되어 있다.
4. DNS 정보와 IP가 일치하면 해당 IP를 반환
5. 해당 IP로 서버에 접근
6. 웹 서버(apache, nginx) 등을 통해 데이터 반환
7. 전달받은 데이터를 브라우저에 렌더링

### 참고

https://msdn.microsoft.com/ko-kr/library/cc188658(v=exchsrvcs.149).aspx