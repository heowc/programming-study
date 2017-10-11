const userModule = require('./07.module_05');

const findUser = () => {
    return `${userModule.getUser().name}, ${userModule.group.name}`;
};

console.log(`사용자 정보 : ${findUser()}`);
// 사용자 정보 : 허원철, 친구
