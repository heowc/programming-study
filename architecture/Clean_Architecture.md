> http://www.yes24.com/Product/Goods/77283734

# 1장 

### 설계(design)와 아키텍처(architecture) 차이

이무런 차이가 없다.

### 목표

- 소프트웨어 아키텍처의 목표는 필요한 시스템을 만들고 유지보수하는 데 투입되는 인력을 최소화하는 데 있다.
- 개발자의 시각으로는 생산성이 떨어지며, 경영자의 시각으로는 인건비가 늘게 된다.
- 빨리 가는 유일한 방법은 제대로 가는 것이다.


# 2장

- 소프트웨어를 만든 이유는 기계의 행위를 쉽게 변경할 수 있도록 하기 위해서다. 만약 기계의 행위를 바꾸는 일을 어렵게 만들고자 했다면, 우리는 소프트웨어가 아니라 **하드웨어**라고 불렀을 것이다.
- 이해관계자는 범위가 비슷한 일련의 변경사항을 제시할 뿐이지만, 개발자입장에서는 복잡도가 지속적으로 증가하는 퍼즐 판 위에서 이해관계자가 계속해서 퍼즐 조각을 맞추라는 지시를 하는 것처럼 느껴진다.
   > 이를 유연하게 대처할 수 있도록 지속적으로 리팩토링하는 것이 개발자의 몫이라고 생각한다. 개발자는 서비스가 다양한 시도를 할 수 있도록, 시장 상황에 빠르게 대처할 수 있도록 유연함을 갖게 해야한다.
- 기능의 긴급성이 아닌 아키텍처의 중요성을 설득하는 일은 소프트웨어 개발팀이 마땅히 책임져야 한다.
- 효율적인 소프트웨어 개발팀은 이러한 투쟁에서 정면으로 맞서 싸운다.  **소프트웨어 개발자인 당신도 이해관계자임을 명심하라**


# 3장

- 구조적 프로그래밍 -  제어흐름의 직접적인 전환에 대해 규칙을 부과
- 객체지향 프로그래밍 - 제어흐름의 간접적인 전환에 대해 규칙을 부과
- 함수형 프로그래밍 -  할당문에 대해 규칙을 부과
    > 위 내용만으로는 나에겐 와닿지 않는 정의(?) 인듯 하다.

- 정리
    > 한가지 새로운 알게된 점은 이 들중 함수형 프로그래밍이 가장 먼저 생긴 패러다임이라는 것이다.

# 4장

데이크스트라는 “테스트는 버그가 있음을 보여줄 뿐, 버그가 없음을 보여줄수는 없다”고 말한 적이 있다.  다시 말해 프로그램이 잘못되었음을 테스트를 통해 증명할 수는 있지만, 프로그램이 맞다고 증명할 수는 없다. 
> 테스트를 작성하지 않는 것은 프로그래머가 작설한 코드가 잘못되었음을 테스트를 통해 증명하지 않음을 의미한다...

# 5장

- 좋은 아키텍처를 만드는 일은 객체 지향(Object-Oriented,OO) 설계 원칙을 이해하고 응용하는 데서 출발한다.
- 객체지향에 대한 모호한 설명
    - "데이터와 함수의 조합"
    - "실제 세계를 모델링하는 새로운 방법"
- 객체지향의 본질을 설명하기 위한(최소한의 지원 소요) 세가지 분류: **캡슐화, 상속, 다형성**

### 캡슐화

- 데이터와 함수가 **응집력 있게 구성된 집단**을 서로 구분 짓는 선을 그을 수 있어야함
  ㄴ 데이터는 은닉되고, 일부 함수만 외부에 노출되어야함
- 하지만, OO가 아닌 언어(ex. C)에서도 충분히 가능하다.
    ```c
    // point.h
    struct Point;
    struct Point* makePoint(double x, double y);
    double distance (struct Point *p1, struct Point *p2);
    ```
    ```c
    // point.c
    #include "point.h"
    #include <stdlib.h>
    #include <math.h>
    struct Point {
     double x,y;
    };
    struct Point* makepoint(double x, double y) {
     struct Point* p = malloc(sizeof(struct Point));
     p->x = x;
     p->y = y;
     return p;
    }
    double distance(struct Point* p1, struct Point* p2) {
     double dx = p1->x - p2->x;
     double dy = p1->y - p2->y;
     return sqrt(dx*dx+dy*dy);
    }
    ```
