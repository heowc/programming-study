## 입력/출력 스트림, reader와 writer

- **입력 스트림**: 바이트를 읽어올 수 있는 자바 API (ex. 파일, 네트워크 연결, 메모리 배열)
- **출력 스트림**: 바이트의 목적지

### 스트림 얻기

파일 

```java
InputStream in = Files.newInputStream(path);
OutputStream out = Files.newOutputStream(path);
```

URL

```java
URL url = new ("http://horstmann.com/index.html");
InputStream in = url.openStream();
```

Byte

```java
byte[] bytes = ...;
InputStream in = new ByteArrayInputStream(bytes);
// ...
ByteArrayOutputStream out = new ByteArrayOutputStream();
byte[] bytes = out.toByteArray();
```

### 바이트 읽기

```java
InputStream in = ...;
int n = in.read(); // 바이트를 범위의 정수(0 ~ 255)로 반환
                    // 끝을 도닳면 -1 반환
// ...
byte[] bytes = ...;
int n = in.read(bytes);
int bulkN = in.read(bytes, start, length);
```

### 바이트 쓰기

- `OutputStream`은 write 메소드는 개별 바이트와 바이트 배열을 쓸 수 있다.
- 쓰기를 마친 후에는 반드시 닫아줘야 하는데 이 때, `try ~ with ~ resources`문을 사용하는 것이 효율적이다.

```java
try (OutputStream out = ...) {
    out.write(bytes);
}
```

### 문자 인코딩

- 텍스트를 다룰 때는 인코딩 방식이 중요하다.
- 자바는 유니코드 표준을 사용한다. (각 문자나 코드 포인트는 21비트 정수이다.)
- 가장 일반적인 인코딩 방법은 **UTF-8**이다.
    - 각 유니코드의 코드 포인트를 1~4바이트로 인코딩한다.
    - 아스키 문자는 각각 1바이트씩만 차지한다.
- UTF-16
    - 16비트 1개나 2개로 인코딩(2~4바이트)
    - 자바 문자열에는 UTF-16 인코딩을 사용한다.
    - 빅 엔디언과 리틀 엔디언 형태가 있다.
    
        > 빅 엔디언: 상위 바이트가 먼저 온다. <br/>
        리틀 엔디언: 하위 바이트가 먼저 온다.
        
- ISO 8859-1
    - 1바이트
    - 서유럽 언어의 악센트 문자가 포함
- Shift-JIS
    - 일본어 문자용 가별 길이 코드
    
<br/>

- 바이트 스트림에서 문자 인코딩을 자동으로 감지하는 방법은 없다.
- 일부 API는 기본 문자 집합을 이용한다.(기본 문자 집합은 해당 PC 운영체제의 문자 인코딩을 말한다.)
- 웹 접근은 header의 `Content-Type`을 검사한다.
- **`StandardCharsets`**
- `Charset.forName()`

### 텍스트 입력

- `Reader`

Basic

```java
Reader reader = new InputStreamReader(input, StandardCharsets.UTF_8);
```

파일을 하나의 문자열

```java
String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
```

파일을 하나의 리스트

```java
List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
```

파일을 하나의 스트림

```java
Stream<String> lines = Files.lines(path, StandardCharsets.UTF_8);
```

> 스트림으로 가져올 때 예외가 발생하면 `UncheckedIOException`이 발생하기 때문에 확인이 필요하다.


- 파일에서 숫자나 단어를 읽으려면 `Scanner`를 사용한다.
- 파일에서 입력이 오지 않으면 `BufferedReader`로 래핑한다.
   - 효율을 높이기 위해 청크로 읽을 수 있다. (`readLine`, `lines`)
   - `Files.newBufferedReader(path, StandardCharsets.UTF_8)`

### 텍스트 출력

- `Writer`

Basic

```java
Writer writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8);
// PrintWriter를 사용하면 좀 더 편리하다.
```

문자열

```java
String content = ...;
Files.write(path, content.getBytes(StandardCharsets.UTF_8));
```

리스트

```java
Collection<String> lines = ...;
Files.write(path, lines, StandardCharsets.UTF_8);
```

- `StringWriter`: 문자열 캡처

### 바이너리 데이터 읽기/쓰기

- `DataInput`, `DataOutput`
- 너비가 고정되어 있어 **임의 접근 속도가 빠르고** **텍스트 파싱보다 빠르다**. 
- `DataInputStream`, `DataOutputStream`

### 임의 접근 파일

