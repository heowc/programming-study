# Vue 인스턴스

### Vue 인스턴스 만들기

- `MVVM 패턴`에 영감을 받아, 변수를 **vm**(ViewModel의 약자)를 사용한다.

### 속성과 메소드

- Vue 인스턴스의 `data` 객체에 있는 모든 속성은 **프록시** 처리 한다.
- `data`의 속성이 인스턴스 생성 시에 있었다면 **반응형**이다. (이후 생성된 속성은 다시 렌더링하지 않는다.)
- `$` 접두어를 사용하여 사용자 정의 속성과 구별 가능하다.

```javascript
const data = { a: 1 }
const vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
```

### 인스턴스 라이프사이클 훅

- 각 Vue 인스턴스는 일련의 초기화 단계를 거친다.
- 사용자 로직을 실행할 수 있는 **라이프사이클 훅**도 호출 가능하다. (안드로이드의 액티비티의 라이프사이클과 동일한 개념인 듯?)
- `beforeCreated`, `beforeMounted`, `beforeUpdated`, `beforeDestroyed`
- `created`, `mounted`, `updated`, `destroyed`
- **Arrow Function**을 권장하지 않는다. (`this`의 변수 범위가 다르기 때문)

### 라이프사이클 다이어그램