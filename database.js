const mongoose = require('mongoose')

const DB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connection established");
    } catch (error) {
        console.log(error);
    }
}

module.exports = DB