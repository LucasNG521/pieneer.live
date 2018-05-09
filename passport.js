const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
require('dotenv').config();

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());


  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8181/auth/facebook/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ facebookId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8181/auth/google/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  ));

  passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:8181/auth/linkedin/callback"
  },
    (token, tokenSecret, profile, done) => {
      User.findOrCreate({ linkedinId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  ));


  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    let user = users.find((user) => user.email == email);
    if (user == null) {
      done(new Error('Wrong user id.'));
    }

    done(null, user);
  });

};
