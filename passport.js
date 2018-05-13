const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const bcrypt = require('./bcrypt');
const knex = require('knex');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use('local-signup', new LocalStrategy(
    async (email, password, done) => {
      try {
        let users = await knex('login').where({ name: name });
        if (users.length > 0) {
          return done(null, false, { message: 'Email already taken' });
        }
        let hash = await bcrypt.hashPassword(password)
        const newUser = {
          name: name,
          password: hash
        };
        let userId = await knex('login').insert(newUser).returning('id');
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  ));


  passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
      try {
        let users = await knex('login').where({ name: name })
        if (users.length == 0) {
          return done(null, false, { message: 'Incorrect credentials' });
        }
        let user = users[0];
        let result = await bcrypt.checkPassword(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect credentials' });
        }
      } catch (err) {
        done(err);
      }
    }
  ));

  passport.use('facebook', new FacebookStrategy({
    clientID: '2117364898475037',
    clientSecret: '46f25ce454c6f67a62929f1fa4b6bce9',
    callbackURL: "https://pieneer.live/auth/facebook/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ facebookId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  ));

  passport.use('google', new GoogleStrategy({
    clientID: '976623563011-b70ot73gqn26b87jc02jacdg726tce7s.apps.googleusercontent.com',
    clientSecret: 'sJRiDC5hZ6LIwJYr16b-21g1',
    callbackURL: "https://pieneer.live/auth/google/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  ));

  passport.use('linkedin', new LinkedInStrategy({
    clientID: '81ek2wlffsjab8',
    clientSecret: 'cIlS1KwTOGQAVE9g',
    callbackURL: "https://pieneer.live/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
  },
    (token, tokenSecret, profile, done) => {
      User.findOrCreate({ linkedinId: profile.id }, (err, user) => {
        return done(err, user);
      });
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
    ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let users = await knex('login').where({id:id});
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
});

};
