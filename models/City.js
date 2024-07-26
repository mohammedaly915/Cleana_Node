const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: true
    }
});

const City = mongoose.model('city', citySchema);

module.exports = City;
