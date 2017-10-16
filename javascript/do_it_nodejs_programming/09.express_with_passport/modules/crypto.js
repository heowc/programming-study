const crypto = require('crypto');

class Crypto {

	static createSalt() {
		return Math.round(new Date().valueOf() * Math.random()) + '';
	}

	// 암호화 적용
	static encrypt(value, inSalt) {
		return crypto.createHmac('sha1', inSalt).update(value).digest('hex');
	}
}

module.exports = Crypto;