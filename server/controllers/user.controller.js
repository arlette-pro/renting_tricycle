const UserModel = require("../models/user.model");
const secret_key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken"); // for our web tokens
const bcrypt = require("bcryptjs")

function isUserActive(user) {
  return user.deactivated === false;
}

module.exports = {
  registerNewUser: async (req, res) => {
    try {
      const {deactivated,confirmedPassword, ...rest} = req.body
      rest.confirmedPassword = confirmedPassword;
      const newUser = await UserModel.create(rest);

      const { _id, firstName, lastName, email, role, createdAt, updatedAt } = newUser;
      const resUser = { firstName, lastName, email, role, createdAt, updatedAt, _id };
      //     // create a token and save the user's id and sign iff with the secret key from our .env file
      const userToken = jwt.sign(
        {
          id: newUser._id,
        },
        secret_key
      );
      res
      .cookie("userToken", userToken, {
        httpOnly: true,
      })
      .status(201)
      .json({ message: "success!", newUser: resUser });
      console.log(rest);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  login : async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
          // @todo verify if the provided password when hashed corresponds to the hashed password that was saved when this user was registered
    /**
     * if (hash(req.body.password) !== user.password) {
     *  const UNAUTHORIZED = 401
     *  res.status(UNAUTHORIZED).json({ message: "Invalid email/password combination"})
     * }
     */
  
      if (!user) {
        res.status(400).json({ message: 'Invalid Login Credentials' });
      } else {
        const doPasswordsMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
  
        if (!doPasswordsMatch) {
          res.status(400).json({ message: 'Invalid Login Credentials' });
        } else {
          const userToken = jwt.sign({ id: user._id }, secret_key);
  
          res
            .cookie('usertoken', userToken, {
              httpOnly: true,
            })
            .json({ msg: 'success!' });
        }
      }
    } catch (err) {
      res.status(500).json({ message: 'An error occurred' });
    }
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
    const { email, role, firstName, lastName } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: "Existing user with this email" });
        return;
      }

      // @todo: create and hash password here and include in the user object
      const userObject = {
        firstName,
        lastName,
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
