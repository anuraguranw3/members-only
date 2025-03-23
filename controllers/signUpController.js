const { body, validationResult } = require("express-validator");
const db = require("../models/queries");
const bcrypt = require("bcryptjs");

const signUpController = (req, res) => {
    res.render("sign-up-page");
};

const signUpPostController = [
    body("first-name")
        .trim()
        .notEmpty().withMessage("First name is required")
        .isAlpha().withMessage("First name must contain only letters"),
    body("last-name")
        .trim()
        .notEmpty().withMessage("Last name is required")
        .isAlpha().withMessage("Last name must contain only letters"),
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address")
        .normalizeEmail(),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    body("confirm-password")
        .notEmpty().withMessage("Confirm password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up-page", {
                errors: errors.array(),
                data: req.body,
            });
        }

        const { "first-name": firstName, "last-name": lastName, email, password } = req.body;
        try {
            const existingUser = await db.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).render("sign-up-page", {
                    errors: [{ msg: "Email is already in use" }],
                    data: req.body,
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.userSignUp(firstName, lastName, email, hashedPassword);
            res.redirect("/log-in");

        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }
];

module.exports = {
    signUpController,
    signUpPostController
};

