const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
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

  passport.use('google', new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8181/dashborad/auth/google/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  ));

  passport.use('linkedin', new LinkedInStrategy({
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
