# Members Only

[Live Demo](https://members-only-gyqr.onrender.com)

### Overview

**Members Only** is a simple web application that allows users to sign up, log in, create messages, and interact with other users' messages. The key feature of this app is that only logged-in users can see who created a message. Additionally, users can be promoted to **admin** status, giving them the ability to delete messages.

This project demonstrates how to use **Node.js**, **Express**, **PostgreSQL**, **Passport.js** (local strategy), **EJS**, and **bcrypt.js** to build a secure web application with basic user authentication.

### Features

- **Sign Up**: Users can create an account to sign up.
- **Login**: Only logged-in users can see who created the messages.
- **Messages**: On the home page, users can see a list of messages. However, they can't see who created them unless logged in.
- **Admin Role**: Users can be promoted to **admin** status and given the ability to delete any message.
- **Create Messages**: Users can create their own messages once logged in.
- **Delete Messages**: Admin users can delete any messages.

### Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for building the backend of the application.
- **PostgreSQL**: Relational database to store users and messages.
- **pg (node-postgres)**: PostgreSQL client for Node.js to interact with the database.
- **Passport.js**: Authentication middleware for Node.js, used here for local strategy (sign up and login).
- **EJS**: Embedded JavaScript templating engine for rendering dynamic HTML.
- **bcrypt.js**: Library for hashing passwords and securely storing user credentials.
