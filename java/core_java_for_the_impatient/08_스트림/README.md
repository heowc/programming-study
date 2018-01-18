## 반복문에서 스트림 연산으로 전환하기

- 메서드명으로 코드의 의도를 바로 알 수 있다.
- 스트림은 '어떻게'가 아니라 '무엇을'이라는 원척을 따른다.
- 컬랙션과의 차이점
    1. 요소를 저장하지 않는다.
    2. 원본을 변경하지 않는다.
    3. 지연 연산을 한다.
- 작업 흐름
    1. 스트림 생성
    2. 중간 연산 지정
    3. 종료 연산 적용 및 결과 도출
    
## 스트림 생성

- 배열 → 스트림: `Stream.of`
- 배열 일부 → 스트림: `Arrays.stream(array, from, to)`
- 빈 스트림: `Stream.empty`

## filter, map, flatMap 메소드

- `fliter`: 일치하는 요소로 새로운 스트림 변환
- `map`: 요소를 특정 방식으로 변환
- `flatMap`: 스트림을 합침

## 서브스트림 추출과 스트림 결합하기

- `limit`: 스트림을 뒤에서 제한
- `skip`: 스트림을 앞에서 제한
- `concat`: 두 스트림 연결

## 기타 스트림 변환

- `dictinct`: 중복 제거
- `sorted`: 스트림 정렬
- `peek`: 원본과 동일한 요소가 포한된 다른 스트림 반환(**디버깅에 유용**)

## 단순 리덕션

- 리덕션(Reduction): 종료 연산, 넌스트림값으로 reduce해주는 메소드
- `count`, `max`, `min`: 단순 리덕션의 대표적인 메소드
- 반환시, `Optional<T>`이 사용된다.

## 옵션 타입

- 객체의 래퍼 클래스

### 옵션 값을 사용하는 방법

- `orElse`: 기본값 설정
- `orElseGet`: 기본값 설정(없다면 실행)
- `orElseThrow`: 예외 던짐
<br/>
- `ifPresent`: 값이있을 때 처리

### 옵션 값을 사용하지 않는 방법

- `get`: 있으면 값, 없으면 **NoSuchElementException**

### 옵션 값 생성하기

- `Optional.of`, `Optional.ifNullable`, `Optional.empty`

## 결과 모으기

- `forEach`: 요소를 임의의 순서로 순회
- `forEachOrdered`: 스트림 순서로 처리
- `toArray`: 결과를 배열로 반환
- `collect`: 다른 객체로 반환
    - `collect(Collectors.toList())`: `List` 반환
    - `collect(Collectors.toSet())`: `Set` 반환
    - `collect(Collectors.joining(","))`: 구분자(**,**)가 들어간 `String` 반환
    - `collect(Collectors.summarizing(Int|Long|Double))`: 합계, 평균, 최댓값, 최솟값 반환
    
## Map으로 모으기

- `collect(Collectors.toMap(...))`: `Map` 반환

## Grouping과 Partitioning

- `Collectors.groupingBy`: 그룹화
- `Collectors.partitioningBy`: 스트림 두개로 나눔
- `groupingByConcurrent`: 동시성 Map 반환

## downstream

- `groupingBy`에 대해서 특정 방식의 처리
- `counting`: 그룹별 갯수
- `summing`: 그룹별 합
- `maxBy`, `minBy`: 그룹별 최대,최소
- `mapping`: 또 다른 Collector을 사용하여 다운스트림에 적용

## reduction 연산

- `reduce`: 스트림에서 값을 계산하는 메커니즘
- ex) `stream().reduce((x, y) -> x + y)` == `stream().reduce(Integer::sum)`

## 기본 타입 Stream

- `IntStream`, `LongStream`, `DoubleStream`
- `mapToXXX`: 기본 타입 Stream으로 변환
- `boxed`: 객체 Stream으로 변환

## 병렬 Stream

- `parallelStream`: 컬랙션을 병렬 Stream으로 변환
- `parallel`: 객체 Stream을 병렬 Stream으로 변환 
- 기본적으로 `순서 유지 Collection(배열이나 리스트)`, `range`, `generator`, `iterator`, `Stream.sorted`에 의해 얻은 Stream을 순서를 유지한다.
- 계산할 때 Stream을 세그먼트 n개로 나누어 각각을 동시에 처리한 뒤, 재조립한다.
- `unordered`는 순서를 신경쓰지 않기 때문에 병렬 처리에 효과적이다.