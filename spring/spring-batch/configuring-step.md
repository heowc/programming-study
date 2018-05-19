![Alt Step image](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/step.png)

## Chunk지향 처리

- Spring Batch에서 일반적으로 사용
- 한 번에 하나씩 데이터를 읽고 트랜잭션 경계 내에서 쓰여지는 'Chunk'를 생성

![Alt Chunk지향 처리 image](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/chunk-oriented-processing.png)

### Step 설정

- 샘플은 [여기](https://docs.spring.io/spring-batch/4.0.x/reference/html/step.html#configuringAStep)를 참고
- `TransactionManager`와 `Repository`는 제공(`@EnableBatchProcessing` 사용시)
- `ItemProcessor`는 선택적으로 사용
    - `ItemReader` > `ItemProcessor` > `ItemWriter`
    - `ItemReader` > `ItemWriter`

### Commit 간격

- `chuck` 설정(기본값: 1)

### 재시작을 위한 Step 설정

- `startLimit`: 시작 횟수 제한(기본값: Integer.MAX_VALUE)
- 초과시 Exception 발생(`StartLimitExceededException`)
- `allowStartIfComplete`: 항상 실행(무조건 실행되어야 하는 `Step`에 유용)
- [Example](https://docs.spring.io/spring-batch/4.0.x/reference/html/step.html#stepRestartExample)

### Skip 로직 설정

- `skip`: 어떤 Exception 발생 시, skip
- `noSkip`: Skip 되어질 Exception의 하위 Exception에서 skip하고 싶지 않을때 사용

### Retry 로직 설정

- `retry`: 어떤 Exception 발생 시, 재시도
- `retryLimit`: 재시도 횟수

### Rollback 설정

- 기본적으로 `ItemWriter`에서 문제 발생 시  `rollback`
- 롤백이 안되고자 한다면 `noRollback`
- `readerIsTransactionalQueue`: 가령 JMS같은 Queue를 사용하는 경우, 매번 Queue의 메시지를 다시 저장하므로 이를 버퍼링하지 않도록 구성

### 트랜잭션 속성

- `Step` 마다 트랜잭션 속성을 변경 가능
- `DefaultTransactionAttribute`

### Step에 ItemStream 등록

- 별도의 생명주기를 가지는 부분?
- delegate
- 조금 더 봐야할 부분..([참고](https://docs.spring.io/spring-batch/4.0.x/reference/html/step.html#registeringItemStreams))

### Step 실행 가로채기

- `StepListener`를 확장한 많은 클래스 존재([종류](https://docs.spring.io/spring-batch/4.0.x/reference/html/step.html#interceptingStepExecution))
- `StepExecutionListener`, `ChunkListener`, `ItemReadListener`, `ItemProcessListener`, `ItemWriteListener`, `SkipListener`

## TaskletStep

- `Step`이 아닌 또 다른 Batch 구성 방법(ex. 프로시저 call)
- `Tasklet`: 하나의 메소드만을 가진 단순한 인터페이스(`execute()`)
    - `TaskletStep`에 의해 `RepeatStatus.FINISHED`나 exception을 던질 때까지 반복적으로 호출
    - 각각의 `Tasklet` 마다 트랜잭션을 가짐
    - 프로시저, 스크립트, SQL 호출 등을 구현
- `TaskletStep` 구현 시,`chunk` X

### TaskletAdapter

- `MethodInvokingTaskletAdapter`: 기존 메소드를 그대로 사용(프록시)
- [`Tasklet` 구현 예제](https://docs.spring.io/spring-batch/4.0.x/reference/html/step.html#exampleTaskletImplementation)

## Step 흐름 제어

### 순차적 흐름

- `start()`를 시작으로 `next()`로 묶음

### 조건적 흐름

- 많은 case(ex. 성공 여부)에 따른 다른 Step 처리
- `ExitStatus`, ~~`BatchStatus` (뭐가 좋을까?)~~
- `start` .. `on` .. ( ... `from` .. `on` .. `to` ... ) `end`

### Stop 설정

- `Step` 종료: `end()`
- `end()`를 하게되면, `BatchStatus.COMPLETED`
- `Step` 실패: `fail()`
- 중지된 `Job`을 재시작할 때 시작할 `Step`: `stopAndRestart()`

### 프로그래밍적 흐름 결정

- `JobExecutionDecider`

### 흐름 분리

- `split()`
- 병렬 처리 제공

### Job간 흐름 정의 및 종속성 외부화

- flow의 일부분을 분리 및 재사용 가능
    1. `FlowBuilder` 이용
    2. `JobStep` 이용 (좋은 방법은 아닌 듯?)

## Job과 Step 속성의 늦은 바인딩

- `@Value`, `-D` (ex. `-Dinput.file.path`)
- 이름만 다른 동일한 구조의 파일에 유용(ex. 날짜별로 파일을 만드는 경우?)

### StepScope

- 늦은 바인딩으로 `jobParameters`을 넘겨주게 되면 해당 빈을 미리 인스턴스화 할 수 없기 때문에 (Spring 컨테이너의 일부가 아니기 때문에) `@StepScope`을 추가해야 한다. 

### JobScope

- Spring Batch 3.0에 소개.
- 실행중인 작업 당 하나의 빈 인스턴스만 존재
- `@JobScope`를 명시해줘야 하는 이유는 `@StepScope`의 이유와 같다.
