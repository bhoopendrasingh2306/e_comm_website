const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
    userId :"string",
    filename :"string"
});

module.exports = mongoose.model("images",imagesSchema);