
module.exports = (router, passport) => {

	// 로그인 인증 처리
	router.route('/login').post(passport.authenticate('local-login',
		{
			successRedirect: '/profile',
			failureRedirect: '/'
		}
	));

	// 회원가입 처리
	router.route('/signup').post(passport.authenticate('local-signup',
		{
			successRedirect: '/profile',
			failureRedirect: '/',
			session: false
		}
	));

	router.route('/').get((req, res) => {
		res.json({ message: 'not authenticated user' });
	});

	router.route('/profile').get((req, res) => {
		// if(!req.user) {
		if(req.isUnauthenticated()) {
			res.json({ message: 'access defined' });
			return;
		}

		res.json(req.user);
	});
};