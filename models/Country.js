const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Country = mongoose.model('country', countrySchema);

module.exports = Country;
