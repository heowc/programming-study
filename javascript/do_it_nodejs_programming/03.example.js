// callback function
function add(n, m, callback) {
    let result = n + m;
    callback(result);
}

add(10, 10, (result) => {
    console.log('call callback for add');
    console.log(result);
});

// prototype
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.run = (speed) => {
    console.log(speed + 'km/h 속도로 달립니다.');
}

const wonchul = new Person('원철', 26);
const naeun = new Person('나은', 24);

console.log(wonchul.name + '이가');   // 원철이가
wonchul.run(10);                     // 10km/h 속도로 달립니다.

console.log(naeun.name + '이가');     // 나은이가
naeun.run(5);                        // 5km/h 속도로 달립니다.
