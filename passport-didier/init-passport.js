const passport = require('passport')

module.exports = (app, client) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    require('./strategies/local-strategy')(passport, client);
    require('./strategies/facebook-strategy')(passport, client);
    require('./strategies/google-strategy')(passport, client);
}