- `RamdomAccessFile`
- 읽기 전용, 읽기와 쓰기 전용으로 열 수 있다.

### 메모리 맵 파일

- 아주 큰 파일에도 효율적이다.
- 입출력 스트림과 방식이 다르다.
    - 파일에 대한 채널 획득
    - 메모리로 래핑

### 파일 잠금

- 동시에 여러 파일을 수정할 때 **파일 잠금**을 이용한다.
- `FileLock` 클래스를 이용한다.
   - lock: 대기
   - tryLock: 잠금 또는 null로 즉시 반환


## 경로, 파일, 디렉토리

### 경로

- `Path`
- 루트 구성 요소는 파일 시스템에 따라 다르다.
- `Paths.get()` 호출시, 올바른 경로가 아니라면 `InvalidPathException`을 던진다.

```java
Path homeDireactory = Paths.get("/home/heowc");
```

- `resolve`: 경로 결합
- `revoleSibling`: 이웃 경로
- `relativize`: `..`
- `toAbsolutePath`: 절대 경로
- ...

### 파일과 디렉토리 생성하기

- `Files.createDirectory(path)`: 디렉토리 생성
- `Files.createDirectories(path)`: 디렉토리 생성(중간에 없는 디렉토리까지)
- `Files.createFile(path)`: 빈 파일 생성
- `exists`: 파일이나 디렉토리 존재 여부

### 파일 복사, 이동, 삭제

- `Files.copy(formPath, toPath)`: 복사
- `Files.move(formPath, toPath)`: 이동
- `Files.delete(path)`: 삭제(없으면 예외를 던진다)
- `Files.deleteIfExists(path)`: 존재여부 판단 후, 삭제

### 디렉토리 항목 읽기

- `Files.list`: 디렉토리 항목 반환
- `Files.walk`: 디렉토리 항목 반환(자손 디렉토리 모두)
- `Files.walkFileTree`: 자식 디렉토리부터 순회하여 항목 반환


## URL 커넥션

- **URL**을 읽어오는 클래스

```java
URL url = new URL("https://heowc.github.io"); // URL 객체 생성

URLConnection con = url.openConnection(); // URLConnection 객체 생성

con.setRequestProperty("Content-Type", "*/*"); // 요청 속성 설정

//con.setDoOutput(true); // 출력 스트림 사용 여부

try (OutputStream out = con.getOutputStream()) { // 출력
    // ...
}

//con.connect(); // 연결이 안됐다면 연결 시킴

Map<String, List<String>> headers = con.getHeaderFields(); // 응답 헤더 가져오기

try (InputStream input = con.getInputStream()) { // 응답된 입력 스트림
    sb.append(input.read());
}
```


## 정규 표현식

- 문자열 패턴 지정

### 정규 표현식 문법

- `*`: 0번 이상 반복
- `+`: 1번 이상 반복
- `?`: 0번 또는 1번
- `{}`: 다수의 표현
- `|`: 선택
- `()`: 그룹
- `[]`: 선택 문장의 집합
- `^`: 반전
- `\`: 미리 정의된 문자 클래스
- `^  $`: 시작과 끝

```java
String input = ...;

// 1.
if (Pattern.matches("regex", input)) {
    // true
}

// 2.
Pattern pattern = Pattern.compile("regex");
Matcher mather = pattern.matcher(input);
if (matcher.matches()) {
    // true
}
```

## 직렬화

**객체 직렬화**: 객체를 다른 곳으로 보내거나 디스크에 저장할 수 있는 바이트들의 묶음으로 변환하고, 해당 바이트들로 부터 객체를 재구성할 수 있도록하는 메커니즘

### Serializable 인터페이스

- 객체를 직렬화하기 위해서는 `Serializable` 인터페이스를 구현한 클래스여야 한다.
- 마커 인터페이스이다.

### 일시적인 인스턴스 변수

- 직렬화하면 안되는 변수를 위해 `transient` 키워드를 붙인다.

### 버전 관리

- 직렬화에서는 장기 영속성을 또는 직렬화와 역직렬화 사이에서 클래스가 변할 수 있는 상황에 어떻게 될지 고려해야 한다.
- `serialVersionUID` 고유 식별자를 지정
- 일치하지 않으면 `InvalidClassExcetion`을 던진다.
- `serialVersionUID`를 지정하지 않으면 인스턴스 변수, 메서드, 슈퍼 타입의 내용을 해싱해서 자동으로 만든다.