const { getConnection, Schema, mongoose } = require("../db/db")

getConnection();

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    course: String,
    agreedToTerms: Boolean,
    address: {
        type: String,
        default: '101 not real place'
    },
    bio: String,
    dob: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model('Users', userSchema)

module.export = userModel