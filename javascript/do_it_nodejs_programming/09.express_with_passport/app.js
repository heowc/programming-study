const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

const app = express();
const router = express.Router();

app.set('port', process.env.PORT || 3000);

// app.use(session({ secret: 'session-heowc' }));
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    // find ...
    console.log(username);
    console.log(password);

    // done(err);                   // 에러
    // done(null, false, Object);   // 실패
    // done(null, Object);          // 성공
    done(null, {
        username: 'heowc'
    });
}));

// passport.serializeUser(function(user, done) {
// 	done(null, user.username);
// });

// passport.deserializeUser(function(id, done) {
// 	done(null, { username: 'heowc' });
// });

app.post('/login', passport.authenticate('local',
	{
		successRedirect: '/',
		failureRedirect: '/login',
		session: false
	}
));

router.route('/').get((req, res) => {
    res.json({ message: 'started express with passport' });
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('started express server : ' + app.get('port'));
});
