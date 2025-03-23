const db = require("../models/queries");

const adminFormController = (req, res) => {
    res.render("admin-form-page");
};

const adminFormPostController = async (req, res) => {
    const { ans } = req.body;
    if (ans != "yes") {
        res.render("admin-form-page", { message: "Your are not WORTHY." });
    }
    else {
        try {
            const user_id = req.user.id;
            await db.roleChange(user_id);
            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.status(500).send("An error occurred while submitting answer.");
        }
    }
};

module.exports = {
    adminFormController,
    adminFormPostController
};