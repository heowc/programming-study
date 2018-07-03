# private 생성자나 enum 타입을 사용해서 싱글톤의 특성을 유지하자

하나의 인스턴스만 생성되는 클래스

 ## 방법1.

- 생성자를 private로 선언
- public static final로 인스턴스 초기화
- `AccessibleObject.setAccessible`로 private 생성자 호출 가능

## 방법2.

- 생성자를 private로 선언
- private static final로 초기화된 인스턴스를 `getInstance`로만 접근

> 자바 초기에는 [방법1.]이 성능상 이점이 있었으나, 근래에는 static 팩토리 메소드를 인라인 코드로 호출하기 때문에 이점이 사라졌다.

### 장점

1. API를 변경하지 않고 인스턴스 형태를 바꿀 수 있다.
2. 항목 27?? 하지만 그다지 유용하지 않음

### Serializable

- `implements Serializable`
- 모든 필드에 transient 선언
- `readResolve` 구현

## 방법3.

- 자바 1.5 이후 방법
- 열거형 타입 구현
- 직렬화나 리플렉션 자동 지원
- **아직 널리 적용되지 않았지만 가장 좋은 방법(?)**