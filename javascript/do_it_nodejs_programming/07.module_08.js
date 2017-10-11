
class User {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getUser() {
        return {
            id: this.id,
            name: this.name
        };
    }

    static group() {
        return {
            id: 'g01',
            name: '친구'
        };
    }

    printUser() {
        console.log(`user 이름 : ${this.name}, group 이름 : ${User.group().id}`);
    }
}

module.exports = new User('heowc', '허원철');
// exports.user = new User('heowc', '허원철');
