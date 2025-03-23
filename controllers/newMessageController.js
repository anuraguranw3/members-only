const db = require("../models/queries");

const newMessageController = (req, res) => {
    res.render("new-message", { user: req.user });
};

const newMessagePostController = async (req, res) => {
    try {
        const { "message-title": messageTitle, message: message } = req.body;
        const user_id = req.user.id;

        if (!user_id) {
            return res.status(401).send("Unauthorized: User not logged in.");
        }

        if (!messageTitle || !message) {
            return res.status(400).send("Message title and content are required.");
        }

        await db.addMessage(messageTitle, message, user_id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while adding the message.");
    }
};

module.exports = {
    newMessageController,
    newMessagePostController
};