- 자바와 C#은 헤더와 구현체를 분리하는 방식을 모두 버렸고, 이로 인해 캡슐화는 더욱 심하게 훼손되었다.
   > 자바는 이렇게 만들어볼 수 있지 않을까?
    ```java
    public final class Point {

        private final double x;
        private final double y;

        public static Point make(double x, double y) {
            return new Point(x, y);
        }

        private Point(double x, double y) {
            this.x = x;
            this.y = y;
        }

        public double x() {
            return x;
        }

        public double y() {
            return y;
        }

        public double distance(Point other) {
            final double dx = x() - other.x();
            final double dy = y() - other.y();
            return Math.sqrt((dx * dx) + (dy * dy));
        }
    }
    ```

### 상속

- 상속만큼은 객체지향언어가 확실히 제공했다. **But, C언어 또한 가능하다.**
    ```c
    // namedPoint.h
    struct NamedPoint;
    struct NamedPoint* makeNamedPoint(double x, double y, char* name);
    void setName(struct NamedPoint* np, char* name);
    char* getName(struct NamedPoint* np);
    ```
    ```c
    // namedPoint.c
    #include "namedPoint.h"
    #include <stdlib.h>
    struct NamedPoint {
     double x,y;
     char* name;
    };
    struct NamedPoint* makeNamedPoint(double x, double y, char* name) {
     struct NamedPoint* p = malloc(sizeof(struct NamedPoint));
     p->x = x;
     p->y = y;
     p->name = name;
     return p;
    }
    void setName(struct NamedPoint* np, char* name) {
     np->name = name;
    }
    char* getName(struct NamedPoint* np) {
     return np->name;
    }
    ```
    ```c
    // main.c
    #include "point.h"
    #include "namedPoint.h"
    #include <stdio.h>
    int main(int ac, char** av) {
     struct NamedPoint* origin = makeNamedPoint(0.0, 0.0, "origin");
     struct NamedPoint* upperRight = makeNamedPoint(1.0, 1.0, "upperRight");
     printf("distance=%f\n", distance((struct Point*) origin, (struct Point*) upperRight));
    }
    ```
    ㄴ Point와 NamedPoint의 선언된 **두 변수의 순서가 동일**하기 때문에 파생된 구조인 것 처럼 동작한다.

- 객체지향 언어에서는 업케스팅이 암묵적으로 이뤄진다.

### 다형성

- 다형성도.... C언어로 가능하다.
    > 도대체 C언어로 안되는게 무엇인가.... 🤔
- 함수를 가리키는 포인터를 응용한 것이 다형성이다. 
- 객체지향 언어는 이를 좀 더 안전하고 더욱 편리하게 사용할 수 있게 해준다.
- 플러그인 아키텍처
    - https://ko.wikipedia.org/wiki/%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8
    - https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/LoadingCode/Concepts/Plugins.html

#### 의존성 역전

- 다형성을 안전하고 편리하게 적용할 수 있는 메커니즘이 등장하기 이전에는 전형적이 호출 트리로 main함수가 고수준 함수를 호출하고, 고수준 함수가 다시 중간 수준 함수를 호출하고.... 이런식으로 호출 트리(main)에서 소스 코드 의존성의 방향은 반드시 제어흐름을 따르게 된다.
    > 실상... 거의 이런식으로 개발하고 있지 않을까...? 🤔
- 다형성을 안전하고 편리하게 제공 == **소스 코드의 의존성을 어디서든 역전시킬 수 있다**
- 객체지향 언어가 제공하는 힘.. 지향하는 것이다

### 결론

