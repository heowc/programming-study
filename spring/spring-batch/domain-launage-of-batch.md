## Batch Domain 용어

![Alt Batch Stereotypes image](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/spring-batch-reference-model.png)

### Job

- 완전한 Batch 프로세스를 함축한 하나의 Entity
- 간단하게는 Spring Batch에서 Step 인스턴스의 컨테이너라고도 할 수 있다.
- 기본 구현체는 `SimpleJob` 이다.

#### JobInstance

- 논리적인 Job 실행
- 로드 할 데이터와 전혀 관련 X (`ItemReader`가 결정)

#### JobParameters

- 다른 `JobInstance` 와 구별하는 방법? => `JobParameters`
- Batch Job이 시작할 때 사용되는 파라미터의 집합 객체
- 식별, 참조 데이터로 사용됨
- `JobInstance` = `Job` + 식별 `JobParameters`

#### JobExecution

- `Job`의 단일 실행을 시도하는 기술적인 개념
- 실행의 마무리는 성공이나 실패일 수 있다.
- [Propertes 참고](https://docs.spring.io/spring-batch/4.0.x/reference/html/domain.html#jobexecution)

### Step

-  Batch Job의 독립적이고 순차적인 단계를 함축한 Domain 객체
- `Job`은 하나 이상의 Step을 가지고 있다.
- Batch를 처리하고 정의하는 모든 정보를 포함
- 고유한 `JobExecution`과 관련된 개별 `StepExecution` 존재

![Alt Job Hierarchy With Steps Image](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/jobHeirarchyWithSteps.png)

#### StepExecution

- `Step`의 단일 실행을 시도하는 기술적인 개념
-  각각의 `Step` 마다 새로운 `StepExecution`이 생성
- `Step`이 실패하면 이후 `Step`은 실행하지 않는다.
- 각 `Step`에는 `ExecutionContext`(통계, 상태 정보와 같이 일괄 실행에서 유지해야하는 모든 데이터)를 포함.
- [Properties 참고](https://docs.spring.io/spring-batch/4.0.x/reference/html/domain.html#stepexecution)

### ExecutionContext

- 키와 값을 이루는 콜랙션(`ConcurrentHashMap`)
- `StepExecution`나 `JobExecution`에서 개발자가 필요한 영속 상태 저장
- 재시작에 용이
- `StepExecution`나 `JobExecution`의 `ExecutionContext`는 서로 다른 객체이다.

### JobRepository

- `JobLauncher`, `Job`, `Step` 구현체에 CRUD 오퍼레이션을 제공
- `Job`이 처음 실행될 때, 포함
- `@EnableBatchProcessing`

### JobLauncher

- `Job`을 실행하기 위한 간단한 인터페이스

### Item Reader

- `Step`에 입력 검색(?)을 표현하는 추상적인 개념

### Item Writer

- `Step`의 출력을 표현하는 추상적 개념

### Item Processor

- 하나의 아이템에 대한 비즈니스적인 가공을 표현하는 추상적인 개념
- transform, apply
