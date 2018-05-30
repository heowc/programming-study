여러가지 병렬처리를 제공

## 멀티 쓰레드 Step

- `TaskExecutor`
- `throttleLimit()`로 인한 쓰레드 제한
- `ItemReader`가 thread safe하지 않을 경우, `SynchronizedItemStreamReader`을 사용하거나 synchronizing delegator를 만든다. (writer는 없네??)

## 병렬 Step

- `FlowBuilder`를 이용한 구성(기본값: `SyncTaskExecutor`)
- [예시](https://docs.spring.io/spring-batch/4.0.x/reference/html/scalability.html#scalabilityParallelSteps)

## Remote Chunking

![Alt Remote Chunking](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/remote-chunking.png)

- 멀티 프로세싱 방법
- [자세한 내용은 후반에 있는 듯](https://docs.spring.io/spring-batch/4.0.x/reference/html/spring-batch-integration.html#remote-chunking)

## Partitioning

![Alt Partitioning](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/partitioning-overview.png)

- Step 실행을 분할하고 원격으로 실행하기위한 [SPI](https://ko.wikipedia.org/wiki/%EC%A7%81%EB%A0%AC_%EC%A3%BC%EB%B3%80%EA%B8%B0%EA%B8%B0_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4_%EB%B2%84%EC%8A%A4) 제공
- `PartitionStep`, 전략 인터페이스(`PartitionHandler`, `StepExecutionSplitter`)

![Alt Partitioning SPI](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/partitioning-spi.png)

- `gridSize()`: `throttleLimit()`과 비슷
- [문서 - partitioning](https://docs.spring.io/spring-batch/4.0.x/reference/html/scalability.html#partitioning)

### PartitionHandler

- 원격이나 그리드 환경의 구조를 알고 있는 컴포넌트
- 원격 `Step` 인스턴스에 DTO 같은 특정 형식으로 `StepExecution`을 보낼 수 있음
- 다양한 구현체(simple RMI remoting, EJB remoting, custom web service, JMS, Java Spaces, shared memory grids (like Terracotta or Coherence))
- 로컬에서 멀티 쓰레드로도 활용 가능(`TaskExecutorPartitionHandler`)

### Partitioner

- `SimplePartitioner`

### Binding Input Data to Steps
