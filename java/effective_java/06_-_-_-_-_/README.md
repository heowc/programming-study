# 쓸모 없는 객체 참조를 제거하자

자바를 사용하면 가비지 컬렉터로 덕분에 메모리 관리를 고려하지 않아도 된다는 생각을 가질 수 있다.  = 메모리 누수(memory leak)

## null 처리

- 쓸모 없는 참조가 메모리에 쌓이게 된다.
- OutOfMemoryError가 발생할 수 있다.

## 메모리 누수의 흔히 생기는 또 다른 근원은 캐시이다.

- `WeakHashMap`을 캐시로 사용하자 (thread safe 한가?  - [참고](http://knight76.tistory.com/entry/WeakHashMap%EC%9D%84-threadsafe%ED%95%98%EA%B2%8C-%ED%95%98%EA%B8%B0-WeakHashMap%EC%9D%98-%EB%AC%B4%ED%95%9C%EB%A3%A8%ED%94%84infinite-loop-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0))

## 리스너와 콜백

- 코드상의 오류로 콜백이 계속 누적될 수 있다.
- 콜백이 신속하게 가비지 콜랙션될 수 있도록 약한 참조만을 저장 유지하는 것이다.
