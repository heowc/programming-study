### Java 8에서 11로 전환하기

- https://docs.microsoft.com/ko-kr/java/openjdk/transition-from-java-8-to-java-11?toc=/azure/developer/java/fundamentals/toc.json&bc=/azure/developer/breadcrumb/toc.json
- https://docs.microsoft.com/ko-kr/java/openjdk/reasons-to-move-to-java-11?toc=/azure/developer/java/fundamentals/toc.json&bc=/azure/developer/breadcrumb/toc.json

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

- JVM에 대한 통합 로깅 시스템
> https://openjdk.java.net/jeps/158
> - tags: gc, compiler, threads, ...
> - levels: error, warning, info, debug, ...
> - Command Options: https://openjdk.java.net/jeps/158#Command-line-options

### Java 10

https://openjdk.java.net/projects/jdk/10/

- Local-Variable Type Inference

```java
var list = List.of(1, 2, 3);
```

- GC Interface
> https://openjdk.java.net/jeps/304
> - 개선된 GC를 도입하기 위한 기반 작업

- G1 GC에서의 병렬 full GC
> https://openjdk.java.net/jeps/307
> - 이전 G1 GC에서의 full GC는 단일 스레드로 동작
> - 이를 병렬로 처리할 수 있도록 개선하여 보다 낮은 레이턴시를 갖고자함

- Application Class-Data Sharing(CDS)
> https://openjdk.java.net/jeps/310
> - 공통 클래스 메타데이터를 공유 저장소를 사용함으로써 시작시 성능, 소요시간 단축

```bash
java -Xshare:off -XX:+UseAppCDS -XX:DumpLoadedClassList=hello.lst -cp hello.jar HelloWorld
```

- Thread-Local Handshakes
> https://openjdk.java.net/jeps/312
> - global VM safepoint = STW (Stop The World)
> - 전체 쓰레드가 넘추는 것이 아닌 개별 쓰레드가 멈추게 하고자 함

- Experimental Java-Based JIT Compiler
> https://openjdk.java.net/jeps/317
> 자바기반의 JIT 컴파일러 실험적 도입(Graal)
> GraalVM이 자바기반의 컴파일러를 사용하고 있고 Java 11부터 지원햇던 것으로 기억나는 것으로 보아 이와 관련있는 내용인 듯 하다.

- Root Certificates
> https://openjdk.java.net/jeps/319

### Java 11

https://openjdk.java.net/projects/jdk/11/
