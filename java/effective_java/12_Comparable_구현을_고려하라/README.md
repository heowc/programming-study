# `Comparable` 구현을 고려하라

`compareTo`는 `Comparable` 인터페이스에 포함된 유일한 메소드이다.

## 이점

- 검색
- 최대/최소 계산
- 컬랙션을 정렬된 상태로 유지하기 용이

## 정리

- `compareTO` 메소드의 일반 규약은 `equals`와 비슷하지만, 이를 미준수 시에는 오동작할 수 있다.
- `compareTo`는 동치성 검사라기보다는 순서 비교이다.
- 정수형의 기본 자료형 필드는 관계 연산자(`<`, `>`)를 사용
- 부동소수점 필드는 `Double.compare`이나 `Float.compare`를 사용