docker에서는 이미지 최적화를 위해 OS 포함되는 locale 데이터를 일부만 포함 시켜놓은 듯 하다. <br/> Centos의 경우는 다음과 같다.

```bash
$ locale -a
# 결과
C
POSIX
en_US.utf8
```

이것이 무엇이 되냐하면 php에서 i18n을 지원하기 위해 `gettext()` 과 `setlocale()`를 사용한다. 이때, 지원하지 않는 locale은 정상적으로 찾지 못한다.

사전 조건으로 다음 라이브러리가 추가되어야 한다.

```bash
$ yum install -y glibc-common glibc
```

그러면 `localedef` 명령어를 실행하여 해결할 수 있다.

```bash
$ localedef -i ko_KR -f UTF-8 ko_KR.utf8
```
