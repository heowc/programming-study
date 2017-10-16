const Crypto = require('../modules/crypto');

class User {

	constructor(id, password, name, age) {
		this.id = id;
		this.password = password;
		this.name = name;
		this.age = age;
	}

	set password(password) {
		this.salt = Crypto.createSalt();
		this.hashed_password = Crypto.encrypt(password, this.salt);
	}

	get password() {
		return this.hashed_password;
	}

	isAuthenticated(password) {
		return Crypto.encrypt(password, this.salt) === this.password;
	}
}

module.exports = User;