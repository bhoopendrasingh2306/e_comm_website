const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E_COMM_DB');
mongoose.connection.once('open', () => {
    console.log('mongodb connected successfully',);
});