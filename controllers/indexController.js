const db = require("../models/queries");

const indexController = async (req, res) => {
    try {
        const messages = await db.getMessages();
        if (!messages) {
            return res.status(404).render("index", { user: req.user, messages: [] });
        }
        res.render("index", { user: req.user, messages });
    } catch (err) {
        console.error("Error fetching messages: ", err);
    }
};



module.exports = {
    indexController,
};