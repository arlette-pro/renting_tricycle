const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
module.exports.secret = secret_key;
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret_key, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false, message: "plse make you are logged it"});
    } else {
      next();
    }
  });
}

//Are you really who you are based on the information saved in JWT when you access routes that require you to be logging in