# toString 메소드는 항상 오버라이드 하자

`toString()`의 보편적 계약으로 인해 반환되는 문자열은 간결하고 사람이 읽기 쉬운 형태의 정보 표현이어야 한다.

### ex. `PhoneNumber`

- `toString()` 오버라이딩하지 않았을 때, `PhoneNumber@163B91`
- `toString()` 오버라이딩해서 정보를 잘 표현했을 때, `(707) 867-5309`

### 정리

- 모든 서브 클래스들은 `toString()`를 오바라이드할 것을 권고한다.
- 가능하다면 toString 메소드에서는 객체의 모든 중요한 정보를 반환해야 한다.
- 표현 형식의 규정 여부와는 무관하게 아무튼 그 의도를 명쾌하게 문서화해야 한다.

### 참고

- https://projectlombok.org/features/ToString