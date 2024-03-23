const TricycleModel = require("../models/tricycle.model");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

module.exports = {
  getOneTricycle: (req, res) => {
    TricycleModel.findOne({ _id: req.params.id })
      .then((OneTricycle) => {
        res.json(OneTricycle);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  allTricycles: (req, res) => {
    TricycleModel.find()
      .then((allTricycles) => {
        res.json(allTricycles);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //update a tricycle
  updateTricycle: (req, res) => {
    TricycleModel.findByIdAndUpdate({ _id: req.params.id })
      .then((updateTricycle) => {
        res.json(updateTricycle);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createTricycle: (req, res) => {
    const { deactivate, ...rest } = req.body;
    const { userToken } = req.cookies;

    const decoded = jwt.verify(userToken, secret_key);

    console.log({ decoded });
    console.log({ userToken });

    TricycleModel.create({ ...rest, userId: decoded.id, deactivated: false })
      .then((newTricycle) => {
        res.json(newTricycle);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //delete a tricycle
  deleteTricycle: (req, res) => {
    // @todo check jwt token in cookie and unparse to get current user's id
    /**
     * const jwt = unparse(cookies.userToken)
     * const tricycle = await TricycleModel.fineOne({ id: req.params.id})
     * if (jwt.userId !== tricycle.userId) {
     *  res.status(404).json({ message: "Tricycle not found"})
     *  return
     * }
     */

    TricycleModel.deleteOne({ _id: req.params.id })
      .then((deleteConfirmation) => res.json(deleteConfirmation))
      .catch((err = res.status(500).json(err)));
  },
};
