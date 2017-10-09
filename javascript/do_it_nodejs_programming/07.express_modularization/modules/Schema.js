const crypto = require('crypto');

// Schema Module 정의
class SchemaModule {

	constructor(mongoose) {
		this.mongoose = mongoose;
	}


	create() {
		this.user = this.mongoose.Schema({
			id: { type: String, required: true, unique: true, 'default': '' },
			hashed_password: { type: String, required: true, 'default': '' },
			salt: {type: String, required: true },
			name: { type: String, index: 'hashed', 'default': '' },
			age: { type: Number, 'default': -1 },
			create_at: { type: Date, index: { unique: false }, 'default': Date.now() },
			update_at: { type: Date, index: { unique: false }, 'default': Date.now() }
		});
		console.log('defined user\'s schema');
	}
}

// 프로토 타입 할당
module.exports = SchemaModule;
