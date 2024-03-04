const UserModel = require("../models/user.model")

function isUserActive(user) {
    return user.deactivated === false
}

module.exports = {
    archiveUser: (req, res) => {
        UserModel.findOne({_id: req.params.id})
        .then( async (user) => {
            if (!user) {
                res.status(404).json({ message: "user not found" })
                return
            }
            user.deactivated = true
            await user.save()
            // @todo remove password before returning user info
            res.json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    updateUser: (req, res) => {
        UserModel.findOne({_id: req.params.id})
        .then(async (user) => {
            if (!user) {
                res.status(404).json({ message: "user not found" })
                return
            }
            const { name, email, role } = req.body
            if (email) {
                user.email = email
            }
            if (role) {
                user.role = role
            }
            if (name) {
                user.name = name
            }
            await user.save()
            // @todo remove password before returning user info
            res.json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    fetchAllUsers: (req, res) => {
        UserModel.find()
        .then(async (allUsers) => {
            // filter out deactivated users
            const filteredUsers = allUsers.filter(isUserActive)
            // @todo remove password before returning user info
            res.json({users: filteredUsers})
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    createUser: async (req, res) => {
        const { email, role, name } = req.body
        try {
            const existingUser = await UserModel.findOne({email})
            if (existingUser) {
                res.status(409).json({ message: "Existing user with this email"})
                return
            }

            // @todo: create and hash password here and include in the user object
            const userObject = {
                name,
                role,
                email,
                deactivated: false,
            }
            const newUser = await UserModel.create(userObject)
            if (!newUser) {
                res.status(500).json({ message: "Error creating user"})
            }
            return res.json(newUser)
        } catch(err) {
            res.status(500).json(err)
        }
    },
}