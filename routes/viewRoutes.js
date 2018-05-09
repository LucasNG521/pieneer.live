class ViewRouter {
  constructor() {}

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
      }
    })

    return router;
  }
}

module.exports = ViewRouter;