const userModule = require('./07.module_02');

const findUser = () => {
    return `${userModule.getUser().name}, ${userModule.group.name}`;
};

console.log(`사용자 정보 : ${findUser()}`);
