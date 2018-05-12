var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport, client) => {
    passport.use(new GoogleStrategy({
        clientID: '1004148464927-432nerfidd508ius3kdiapv6rdggjuqs.apps.googleusercontent.com',
        clientSecret: 'TP85C8IDgqC7ar67dHPpMs4M',
        callbackURL: "https://dev.krux.co/auth/google/callback",
        scope: "https://www.googleapis.com/auth/plus.login"
    },
        function (accessToken, refreshToken, profile, cb) {
            profile.id = 'google_'+profile.id;
            profile.username = profile.id;
            client.sadd('users', profile.id+':'+profile.displayName);
            console.log(profile);
            return cb(null, profile);
        }
    ));
}