- 다형성을 이용하여 전체 시스틈의 모든 소스 코드 의존성에 대한 절대적인 제어 권한을 획득할 수 있는 능력이다.
- 플러그인 아키텍처를 구성 가능 (고수준에서 저수준 모듈에 대한 독립성을 보장할 수 있음)

> 객체지향 언어를 잘하자... 서로의 의존성을 줄이고 독립성을 보장하자! 😄 

# 6장

```java
public class Squint {
    public static void main(String args[]) {
        for (int i=0; i<25; i++)
            System.out.println(i*i);
    }
}
```
> 다음과 같이 변경할 수 있다.
```java
public class Squint {
    public static void main(String args[]) {
        IntStream.range(0, 25)
            .map(it -> it * it)
            .forEach(System.out::println);
    }
}
```

- 함수형 언어에서는 변수는 **변경되지 않는다.**
- 가변 변수로 인해 race condition, deadlock concurrent update 문제가 발생한다.
- 가변성 분리를 하기 위해서 `가변 컴포넌트`와 `불변 컴포넌트`를 분리하자
- 가변변수 보호를 위해 **트랜잭션 메모리**를 사용
    - 클로저의 atom 기능? 
      > ~~자바 `java.util.concurrent.atomic` 패키지에 있는 녀석들 같은?~~
      > https://ko.wikipedia.org/wiki/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%94%EB%84%90_%EB%A9%94%EB%AA%A8%EB%A6%AC
      > https://www.baeldung.com/java-multiverse-stm
- 이벤트소싱 활용하기
    - ex) 계좌 잔고를 변경하는 대신 트랜잭션 자체를 저장하여, 누군가 잔고 조회를 요청할 때마다 계좌 개설 시점부터 발생한 모든 트랜잭션을 단순히 더한다.
    - 결과적으로 가변변수를 없다.
    - 추가 전략으로, 특정 기준(ex, 날짜, 횟수 등)으로 그 전까지의 상태를 미리 저장해두는 방법도 있다.
    - 이와 같은 방법은 **데이터 저장소 또한 완전한 함수형으로 만들 수 있다. (CRUD가 아닌 CR)**


# 3부

- 좋은 소프트웨어 시스템은 깔끔한 코드로부터 시작한다. (**원칙 == SOLID**)
- '클래스'라는 단어를 사용했다고 해서 SOLID 원칙이 객체 지향 소프트웨어에만 적용된다는 뜻은 아니다.
    > '클래스'를 사용한다고 해서 SOLID가 적용되는 것 또한 아니다!
- SOLID 원칙의 목적
    - 변견에 유연하다.
    - 이해하기 쉽다.
    - 많은 소프트웨어 시스템에 사용될 수 있는 컴포넌트 기반이 된다.
- SOLID 원칙
    - SRP: 단일 책임 원칙
    - OCP: 개방 폐쇄 원칙
    - LSP: 리스코프 치환 원칙
    - ISP: 인터페이스 분리 원칙
    - DIP: 의존성 역전 원칙

# 7장

> 단일 모듈은 변경의 이유가 하나, **오직 하나**뿐이어야 한다.
> ㄴ 하나의 모듈은 하나의, 오직 하나의 (사용자 또는 이해관계자)에 대해서만 책임져야 한다.
> ㄴ 하나의 모듈은 하나의, 오직 하나의 (액터)에 대해서만 책임져야 한다.

- SOLID 원칙 중 그 의미가 가장 잘 전달되지 못한 원칙
    ㄴ가장 잘 못된 내용: **모든 모듈은 단 하나의 일만 해야한다 (X)**
    ㄴ해당 정의는 **함수**이다
- 모듈은 단 하나의 소스 파일일 수도 있고 클래스일 수도 있다. 하나로 정의할 수 있는것은 응집된 집합이다.
- **서로 다른 액터를 뒷받침하는 코드를 서로 분리**하자
    ㄴ 여러 private 메소드들의 집합이 유효범위가 될 수 있다.

# 8장

> 소프트웨어 개체(artifact)는 확장에는 열려 있어야 하고, 변경에는 닫혀 있어야한다.

