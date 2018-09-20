## JPA란

객체으로부터 SQL 기반의 스키마를 가진 관계형 데이터 모형으로의 데이터 표상을 매핑하는 기술

- 데이터 질의와 검색 편의 제공
- 도메인 중심적 애플리케이션(↔ 데이터 중심적 애플리케이션)
- 벤더 지정적인 SQL 코드를 제거 & 캡슐화

## Hibernate

- JPA 구현체 중 하나

### 아키텍처

- `SessionFactory`: 데이터베이스에 대한 컴파일된 매핑들의 thread safe 캐시. `Session`과 `ConnectionProvider` 클라이언트를 위한 팩토리
- `Session`: 애플리케이션과 영속 저장소 사이의 객체. JDBC 커낵션 포장
- `Persistent Objects`
- `Transient Objects`: `Session`과 연관되어 있지 않은 영속 클래스의 객체들
- `Transaction`: 트랜잭션 추상화
- `ConnectionProvider`: JDBC 커넥션들의 팩토리
- `TransactionFactory`: `Transaction` 객체들의 팩토리

### 인스턴스 생명주기

![alt Persistent Objects Lifecycle Image](https://user-images.githubusercontent.com/22594101/40899194-af751f14-6800-11e8-9dff-8ab50ebe304c.png)

## 영속 객체

### Entity를 만들기 위한 간단한 규칙들

- No Argument Constructor
- `@Id`
- non final
- ~~자바빈즈 스타일~~ `@Accessor`, `@Mutator`

### `equals()`, `hashcode()`

- 동일 인스턴스를 갖고자 하는 경우

## 기본 O/R 매핑

- XDoclet, Middlegen 등의 XML 설정법을 활용
- JDK 5.0 이후에는 애노테이션이 도입 및 활용 가능([JSR-220](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_%ED%8D%BC%EC%8B%9C%EC%8A%A4%ED%84%B4%EC%8A%A4_API))
