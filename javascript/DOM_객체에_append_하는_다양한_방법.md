# DOM 객체에 append 하는 다양한 방법

### 1. 가장 쉽게 생각할 수 있는 방법

```javascript
for (let item of list) {
	$('#tbl').append(createElement(item));
}
```

### 1. [개선] 보다 개선된 방법

```javascript
const welTbl = $('#tbl'); // 전역

for (let item of list) {
	welTbl.append(createElement(item));
}
```

## 하지만,

__리플 로우__ 가 자주 발생하므로 보다 개선된 방법을 찾아야한다.

※ 리플 로우(Reflow): 문서의 일부 또는 전부를 다시 렌더링 할 목적으로 문서의 요소 위치와 형상을 다시 계산하기위한 웹 브라우저 프로세스의 이름 (≒ Repaint)

### 2. 마지막에 한번에 넣는 방법

```javascript
const welTbl = $('#tbl'); // 전역

let welBody = $('<table-body/>').addClass('tbl-body');
for (let item of list) {
	welBody.append(createElement(item));
}
welTbl.append(welBody);
```

### 2-1. 문자열을 이용하여 한번에 넣는 방법

```javascript
const welTbl = $('#tbl'); // 전역

let element = '';
for (let item of list) {
	element += createElement(item);
}
welTbl.append(element);
```

### 2-1. [개선1] 배열을 활용한 개선 방법

```javascript
const welTbl = $('#tbl'); // 전역

let array = [];
for (let item of list) {
	array.push(createElement(item));
}
welTbl.append(array.join(''));
```

### 2-1. [개선2] StringBuilder 객체를 활용한 개선 방법

```javascript
class StringBuilder {

	constructor() {
		this.array = [];
	}

	append(value) {
		if (value) {
			this.array.push(value);
		}
	}

	clear() {
		this.array.length = 1;
	}

	toString() {
		return this.array.join('');
	}
}

// ...

const welTbl = $('#tbl'); // 전역

let sb = new StringBuilder();
for (let item of list) {
	sb.append(createElement(item));
}
welTbl.append(sb.toString());
```

## 하지만,

결국에는 JQuery 객체를 만들어내는 비용이 들기 때문에 __Vanilla js__ 로 활용하는 것이 가장 빠르다.