# equals 메소드를 오버라이드 할 때는 hashCode 메소드도 항상 같이 오버라이드 하자

-  `Object.hashCode()`의 보편적 계약을 위반
-  해시(hash) 기반의 컬렉션에서 오동작할 수 있다.

### `Object.hashCode()` 계약 사항

1. 애플리케이션 설행 중에 같은 객체에 대해 한 번 이상 호출되더라도 `hashCode()`는 같은 정수를 일관성 있게 반환
2. `equals()` 호출 결과 두 객체가 동일하다면，두 객체 각각에 대해 `hashCode()` 를 호출했을 때 같은 정수 가 나와야 한다.
3. `equals()` 호출 결과 두 객체가 다르다고 해서 두 객체 각각에 대해 `hashCode()`를 호출했을 때 반드시 다른 정수 값이 나올 필요는 없다.

### 그 외

- 모든 객체가 동일한 hashCode가 나오는 것은 **최악의 메소드**이다.
- 자바 플랫폼 라이브러리의 많은 클래스들은 자신의 `hashCode()`에서 어떤 연산을 거쳐 정확하게 어떤 값을 반환하는지에 대한 명세를 갖고 있다. (API 문서를 찾아보자. [String](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html)/[Integer](https://docs.oracle.com/javase/7/docs/api/java/lang/Integer.html)/[Date](https://docs.oracle.com/javase/7/docs/api/java/util/Date.html))