const {Router} = require("express");
const { adminFormController, adminFormPostController } = require("../controllers/adminFormController");

const adminFormRouter = Router();

adminFormRouter.get("/", adminFormController);
adminFormRouter.post("/", adminFormPostController);

module.exports = adminFormRouter;