## 예외 처리

### 예외 던지기

- `throw`문으로 클래스의 객체를 던진다.

### 예외 계층

- 모든 예외는 Throwable 클래스의 서브 클래스다.
- **Error**는 프로그램에서 처리할 수 없는 상황에 던진다.
- **Exception**는 개발자가 보고하는 예외이다.
	- 비검사 예외인 **RuntimeException**도 있다.

- 상황에 맞게 올바른 예외를 던져야 한다.

### 검사 예외 선언하기

- 예외를 공통 슈퍼클래스로 묶을 수 있다.

### 예외 잡기

- `try 블록`을 사용한다.
- `catch 절`에서 예외 항목을 찾는다.

### try-with-resources 문

- 예외 시, 리소스 관리에 문제점이 될 수 있었고, 이를 해결하기 위한 절이다.
- 각 리소스는 반드시 **AutoCloseable 인터페이스를 구현한 클래스** 이어야 한다.
- 리소스를 여러 개 지정할 수 있고, 해당 리소스들은 역순으로 닫힌다.

### finally 절

- AutoCloseable이 아닌 무엇가를 정리해야 할 때, `finally 절`을 사용한다.

### 예외 다시 던지기와 예외 연쇄하기

- 에러에 대한 로그를 기록하고 싶을 때 사용한다.

### 스택 추척

- 미처리 예외는 스택 추적에 표시된다.
- 스택 추적은 `System.err`로 전달 된다.
- 미처리 예외는 해당 예외가 일어난 스레드를 종료시키므로 조심한다.

### Objects.requireNonNull()

- 널 감사용 메소드이다.
- null의 경우, NullPointerException이 일어난다.


## 단정(assertion)

방어적 프로그래밍 방법이다.
테스트 중에만 검사하고, 제품용 코드에서는 자동으로 삭제되게 할 수 있다.

### 단정 사용하기

```java
assert 조건식;
assert 조건식 : 표현식;
```

- 거짓이면, AssertionError를 던진다.

### 단정 활성화와 비활성화

- `-enableassertions`이나 `-ea`옵션으로 활성화한다.
- `-disableassertions`이나 `-da`옵션으로 비활성화한다.


## 로깅

### 로거 사용하기

- `Logger.getGlobal()`를 호출하여 기본로거(logger)를 사용할 수 있다.
- 비활성화된 로그 메시지를 생성하는 비용을 줄이고자 한다면 람다 표현식을 사용하자.
	- why?) Supplier 인터페이스를 구현하게 되는데 이는 logger 객체가 생성된 이후에 실행된다.
	
### 로거

- 패키지 구조와 비슷한 로거 이름을 가진 각각의 로거 객체를 만들어 사용한다.

### 로거 레발

- **SEVERE > WARNING > INFO > CONFIG > FINE > FINER > FINEST**
- 기본 설정은 SEVERE, WARING, INFO만 로그로 기록한다.

### 기타 로그 메소드

- `entering` : 흐름 추적에 유용
- `throwing` : 예외 로그 기록

### 로깅 설정

- 기본 설정 파일은 `jre/lib/logging.properties`이다.
- 프로퍼티 변경하고 싶다면 애플케이션 시작 때 설정한다.

```bash
java -Djava.util.logging.config.file={file}
```

- 기본 로깅 레벨 변경

```properties
level={LEVEL}
```

### 로그 핸들러

- 로거는 로그에 대한 레코드를 **ConsoleHandler**로 보낸다.
- 로거 핸들러는 레코드를 `System.err` 스트림에 출력한다.
- 다른 곳으로 보내려면 다른 핸들러를 추가해야 한다. 로깅 API는 `FileHandler`와 `SocketHandler`를 제공한다.

### 필터와 서식 지정자

- Filter 인터페이스로 필터링할 수 있다.
- 다른 형식의 로그 레코드를 내보낼 경우 Formatter 클래스를 확장한다.