const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken"); // for our web tokens

function isUserActive(user) {
  return user.deactivated === false;
}

module.exports = {
  registerNewUser: async (req, res) => {
    try {
      const {deactivated, ...rest} = req.body
      const newUser = await UserModel.create(rest);

      const { _id, name, email, role, createdAt, updatedAt } = newUser;
      const resUser = { name, email, role, createdAt, updatedAt, _id };
      //     // create a token and save the user's id and sign iff with the secret key from our .env file

      res.status(201).json({ message: "success!", newUser: resUser });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  login: async(req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    // @todo verify if the provided password when hashed corresponds to the hashed password that was saved when this user was registered
    /**
     * if (hash(req.body.password) !== user.password) {
     *  const UNAUTHORIZED = 401
     *  res.status(UNAUTHORIZED).json({ message: "Invalid email/password combination"})
     * }
     */
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
},



  logoutUser: (req, res) => {
    res
      .clearCookie("userToken")
      .status(200)
      .json({ message: "you have logged out successfully" });
  },

  archiveUser: (req, res) => {
    UserModel.findOne({ _id: req.params.id })
      .then(async (user) => {
        if (!user) {
          res.status(404).json({ message: "user not found" });
          return;
        }
        user.deactivated = true;
        await user.save();
        // @todo remove password before returning user info
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateUser: (req, res) => {
    UserModel.findOne({ _id: req.params.id })
      .then(async (user) => {
        if (!user) {
          res.status(404).json({ message: "user not found" });
          return;
        }
        const { name, email, role } = req.body;
        if (email) {
          user.email = email;
        }
        if (role) {
          user.role = role;
        }
        if (name) {
          user.name = name;
        }
        await user.save();
        // @todo remove password before returning user info
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  fetchAllUsers: (req, res) => {
    UserModel.find()
      .then(async (allUsers) => {
        // filter out deactivated users
        const filteredUsers = allUsers.filter(isUserActive);
        // @todo remove password before returning user info
        res.json({ users: filteredUsers });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createUser: async (req, res) => {
    const { email, role, name } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: "Existing user with this email" });
        return;
      }

      // @todo: create and hash password here and include in the user object
      const userObject = {
        name,
        role,
        email,
        deactivated: false,
      };
      const newUser = await UserModel.create(userObject);
      if (!newUser) {
        res.status(500).json({ message: "Error creating user" });
      }
      return res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
