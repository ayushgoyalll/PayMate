const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
        },
    password:{
        type: String,
        required: true
        
    },
    firstname:{
        type: String,
        required: true
        },
    lastname:{
        type: String,
        required: true
        }

});
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
  Account,
};
