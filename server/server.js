const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const { log } = require('util')
require("dotenv").config(); // Load the .env values into process.env
require("./config/mongoose.config");

const app = express();
const port = process.env.PORT

app.use(cookieParser()); // Handle cookies in the application

app.use(cors({ credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/status', (req, res) => {
    res.send('Ok')
})
app.post('admin/user', (req, res) => {
    res.send('Ok')
})
require("./routes/user.routes")(app);
require("./routes/tricycle.routes")(app)

app.listen(port, () => console.log(`Listening on port ${port}`));