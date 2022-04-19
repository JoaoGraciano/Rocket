const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://JoaoGraciano:123601prominas@cluster0.3fnqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{})
mongoose.Promise = global.Promise;

module.exports = mongoose;
