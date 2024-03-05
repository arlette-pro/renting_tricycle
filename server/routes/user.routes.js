const UserController = require("../controllers/user.controller")
// const { authenticate } = require("../config/jwt.config")

const prefix = process.env.PREFIX
module.exports = app => {
    app.post(`${prefix}/login`, UserController.login);
    app.post(`${prefix}/logout`, UserController.logoutUser);

    app.post(`${prefix}/user/register`, UserController.registerNewUser);
    app.post(`${prefix}/user`,  UserController.createUser)
    app.get(`${prefix}/user`,  UserController.fetchAllUsers)
    app.put(`${prefix}/user/:id`,  UserController.updateUser)
    app.delete(`${prefix}/user/:id`,  UserController.archiveUser)
}