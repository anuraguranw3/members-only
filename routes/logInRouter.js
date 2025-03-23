const { Router } = require("express");
const { logInController, logInPostController } = require("../controllers/logInController");
const logInRouter = Router();

logInRouter.get("/", logInController);

logInRouter.post("/", logInPostController);

module.exports = logInRouter;