### Java 9

https://openjdk.java.net/projects/jdk9/

- JPMS = Project Jigsaw
> 모듈화와 관련 있으며, 패키징시에 조금 더 작게 만들기 위함
> 프레임워크를 쓰는 입장에서 이를 줄일 수 있는 방법이 있을까... 싶긴하다.
> 스프링
> - https://github.com/spring-projects/spring-framework/issues/18079
> - https://github.com/spring-projects/spring-framework/issues/18289


- JShell
> REPL (Read-Eval-Print-Loop)
> 인터프리터 언어에선 흔하게 cli를 통해 가벼운(?) 코딩이 가능하도록 지원함

- G1GC를 기본 GC 콜렉터로 지정
> - https://johngrib.github.io/wiki/java-g1gc/
> - https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm#JSGCT-GUID-1CDEB6B6-9463-4998-815D-05E095BFBD0F

- Immutable Collection `of(...)` 추가
> https://openjdk.java.net/jeps/269

- properties 파일 ISO-8859-1 -> UTF-8
> https://openjdk.java.net/jeps/226

### Java 10

https://openjdk.java.net/projects/jdk/10/

- Local-Variable Type Inference

```java
var list = List.of(1, 2, 3);
```
