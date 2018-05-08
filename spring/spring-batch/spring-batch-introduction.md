## 소개

Spring Batch는 엔터프라이즈 시스템의 일상적인 운영에 필수적인 강력한 배치 애플리케이션 개발을 지원하도록 설계된 가볍고 포괄적인 배치 프레임워크이다.

- 배치는 스케줄링 프레임워크가 아니다.
- logging/tracing, transaction management, job processing statistics, job restart, skip, resource management를 제공한다.
- SpringSource(지금의 Pivotal)과 Accenture의 협력으로 만들어졌다.

### 배치를 사용하는 전형적인 예

- 파일, 데이터베이스, 큐 등에서 많은 양의 정보를 읽을 때
- 여러 방식으로 데이터를 처리할 때
- 수정된 형식으로 데이터를 다시 쓸 때 

### 아키텍처

Spring Batch는 확장성과 다양한 사용자를 고려하여 설계되었다.

![Alt Spring Batch Architecture image](https://docs.spring.io/spring-batch/4.0.x/reference/html/images/spring-batch-layers.png)

- **Application**: 모든 Batch Job, 개발자가 작성한 코드
- **Batch Core**: Batch Job을 제어하고 실행하기 위한 core (`JobLauncher`, `Job`, `Step`)
- **Batch Infrastructure**: Application과 Batch Core의 공통 Infrastructure (`RetryTemplate` / `ItemReader`, `ItemWriter`) 

### Batch 원칙과 가이드라인

https://docs.spring.io/spring-batch/4.0.x/reference/html/spring-batch-intro.html#batchArchitectureConsiderations

### Batch 전략

- Conversion Applications
- Validation Applications
- Extract Applications
- Extract/Update Applications
- Processing and Updating Applications
- Output/Format Applications

#### Step 유틸

Sort, Split, Merge

#### Batch 옵션

- Normal processing during a batch window in off-line mode
- Concurrent batch or on-line processing.
- Parallel processing of many different batch runs or jobs at the same time.
- Partitioning
- A combination of the preceding options.