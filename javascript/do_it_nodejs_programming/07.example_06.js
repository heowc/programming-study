var require = (path) => {
    var exports = {
        getUser : () => {
            return { id: 'heowc', name: '허원철' };
        },
        group : { id: 'g01', name: '친구' }
    };

    return exports;
}

const userVirtualModule = require('...');

const findUser = () => {
    return `${userVirtualModule.getUser().name}, ${userVirtualModule.group.name}`;
};

console.log(`사용자 정보 : ${findUser()}`);
// 사용자 정보 : 허원철, 친구
