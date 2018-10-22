# 명령어

헷갈리는 내용 (`ENV`, `ARG`, `CMD`, `ENTRYPOINT`, `ADD`, `COPY`)

## `ENV` vs `ARG`

### `ENV`
- 환경변수 지정
- `$변수` 혹은 `${변수}` 형태로 표현 가능
- 또한, `${변수:-값}`으로 값을 기본값으로 표현 가능
- `${변수:+값}`의 경우는 반대에 경우인데 사용할 일이 있을까 싶다.
- docker run 시에 **--e** 옵션을 활용하여 오버라이딩 할 수 있다.

### `ARG`
- build 시점에만 사용되는 변수
- `ARG 변수` 혹은 `ARG 변수=값` 형태로 표현 가능
- `ENV`처럼 `${변수:+값}`, `${변수:-값}`으로도 표현 가능
- docker build 시에 **--build-arg** 옵션을 활용하여 오버라이딩 할 수 있다.

### TEST 1
Scope 확인
```dockerfile
FROM debian:jessie-slim

ENV NAME_ENV=wonchul 
ARG NAME_ARG=wonchul

RUN echo "envirment = ${NAME_ENV:-WonChul}" \
    && echo "argument = ${NAME_ARG:-WonChul}"

CMD echo "envirment = ${NAME_ENV:-WonChul}" \
    && echo "argument = ${NAME_ARG:-WonChul}"
```

1. override 안했을 때(build, run)

```bash
$ docker build -t basic . # build
# 결과
...
envirment = wonchul
argument = wonchul
...
```

```bash
$ docker run basic # run
# 결과
envirment = wonchul
argument = WonChul
```

2. override 했을 때(build, run)

```bash
$ docker build -t basic --build-arg NAME_ARG=WONCHUL . # build
# 결과
...
envirment = wonchul
argument = WONCHUL
...
```

```bash
$ docker run -e NAME_ENV=WONCHUL basic # run
# 결과
envirment = WONCHUL
argument = WonChul
```

### TEST 2
`ENV`와 `ARG` 덮어쓰기
```dockerfile
FROM debian:jessie-slim

ARG NAME
ENV NAME=${NAME:-WonChul}

RUN echo "NAME = ${NAME}"

CMD echo "NAME = ${NAME}"
```

1. override 안했을 때(build, run)

```bash
$ docker build -t basic . # build
# 결과
...
NAME = WonChul
...
```

```bash
$ docker run basic # run
# 결과
NAME = WonChul
```

2. override 했을 때(run)

```bash
$ docker run -e NAME=WONCHUL basic # run
# 결과
NAME = WONCHUL
```

3. override 했을 때(build, run)

```bash
$ docker build -t basic --build-arg NAME=WONCHUL . # build
# 결과
...
NAME = WONCHUL
...
```

```bash
$ docker run basic # run
# 결과
NAME = WONCHUL
```

```bash
$ docker run -e NAME=WONCHUL_ENV basic # run
# 결과
NAME = WONCHUL_ENV
```

### `CMD`
- 컨테이너가 시작될 때 실행
- Dockerfile에서 한번만 사용 가능
    - 마지막 `CMD`만 사용
- `CMD ["실행 파일", "매개 변수", "매개 변수 ..."]`
- `docker run [IMAGE] [COMMAND]`에서 `COMMAND`를 넣으면 `CMD`가 무시

### `ENTRYPOINT`
- `CMD`와 동일하게 컨테이너가 시작될 때 실행
- `CMD`와 같이 있으면 `ENTRYPOINT`는 실행 파일, `CMD`는 매개변수 역할을 함
- `docker run --entrypoint="[COMMAND] [IMAGE]"`를 사용하여 무시 가능

### TEST 1

```dockerfile
FROM debian:jessie-slim

CMD ["echo", "hello"]
CMD ["echo", "hello2"]
```

```bash
$ docker build -t basic . # build
```

```bash
$ docker run basic # run
# 결과
hello2
```

```bash
$ docker run basic echo hello3 # run
# 결과
hello3
```

### TEST 2

```dockerfile
FROM debian:jessie-slim

ENTRYPOINT ["echo"]
CMD ["hello"]
CMD ["hello2"]
```

```bash
$ docker build -t basic . # build
```

```bash
$ docker run basic # run
# 결과
hello2
```
```bash
$ docker run --entrypoint="cat" basic /etc/hostname # run
# 결과
34n343hbfd
```

### `ADD`
- 파일 복사
- 압축 파일인 경우, 압축을 품
- 단, URL로 가져온 파일은 압축만 해제하고 풀지는 않음
- OS에 따라서 압축 해제 여부가 있음
- 파일은 소유 `root:root`과 기존 권한을 가짐
- URL은 소유 `root:root`과 600 권한을 가짐

### `COPY`
- 파일 복사
- `ADD`와 달리 파일 그대로 가져옴
- 권한 그대로 설정

> 공통적으로 `.dockerignore`에 명시된 영역은 제외
