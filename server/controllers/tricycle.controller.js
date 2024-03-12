const TricycleModel = require("../models/tricycle.model")

module.exports = {
    getOneTricycle: (req, res) => {
        TricycleModel.findOne({_id: req.params.id})
        .then((OneTricycle) => {
            res.json(OneTricycle)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    //update a tricycle
    updateTricycle: (req, res) => {
        TricycleModel.findByIdAndUpdate({_id: req.params.id})
        .then((updateTricycle) =>{
            res.json(updateTricycle)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    createTricycle: (req, res) => {
        // @todo get userId from cookie    `userToken` and add to the tricycle
        
         const { deactivate, ...rest } = req.body
         const userId = unparse(jwt).userId
        //  added
        const userToken = req.cookies.userToken;
        


        TricycleModel.create({...rest, userId, deactivated: false })
        .then((newTricycle) => {
            res.json(newTricycle)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },

    //delete a tricycle
    deleteTricycle : (req, res) => {
        // @todo check jwt token in cookie and unparse to get current user's id
        /**
         * const jwt = unparse(cookies.userToken)
         * const tricycle = await TricycleModel.fineOne({ id: req.params.id})
         * if (jwt.userId !== tricycle.userId) {
         *  res.status(404).json({ message: "Tricycle not found"})
         *  return
         * }
         */

        TricycleModel.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation) )
        .catch(err = res.status(500).json(err))
    }
}