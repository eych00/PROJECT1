const mongoose = require('mongoose');
let connection = undefined;

@returns


const getConnection = async () => {
    if(connection) {
        console.log('returning existing connection')
        return connection
    } else {
        console.log('creating new connection')
        connection = await mongoose.connect('User,mongodb+srv://eych22:N0VJdslDwbfpXu4R@cluster0.gq9srqy.mongodb.net/test')
        return connection;
    }
}

module.exports = {
    getConnection,
    mongoose,
    Schema: mongoose.Schema
};