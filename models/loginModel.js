const { Schema, Types, model } = require('mongoose');

const loginDetailSchema = Schema({
    name: {
        type: String,
        default: ""
    },
    age: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
}); 


module.exports = model('loginDetail', loginDetailSchema);