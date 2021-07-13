module.exports = app => {
  const auth = require("../controllers/AuthController.js");
  const google = require("../controllers/GoogleController.js");
  const { authJwt } = require("../middleware");

  app.post("/auth/sign-up", auth.signup);
  app.post("/auth/sign-in", auth.signin);
  app.get("/auth/info", [authJwt.verifyToken], auth.info);
  app.get("/auth/google/sign-in", google.signin);
  app.get("/auth/google/callback", google.callback);
};
