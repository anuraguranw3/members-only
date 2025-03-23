const { Router } = require("express");
const { newMessageController, newMessagePostController } = require("../controllers/newMessageController");

const newMessageRouter = Router();

newMessageRouter.get("/", newMessageController);
newMessageRouter.post("/", newMessagePostController)

module.exports = newMessageRouter;