const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socket')
    .then(() => console.log('----------------Database connected----------------'))
    .catch(err => console.error('Database connection error:', err));


const userSchema = require('./UserSchema');
const chatSchema = require('./ChatSchema')

const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', chatSchema)

module.exports = { User, Chat };
