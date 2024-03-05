const TricycleController = require("../controllers/tricycle.controller")
const { authenticate } = require("../config/jwt.config")
module.exports = app => {
    app.post('/api/tricycles',  TricycleController.createTricycle)
    app.get('/api/tricycle/:id',  TricycleController.getOneTricycle)
    app.put('/api/tricycle/:id',  TricycleController.updateTricycle)
    app.delete('/api/tricycle/:ids',  TricycleController.deleteTricycle)
}