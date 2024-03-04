const mongoose = require('mongoose');
const MONGODB_URL=process.env.MONGODB_URL
//This will create a database named "person" if one doesn't already exist (no need for mongo shell!):
mongoose.connect(MONGODB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
