## 불필요한 객체의 생성을 피하자

동일 객체를 매번 새로 생성하는 것보다는 하나의 객체로 재사용하는 것이 좋을 때가 있다. -> 불변 객체

```java
String s = new String("stringtree"); // --- (X)
String s2 = "stringtree"; // --- (O)
```

- 하나의 String 인스턴스만 사용
- 동일한 문자열 리터럴을 갖도록 재사용
- 생성자보다는 static 팩토리 메소드 사용

## 불필요한 객체를 생성하는 예

```java
public class Item05 {

    public static void main(String[] args) {
        Long sum = 0L;

        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            sum += i;
        }
    }
}
```

- 오토박싱
- Long sum에 매번 새로운 객체를 생성
- String += 도 해당되는 듯?
- 반대 > **방어 복사**