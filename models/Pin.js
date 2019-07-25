const { Schema, model } = require('mongoose');

const PinSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    isSave: {
        type: Boolean,
        required: true
    },
});

module.exports = model('Pin', PinSchema);