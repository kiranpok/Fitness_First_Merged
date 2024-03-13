const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const goalSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 30,
        },
        distance: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        }

        

    },{
        timestamps: true,

    });

module.exports = mongoose.model('Goal', goalSchema)