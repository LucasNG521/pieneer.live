const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../users');

module.exports = (passport, client)=>{
    passport.use('local-login', new LocalStrategy(
        (username, password, done) => {
            let user = users.find((user)=> user.username == 'local_'+username);
            if (user == null) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }

            if (user.password === password) {
                return done(null, user);
            }

            return done(null, false, { message: 'Incorrect credentials.' });
        }
    ));
}