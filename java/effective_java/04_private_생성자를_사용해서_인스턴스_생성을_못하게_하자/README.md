# private 생성자를 사용해서 인스턴스 생성을 못하게 하자

static 메소드와 static 필드만 모아둔 클래스 = 유틸리티 클래스

- abstract 클래스로 만들기 (X)
- 기본 생성자를 private 생성자로 만들면서 호출시에 Exception 호출 (+ 주석 필요)

```java
public class Math {

    public static final PI = 3.14;

    public static double abs(double number) { /* ... */ }

    // ...

    private Math() {
        // not create instance
        throw new AssertionError();
    }
}
```
