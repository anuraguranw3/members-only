const {Router} = require("express");
const { deleteMessageController } = require("../controllers/deleteMessageController");

const deleteMessageRouter = Router();

deleteMessageRouter.post("/:id", deleteMessageController);

module.exports = deleteMessageRouter;