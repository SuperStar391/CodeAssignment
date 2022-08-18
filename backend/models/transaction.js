const mongoose = require('mongoose');
var connection = require("../lib/database");

const transactionSchema = mongoose.Schema({
    customerId: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('transaction', transactionSchema);