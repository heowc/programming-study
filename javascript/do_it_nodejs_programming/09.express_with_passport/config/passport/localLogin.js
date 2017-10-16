const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
	// 매핑될 필드명
	usernameField: 'id',
	passwordField: 'password',
	passReqToCallback: true
}, (req, username, password, done) => {
	// 몽구스를 활용한 인증 처리
	let Model = req.app.get('schemas').UserModel;
	Model.findOne({ id: username}, (err, result) => {
		if (err) {
			done(err);
			return;
		}

		if (result === null) {
			done(null, false, 'empty id');
			return;
		}

		if (result.isAuthenticated(password)) {
			done(null, result);
		} else {
			done(null, false, 'not match password');
		}
	});
});