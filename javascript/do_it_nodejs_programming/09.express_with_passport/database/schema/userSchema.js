const User = require('../user');

// UserSchema 정의
class UserSchema {

	create(mongoose) {
		console.log('defined user\'s schema');

		let userSchema = mongoose.Schema({
			id: { type: String, required: true, unique: true, 'default': '' },
			hashed_password: { type: String, required: true, 'default': '' },
			salt: {type: String, required: true },
			name: { type: String, index: 'hashed', 'default': '' },
			age: { type: Number, 'default': -1 },
			create_at: { type: Date, index: { unique: false }, 'default': Date.now() },
			update_at: { type: Date, index: { unique: false }, 'default': Date.now() }
		});

		userSchema.loadClass(User);

		return userSchema;
	}
}

// 프로토 타입 할당
module.exports = new UserSchema();
