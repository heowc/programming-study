## ItemReader

- 여러 타입으로부터 데이터를 제공해주는 것(ex. File, DB, XML 등)
- [여러가지 구현체](https://docs.spring.io/spring-batch/4.0.x/reference/html/appendix.html#itemReadersAppendix)
- `read()`만 정의

## IteamWriter

- `ItemReader`와 비슷하지만, 반대 오퍼레이션
- `write()`만 정의
- 퍼포먼스 측면에서 chunk 단위로 flush하는 것이 좋다.

## ItemProcessor

- 비즈니스 로직 추가 방법
    1. Composite 패턴 활용
    2. `ItemProcessor

### ItemProceesor 체이닝

- `ItemProceesor`를 체이닝하고 싶다면, Composite 패턴 활용
- [예시](https://docs.spring.io/spring-batch/4.0.x/reference/html/readersAndWriters.html#chainingItemProcessors)
- 레코드 필터링처리 가능
- 청크 중에 롤백되면, 캐시되어 있는 item으로 다시 처리(retry, skip)한다.

## ItemSteam

- `ItemReader`, `ItemWriter` 합친 것? 

## The Delegate Pattern and Registering with the Step

- `CompositeItemWriter`

## Flat File

- 대량 데이터를 주고 받기위한 일반적인 매커니즘 파일을 다룸.
- 구분자나 고정된 길이의 필드를 가짐

### FieldSet

- JDBC의 `ResultSet`과 비슷한 컨셉
- String 배열을 인자로 받음
- 일관된 처리 가능(여러 곳에서 쓰는 듯?)

### FlatFileItemReader

- 2차원(테이블) 데이터 읽기
- `Resource`, `LineMapper`
- 인코딩 기본: **ISO-8859-1**
- `LineMapper`: 한 라인을 Object로 바꾸는 과정(`DefaultLineMapper` 구현체)
- `LineTokenizer`: `FieldSet`을 반환
    - `DelimitedLineTokenizer`
    - `FixedLengthTokenizer`
    - `PatternMatchingCompositeLineTokenizer`
- `FieldSetMapper`: `JdbcTemplate`의 `RowMapper`와 동일, `LineTokenizer` 같이 씀
- [예시](https://docs.spring.io/spring-batch/4.0.x/reference/html/readersAndWriters.html#simpleDelimitedFileReadingExample)
- `BeanWrapperFieldSetMapper`: 필드 자동매핑
- Exception 핸들링
    - `IncorrectTokenCountException`
    - `IncorrectLineLengthException`

### FlatFileItemWriter

- 2차원(테이블) 데이터 쓰기
- `LineAggregator`: `LineTokenizer`의 반대 행위? (T -> string)
- [예시](https://docs.spring.io/spring-batch/4.0.x/reference/html/readersAndWriters.html#SimplifiedFileWritingExample)
- `FieldExtractor`: domain 객체를 적절할 표현으로 한 라인에 쓰기위한 방법
    - `PassThroughFieldExtractor`
    - `BeanWrapperFieldExtractor`
- 파일 생성시에 실패로 인한 재시작시나 동일 파일을 쓸 경우 에러가 발생한다. 기존 파일을 지우고 다시 생성하고자 한다면, `shouldDeleteIfExists` 를 사용

### XML 읽고 쓰기

- StAX API 사용
- `StaxEventItemReader`
- `StaxEventItemWriter`

### 여러 파일 입력

- `MultiResourceItemReader`
- 대량의 파일을 쪼갠 파일로 batch 작업할 때 유용

### 데이터베이스

- 커서 기반 `ItemReader` 구현체
    - `JdbcCursorItemReader`
    - `HibernateCursorItemReader`
    - `StoredProcedureItemReader`
- 페이징 `ItemReader` 구현체
    - `JdbcPagingItemReader`
    - `JpaPagingItemReader`

### 존재하는 서비스 재사용하기

- `ItemWriterAdapter`으로 호출(앞에서 잠깐 다뤗던 것 같은데?)

### 입력 검증하기

- `ValidatingItemProcessor`
- Spring Batch에서 `Validator` 인터페이스 제공

------

각각의 구현체에 대한 내용이므로 skip (그 때 그 때 찾아보는게 더 효율적일 듯...)
