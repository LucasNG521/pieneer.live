const FacebookStrategy = require('passport-facebook').Strategy;
//require('dotenv').config();

module.exports = (passport, client) => {
    passport.use(new FacebookStrategy({
        clientID: 1647259985329891, //process.env.FACEBOOK_ID,
        clientSecret: '67fefe2356c8aad6cc2b76528e9946a2', //process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `https://dev.krux.co/auth/facebook/callback`
    }, (accessToken, refreshToken, profile, cb) => {
        profile.id = 'facebook_'+profile.id;
        profile.username = profile.id;
        client.sadd('users', profile.id+':'+profile.displayName);
        console.log(profile);
        return cb(null, profile);
    }
    ));
}