const UserController = require("../controllers/user.controller")
// const { authenticate } = require("../config/jwt.config")

module.exports = app => {
    app.post('/api/user',  UserController.createUser)
    app.get('/api/user',  UserController.fetchAllUsers)
    app.put('/api/user/:id',  UserController.updateUser)
    app.delete('/api/user/:id',  UserController.archiveUser)
}