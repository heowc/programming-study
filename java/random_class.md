## Random Class

> https://www.logicbig.com/how-to/java-random/different-random-classes.html

### `java.util.Random`
- Since Java 1.0
- Thread Safe
- 여러 Thread에서 동시 접근하면 경합이 발생하여 성능이 저하됨

```java
new Random().nextInt(100);
```

### `java.security.SecureRandom`
- Since Java 1.1
- Thread Safe
- 암호학적으로 강력한 랜덤 숫자 생성기
- 보안에 민감한(?) 애플리케이션에서 사용

```java
new SecureRandom().nextInt(100);
```

### `java.util.concurrent.ThreadLocalRandom`
- Since Java 1.7
- 현재 Thread에 격리된 랜덤 숫자 생성기
- `java.util.Random` 보다 오버헤드가 적다

```java
ThreadLocalRandom.current().nextInt(0, 100);
```


### `java.util.SplittableRandom`
- Since Java 1.8
- Non Thread Safe
- 고성능 랜덤 숫자 생성기
- 병렬 스트림에서 유용

```java
new SplittableRandom().nextInt(0, 100);
```
