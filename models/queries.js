const pool = require("./pool");

const userSignUp = (firstName, lastName, email, password) => {
    pool.query("INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", [
        firstName,
        lastName,
        email,
        password
    ]);
};

const findUserByEmail = async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!rows || rows.length === 0) {
        return null;
    }

    return rows[0];
};

const getMessages = async () => {
    const { rows } = await pool.query("SELECT messages.id, messages.message_title, messages.message, users.first_name, users.last_name FROM messages JOIN users ON messages.user_id = users.id");
    if (!rows || rows.length === 0) {
        return null;
    }

    return rows;
};

const addMessage = async (messageTitle, message, user_id) => {
    await pool.query("INSERT INTO messages (message_title, message, user_id) VALUES ($1, $2, $3)", [
        messageTitle,
        message,
        user_id
    ]);
};

const roleChange = async (user_id) => {
    await pool.query("UPDATE users SET role = 'admin' WHERE id = $1", [user_id]);
}

const deleteMessage = async (message_id) => {
    await pool.query("DELETE FROM messages WHERE id = $1", [message_id]);
}

module.exports = {
    userSignUp,
    findUserByEmail,
    getMessages,
    addMessage,
    roleChange,
    deleteMessage
};