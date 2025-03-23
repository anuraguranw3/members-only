const passport = require("passport");
const LocalStrategy = require("passport-local");
const pool = require("../models/pool");
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect Email" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

const logInController = (req, res) => {
    const errorMessages = req.flash('error');
    res.render("log-in-page", { errorMessages });
};

const logInPostController = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureFlash: true,
    })(req, res, next);
};

module.exports = {
    logInController,
    logInPostController
};