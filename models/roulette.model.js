const {Schema, model} = require('mongoose');

const rouletteSchema = Schema({
    open: {
        type: Boolean,
        default: false
    },
    bets: [{
        user: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        number: {
            type: Number,
        },
        color: {
            type: String,
        }
    }],
    result: {
        number: {
            type: Number
        },
        color: {
            type: String
        }
    }
})

module.exports = model('Roulettes', rouletteSchema);