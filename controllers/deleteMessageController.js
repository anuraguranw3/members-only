const db = require("../models/queries");

const deleteMessageController = async (req, res) => {
    try {
        const message_id = req.params.id;

        if (req.user.role !== "admin") {
            return res.status(403).send("You are not authorized to delete messages.");
        }

        await db.deleteMessage(message_id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    deleteMessageController,
};