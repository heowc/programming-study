# 설치방법

- IE8 이하 버전 **지원하지 않는다**.
- 브라우저 디버그 툴: [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)

-------------------------

- `<script>` 추가: https://unpkg.com/vue (최신 버전 반영)
- npm

```
$ npm install vue
```
- cli

```text
$ npm install --global vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

- 개발&배포는 `webpack - DefinePlugin`를 활용한다.