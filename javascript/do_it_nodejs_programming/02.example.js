// 간단 실행
console.log("02. 노드 간단하게 살펴보기");

// 모듈 사용
const moduleFunc = require('./02.module');
moduleFunc.mod();

// 외장 모듈 사용
const nconf = require('nconf'); // 시스템 환경 변수에 접근 할 수 있는 외장 모듈
console.log(nconf.env());

// 내장 모듈 사용
const os = require('os');
console.log(os.hostname());
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.cpus());
console.log(os.networkInterfaces());