- 아키텍처 수준에서 OCP 동작방식
    - Interactor > Controller > Presenter > View
    - Interactor > Database
- 저수준 컴포넌트에서 발생한 변경으로부터 **고수준 컴포넌트를 보호**할 수 있다
- 추이 종속성을 가지게 되면, 소프트웨어 엔티티는 ‘자신이 직접 사용하지 않는 요소에는 절대로 의존해서는 안 된다’
    > 마치 컨트롤러에서 도메인 엔티티 클래스를 참조하게 되면 위와 같은 현상이 생긴다. 이를 해결하기 위해서 `의존성 비순환 원칙`을 지켜야 한다고 하는데... 뒤에 나온 얘기니 생략하고.. 개인적인 생각은 해당 클래스를 참조하지 않도록 별도 클래스를 구성해야 하지 않을까? 싶다..

# 9장

- 초기에는 상속 사용하는 것으로만, 인터페이스와 구현체에도 적용되는 더 광범위한 소프트웨어 설계 원칙으로 변모해 왔다.
    - 자바 인터페이스와 이를 구현한 여러 개의 클래스
    - 동일한 REST 인터페이스에 응답하는 서비스 집단

# 10장

- 필요 이상으로 많은 걸 포함하는 모듈에 의존하는 것은 해로운 일이다.

# 11장

- 유연성이 극대화된 시스템 = **코드 의존성이 추상에 의존하며 구체에는 의존하지 않는 시스템**
- 자바와 같은 정적 타입 언어에서 이 말은 use, import, include 구문은 **오직 인터페이스나 추상 클래스 같은 추상적인 선언만을 참조해야 한다**
    > 확실히 비현실적이다. 😎
- 의존하지 않도록 피하고자 하는 것은 바로 변동성이 큰 구체적인 요소이다.
    ㄴ 변동성이 큰 구현체에 의존하는 일은 지양하고, 안정된 추상 인터페이스를 선호
- 실천방법
    1. 변동성이 큰 구체 클래스를 참조하지 말라
    2. 변동성이 큰 구체 클래스로부터 파생하지 말라
    3. 구체 함수를 오버라이드 하지 말라
    4. 구체적이며 변동성이 크다면 절대로 그 이름을 언급하지 말라
- 자바 등 대다수의 객체 지향 언어에서 이처럼 바람직하지 못한 의존성을 처리할 때 **추상 팩토리**를 사용한다. 


# 15장

-  소프트웨어 아키텍트라면 코드에서 탈피하여 고수준의 문제에 집중해야 한다는 거짓말에 절대로 속아 넘어가서는 안 된다.
    > 공감하는 바이다 👍
- 아키텍처 안에 담긴 소프트웨어 시스템이 쉽게 개발, 배포, 운영, 유지보수되도록 만들려면,  **가능한 한 많은 선택지를, 가능한 한 오래 남겨두는 전략을 따라야 한다.**
- 아키텍처의 궁극적인 목표는 시스템의 수명과 관련된 비용은 최소화하고, 프로그래머의 생산성은 최대화하는 데 있다.

# 22장

- Hexagonal Architecture, DCI, BCE
    - 프레임워크의 독립성
    - 테스트 용이성
    - UI 독립성
    - 데이터베이스 독립성
    - 모든 외부 에이전시에 대한 독립성

<img width="528" alt="스크린샷 2021-09-11 오후 4 59 56" src="https://user-images.githubusercontent.com/22594101/132940985-03fe68b0-10ba-4f83-8a41-73739911f835.png">

**소스 코드 의존성은 반드시 안쪽으로, 고수준의 정책을 향해야 한다**

- 엔티티
    - 전사적인 핵심 업무 규칙을 캡슐화
    - 일련의 데이터 구조와 함수의 집합
- 유스케이스
    - 애플리케이션에 특화된 업무 규칙
    - 엔티티로 들어오고 나가는 데이터 흐름을 조정
- 인터페이스 어댑터
    - 프레젠터, 뷰, 컨트롤러는 모두 인터페이스 어댑터 계층에 속한다
