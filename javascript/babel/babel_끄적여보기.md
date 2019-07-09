# babel 끄적여보기

공식문서: https://babeljs.io

## 요약

babel은 트랜스 컴파일러이다.
ECMA 2015이상의 코드를 오래된 브라우저 환경에서 호환 가능하도록록 변환 시켜줌

## 사용법

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill

# ...

./node_modules/.bin/babel ~~~
```

> tip) npm 5.2.0+에서는 ./node_modules/.bin/babel 대신 npx babel로 사용 가능하다.
> npx babel ~~~

## preset와 plugin

preset은 브라우저 환경, flow, typescript에서 호환 가능한 javascript로 변경시켜주는 기능
plugin은 특정 함수를 사용할 수 있게끔 javascript로 변경시켜주는 기능

> preset는 필수!, plugin 선택?

예를 들어, arrow function은 @babel/plugin-transform-arrow-functions 플러그인이 존재해야함
(babel 공식 문서 내용)

```javascript
const fn = () => 1;
// converted to
var fn = function fn() {
  return 1;
};
```

```bash
# plugin install
npm install --save-dev @babel/plugin-transform-arrow-functions
```

```json
{
    "presets": [],
    // plugin setting (`.babelrc`)
    "plugins": [
        "@babel/plugin-transform-arrow-functions"
    ]
}
```

## 설정

babel 설정

방법은 여러가지이나 `babel.config.js`로 설정하는 방법은 추천한다..? 내용은 문서 참고..

- babel.config.js
- .babelrc
- package.json
- .babelrc.js
