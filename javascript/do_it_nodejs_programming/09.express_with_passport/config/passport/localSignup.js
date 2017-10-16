const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
	// 매핑될 필드명
	usernameField: 'id',
	passwordField: 'password',
	passReqToCallback: true
}, (req, username, password, done) => {
	// 해당 아이디 중복 검사
	let Model = req.app.get('schemas').UserModel;
	Model.findOne({ id: username}, (err, result) => {
		if (err) {
			done(err);
			return;
		}
		if (result !== null) {
			done(null, false, 'already existed user');
			return;
		}

		// 저장
		let user = new Model(req.body);
		user.save((err, result) => {
			if (err) {
				done(err);
				return;
			}

			done(null, result);
		});
	});
});