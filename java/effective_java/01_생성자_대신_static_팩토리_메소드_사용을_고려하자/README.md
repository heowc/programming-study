## 장점

- 생성자와 달리 자기 나름의 이름을 가질 수 있다.
- 매번 새로운 객체를 만들 필요 없다. (ex. `Boolean.valueOf` - flyweight 패턴)
- 서브 타입도 반환 가능
    - 유연성을 가짐
    - 서비스 프로바이더의 근간이 됨
        - 서비스 인터페이스 API: 제공자가 구현
        - 제공자 등록 API: 구현체 등록
        - 서비스 접근 API: 서비스 인스턴스 획득
        - ex. JDBC - `Connection`, `DriverManager.registerDriver()`, `DriverManager.getConnection()`
- 매개변수화 타입 인스턴스의 생성 코드를 간결하게 해준다.

## 단점

- `public`, `protected` 생성자가 없다면 서브 클래스를 가질 수 없다. -> 컴포지션 유도 가능
- 다른 static 메소드와 구별이 쉽지 않다 -> 주석이나 작명 규칙을 갖도록 하자.
    - of, valueOf, getInstance, newInstance 등등..

**static 팩토리 메소드를 먼저 고려하지 않고 public 생성자를 쓰는 습관을 버리자**