# ReactiveX

`ReactiveX`는 Observer 패턴, Iterator 패턴 및 함수형 프로그래밍를 결합한 것이다.

### ReactiveX는 'functional reactive programming'이 아니다.

차이점 중 하나는 functional reactive programming은 시간이 지남에 따라 지속적으로 변하는 값에서 작동하는 반면, ReactiveX는 시간이 지남에 따라 emit 되는 불연속 값에서 작동한다는 것이다.

### 왜 Observables 을 사용하는가?

Observable을 사용함으로써 배열과 같은 콜렉션의 단순하거나 복잡한 연산 작업을 비동기 이벤트 스트림으로 처리를 할 수 있다.

- Observables Are Composable
- Observables Are Flexible
- Observables Are Less Opinionated
- Callbacks Have Their Own Problems
- ReactiveX Is a Polyglot Implementation

### Reactive Programming

콜랙션에 대한 다양한 연산을 제공한다.
(filter, select, transform, combine, compose, ...)

Iterable과 Observable간의 차이점은 data flows이다.

### Observable

ReactiveX에서 옵저버는 Observable을 구독한다.

옵저버에 의해 임의의 순서에 따라 병렬로 실행되고 결과는 나중에 연산된다.

통상적으로 이 모델은 리액터 패턴을 말한다.

> 리액터 패턴? 하나 이상의 입력에 의해 서비스 핸들러가 동시에 전달된 서비스 요청을 처리하기 위한 이벤트 처리 패턴

##### Subscribe를 하기 위한 메소드

- `onNext`: 새로운 item을 넘겨 받는 메소드
- `onCompleted`: 오류가 되지 않고 완료가 되었을 때 실행되는 메소드
- `onError`: 오류가 발생되었을 때 실행되는 메소드

##### Hot Observable? Cold Observable?

scbscribe가 가능한 시점은 Observable에 따라 다르다.

Hot Observable은 생성되자 마자

Cold Observable은 Obsever가 구독할때 부터

### Operators

언어에서 제공하는 메서드의 이름과 유사한 형태로 연산자의 네이밍 컨벤션을 유지하고 있다.

해당 내용은 API를 참고하며 익숙해지는게 답인 듯 하다. 문서를 참고하자 (http://reactivex.io/documentation/ko/operators.html)

### Single

Observable과 유사

항상 한 가지 값 또는 오류 알림 중 하나만 emit (`onSuccess`, `onError`)

### Subject

ReactiveX의 일부 구현체에서 사용 가능한 일종의 교각 혹은 프록시

##### 종류

각각의 Subject는 특정 상황에 맞도록 설계

- `AysncSubject`: Observable로부터 배출된 마지막 값(만)을 배출하고 Observable의 동작이 완료된 후에야 동작한다.
- `BehaviorSubject`: Observable이 가장 최근에 발행한 항목의 발행을 시작하며 그 이후 Observable(들)에 의해 발행된 항목들을 계속 발행한다.
- `PublishSubject`: 구독 이후에 Observable(들)이 배출한 항목들만 옵저버에게 배출
- `ReplaySubject`: 옵저버가 구독을 시작한 시점과 관계 없이 Observable(들)이 배출한 모든 항목들을 모든 옵저버에게 배출

### Scheduler

멀티스레딩을 적용하고 싶다면, 특정 스케줄러를 사용해서 연산자(또는 특정 Observable)를 실행

`SubscribeOn` 연산자는 다른 스케줄러를 지정해서 Observable이 처리해야 할 연산자들을 실행

# RxJava

Java VM의 ReactiveX 구현체

비동기 및 이벤트기반 애플리케이션을 작성하기 위한 라이브러리

### 가볍다

Observable 추상화 및 관련 고차원 함수에만 초점을 맞추는 단일 JAR로 구현

### Polyglot

Java 6 이상이고 JVM 기반의 언어(Groovy, Clojure, JRuby, Kotlin, Scala)에서 사용가능

# 참고

ReactiveX: http://reactivex.io/intro.html

RxJava: https://github.com/ReactiveX/RxJava/wiki


