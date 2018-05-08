## Job 구성 및 실행

`Job`이 어떻게 실행되고, 실행 중에 메타 데이터가 저장 되는 방법에 대한 많은 고려사항이 있다.

### Job 설정

- `JobBuilderFactory`
- `Split`, `Decision`, `Flow` 제공

#### 재시작 가능성

- `JobBuilderFactory`에서 `preventRestart()`
- `Job`에서 `setRestartable(false)`
- 재시작이 불가능한 경우, `JobRestartException` 발생

#### JobExcution 가로채기

- `JobExecutionListener` 구현 (`beforeJob()`, `afterJob()`)
- `JobBuilderFactory`에서 `listener()`
- `afterJob()`은 성공/실패 여부와 관계 X
- `@BeforeJob`, `@AfterJob`

#### JobParametersValidator

- XML이나 `AbstractJob`의 서브 클래스를 이용하여 선택적으로 `JobParameter` 검증
- `DefaultJobParametersValidator`
- 인터페이스를 직접 구현 가능
- `JobBuilderFactory`에서 `validator()`

## Java 설정

- Spring 3.0 (Spring Batch 2.2.0) 부터 기능 제공
- 설정을 위한 2가지 컴포넌트가 있다. (`@EnableBatchProcessing`, 2가지 Builder)
- 다양한 `Bean` 생성(`JobRepository`, `JobLauncher`, `JobRegistry`, `PlatformTransactionManager`, `JobBuilderFactory`, `StepBuilderFactory`)
- 설정 핵심 인터페이스는 `BatchConfigurer`이다.

## JobRepository 설정

- `JobExecution`와 `StepExecution`의 다양한 영속성 도메인 객체에 대한 CRUD 오퍼레이션을 사용
- `DataSource`가 있다면 JDBC 기반 / 없다면 `Map` 기반
- 커스터마이징을 위해 `BatchConfigurer`의 `createJobRepository()` 구현(dataSource, transactionManager 필수)
- [Sample Schema](https://docs.spring.io/spring-batch/4.0.x/reference/html/schema-appendix.html#metaDataSchemaOverview)

#### JobRepository에 대한 Transaction 설정

- 설정이 잘 못 되었다면, repository는 transaction에 걸리지 않는다.
- `TransactionProxyFactoryBean`를 이용하여 구현할 수 있다.

#### 인메모리 Repository

- in-memory Map version의 `JobRepository` 지원
- 동시에 실행된 `JobInstance` 적합성 보장 X
- test 환경에는 `ResourcelessTransactionManager`

#### 비표준 데이터베이스 Repository

- `JobRepositoryFactoryBean`에서 `setDatabaseType` (auto-detect)
- auto increament 등의 효과를 얻기 위해 `incrementerFactory` 오버라이드 해야할지도 모른다.

## JobLauncher 설정

- 대부분의 `JobLauncher` 구현체는 `SimpleJobLauncher`
- `JobRepository` 필수
- `JobLauncher` - execute() -> Job -> **Business Logic** -> returning `JobExecution` with ExitStatus

![Alt Job Launcher Sequence image](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/job-launcher-sequence-sync.png)

- `SimpleJobLauncher`에서 비동기처리: `TaskExecutor`

## Job 실행

- 최소한의 요구사항: `JobLauncher`, 실행될 `Job` (같은 context이거나 아닐 수도 있다.)

#### Command Line에서 Job 실행

- 대부분의 경우 쉘 스크립트를 작성하여 시스템 프로세스를 동작
- `CommandLineJobRunner`을 이용하여 애플리케이션 시작 시에 동작 
- arguments 제공(`jobPath`: XML file 지정, `jobName`: 실행되는 job 이름)
- os 레벨에서 성공 여부를 판별하기 위해 `ExitCode` 상수를 제공

#### 웹 컨테이너에서의 Job

- `Launcher`는 비동기로 돌아간다.

## 많은 meta-data 방법

#### Repository 질의

- `JobExplorer`는 `JobRepository`의 읽기 전용 버전

#### JobRegistry

- `JobRegistry`의 부모 인터페이스: `JobLocator`
- 서로 다른 context에 존재하는 job을 중앙으로 수집하는데 유용
- `@EnableBatchProcessing`에서 자동 등록
- `JobRegistryBeanPostProcessor`으로 커스텀 

#### JobOperator

- `JobOperator`는 다양한 디펜던시를 가지고 있다. (`JobLauncher`, `JobRepository`, `JobExplorer`, `JobRegistry`)

#### JobParametersIncrementer

- `startNextInstance`는 항상 새로운 `Job`을 만든다. (`JobParametersIncrementer` 활용)
- `Job`에 문제가 있거나 처음부터 재시작하길 원할 때 유용
- `jobBuilderFactory`에서 `incrementer()`

#### Job 중지

- `JobOperator`에서 실행 중인 `JobExecution`을 가져와서 `JobOperator.stop()`을 활용 (즉시 종료 X)

#### Job 중단

- `FAILED`은 재시작 가능, `ABANDONED`은 재시작 불가능(skip 됨) 