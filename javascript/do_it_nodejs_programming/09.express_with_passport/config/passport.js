const localLogin = require('./passport/localLogin');
const localSignup = require('./passport/localSignup');

module.exports = (app, passport) => {
	// 세션 저장
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	// 세션 복원
	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	passport.use('local-login', localLogin);
	passport.use('local-signup', localSignup);
};