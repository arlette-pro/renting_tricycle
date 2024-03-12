const UserController = require("../controllers/user.controller")
// @todo using authenticate, ensure that only admin users can call /user in post to create a new user
const { authenticate } = require("../config/jwt.config")

const prefix = process.env.PREFIX
module.exports = app => {
    app.post(`${prefix}/login`, UserController.login);
    app.post(`${prefix}/logout`, UserController.logoutUser);

    app.post(`${prefix}/user/register`, UserController.registerNewUser);
    // @todo: protect this route so that only admin users can access it.
    app.post(`${prefix}/user`, authenticate,  UserController.createUser)
    app.get(`${prefix}/user`, authenticate,  UserController.fetchAllUsers)
    app.put(`${prefix}/user/:id`, authenticate,  UserController.updateUser)
    app.delete(`${prefix}/user/:id`, authenticate,  UserController.archiveUser)
}