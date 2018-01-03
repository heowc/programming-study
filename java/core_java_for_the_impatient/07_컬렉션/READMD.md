## 콜랙션 프레임워크 개요

> api를 참고하자.

- 자료구조의 구현체이다.
- 기본 인터페이스는 `Collection`이다.
- 콜랙션 인테페이스는 모두 제네릭이며 요소 타입에 대응하는 타입 파라미터는 받는다.
- **Collections 유틸 클래스**에도 다양항 종류의 메소드가 있다.

## 반복자

> api를 참고하자.

- 컬랙션을 순회할 수 있도록 Collection의 슈퍼 인터페이스인 `Iterable<T>`가 존재한다.
- `Iterable<T>`를 구현한 클래스의 객체는 **향상된 for문으로 변환** 된다.
- 거꾸로 순회할 수 있는 Iterator의 서브 인터페이스인 `ListIterator`도 있다.
- 유효하지 않은 컬랙션를 계속 사용하면 `ConcurrentModificationException`을 던진다.


## 집합

> api를 참고하자.

- 집합(set)은 순서를 보장하지 않는다.
- `HashSet`과 `TreeSet`은 Set 인터페이스를 구현한다.


## 맵

> api를 참고하자.

- **키**와 **값**을 저장한다.
- 보통은 `HashMap`을 이용한다.
- `NullPointException`을 방지하지 위해 `getOrDefault()`를 활용한다.
- `ConcurrentHashMap`은 키나 값에 null을 허용하지 않는다.


## 기타 컬랙션

### 프로퍼티

- 텍스트 형식으로 쉽게 read/write를 가능한 맵을 구현한다
- `System.getProperties()`는 시스템 프로퍼티가 담긴 Properties 객체를 반환한다.

### 비트 집합

- `BitSet 클래스`는 비트 시퀀스를 저장한다.

### 열거 집합과 열거 맵

- `EnumSet`, `EnumMap`이 있다.

### 스택, 큐, 덱, 우선순위 큐

- `Stack 클래스`는 쓰면 안된다.(자바 초창기 레거시)

### 약한 해시 맵

- 프로그램 어디에도 해당 키와 값을 사용하지 않으면 가비키 콜렉터에 넘겨주어 해당 객체를 제거한다.


## 뷰

- 컬렉션 인터페이스를 구현한 경략 객체로, 요소를 저장하지 않는다.

### 범위

- 컬렉션에서 범위를 지정하여 서브 컬렉션을 가져올 수 있다.

### 빈 뷰와 싱글톤 뷰

- `emptyXXX()`, `singletonXXX()`
- 리스트는 불변 리스트이다.

### 수정 불가 뷰

- `Collections.unmodifiableXXX()`
- `Collections 클래스`는 동기화 뷰를 만들어내지만, **java.util.concurrent 패키지의 자료구조가 더 유용하다.**