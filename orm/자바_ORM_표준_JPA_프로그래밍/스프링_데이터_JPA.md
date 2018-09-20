### 웹 어플리케이션(with 스프링)
- `javax.persistemce.NoResultException` 예외가 발생하면, `org.springframework.dao.EmptyResultDataAccessException`
    - 데이터베이스 관련 예외는 `DataAccessException` 참고
- `@PersistenceContext`: 스프링이나 J2EE에서 관리하는 컨테이너에서 `EntityManager`를 주입
- `@PersistenceUnit`: `EntityManagerFactory` 주입
- JUnit에서 `@Transactional`은 기본적으로 테스트가 끝나면 롤백한다.

--------

### 스프링 데이터 JPA
- DAO, Repository와 같은 데이터 접근 계층을 개발할 때 구현 클래스 없이 인터페이스만 작성해도 개발을 완료할 수 있다.
- 스프링 데이터 프로젝트에는 JPA, MongoDB, Neo4j, Redis, Hadoop 등등이 있고 이를 추상화하고 있다.
- 공통 인터페이스로 인해 자주 사용되고 기본적인 CRUD를 제공한다.

```java
... JpaRepository<T, ID extends Serializable> ...
```
```text
JpaRepository
    └─ CrudRepository
        └─ PagingAndSortingRepository
            └─ Repository
```

- 특징
    - 메소드 이름으로 쿼리 생성
    - 메소드 이름으로 JPA NamedQuery 호출
    - `@Query`를 활용한 쿼리 정의
- `@Modifying`
- 페이징과 정렬
    - `PageRequest`, `Page`, `Pageable`, `Sort`
- `@QueryHints`
- `@Lock`

#### 명세
- JPA Criteria
- `org.springframework.data.jpa.domain.Specification`
    - 컴포지트 패턴
    - `where()`, `and()`, `or()`, `not()` 제공

### 웹 확장
- `@EnableSpringDataWebSupport`
- 도메인 클래스 컨버터, 페이징, 정렬
- `HandlerMethodArgumentResolver` 구현체들