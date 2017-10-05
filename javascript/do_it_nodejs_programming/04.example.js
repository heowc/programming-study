// url
const url = require('url');
const querystring = require('querystring');

const curUrl = url.parse('http://heowc.tistory.com/?page=2')
console.log(curUrl);

const param = querystring.parse(curUrl.query);
console.log(param.page);

const curStr = url.format(curUrl);
console.log(curStr);

// EventEmitter
process.on('tick', (count) => {
    console.log('tick event %s', count);
});

const tickEvent = setTimeout(() => {
    console.log('2000ms 후에 tick 이벤트 전달 시도.');
    process.emit('tick', '1');
}, 2000);

// inherits
const Calc = require('./04.calc');

const calc = new Calc();
calc.emit('stop');

console.log('%s에 stop 이벤트 전달함.', Calc.title);

// file
const fs = require('fs');
// 동기
const data = fs.readFileSync('./README.md', 'utf-8');
// console.log(data);
// 비동기
fs.readFile('./README.md', 'utf-8', (err, data) => {
    // console.log(data);
});
