
## 사전 준비

- [Chrome DevTool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

- npm 설치 & 업데이트

```bash
$ npm install -g npm
```

- 글로벌 패키지 설치

```bash
$ npm install -g babel-cli webpack webpack-dev-server
```

## 프로젝트 생성

디렉토리 생성 후,

```bash
$ npm init
```

```bash
$ npm install --save react react-dom
```

```bash
$ npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-env webpack webpack-dev-server
```

## webpack.config.js 설정

## script 작성

```json
{
	//...
	"scripts": {
		//...
		"start": "webpack-dev-server --hot --host 0.0.0.0"
		// ...
	}
	//...
}
```

## webpack-dev-server 실행

```bash
$ npm start
```