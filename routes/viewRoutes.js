const passport = require('passport');

class ViewRouter {
  constructor() { }

  router() {
    const router = require("express").Router();

    router.get("/", (req, res) => {
      if (req.param("force") == "mobile" || req.device.type != "desktop") {
        res.redirect("html_mock-up/mobile/");
      } else {
        res.redirect("html_mock-up/desktop/");
      }
    });

    router.get('/test', (req, res) => {
      if (req.param("force") == "mobile" || req.device.type != "desktop") {
        res.redirect('html_mock-up/testGroundMobile/');
      } else {
        res.redirect('html_mock-up/testGround/');
      };
    });

    //passport-facebook
    router.get('/auth/facebook',
      passport.authenticate('facebook'));

    router.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect('/');
      });

    //passport-google
    router.get('/auth/google',
      passport.authenticate('google', {
        scope: ['profile']
      }));

    router.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect('/html_mock-up/desktop');
      });

    // passport-linkedin
    router.get('/auth/linkedin',
      passport.authenticate('linkedin', {
        scope: ['r_basicprofile', 'r_emailaddress']
      }));

    router.get('/auth/linkedin/callback',
      passport.authenticate('linkedin', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect('/');
      });

    return router;
  }
}

module.exports = ViewRouter;