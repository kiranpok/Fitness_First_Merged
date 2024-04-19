const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 30,
        },
        
        // Language-specific fields for name
        name_en: {
            type: String,
            default: "Name",
        },
        name_fi: {
            type: String,
            default: "Nimi",
        },
        name_np: {
            type: String,
            default: "नाम",
        },
        distance: {
            type: Number,
            required: true,
        },
        // Language-specific fields for distance
        distance_en: {
            type: String,
            default: "Distance",
        },
        distance_fi: {
            type: String,
            default: "Kesto",
        },
        distance_np: {
            type: String,
            default: "अवधि",
        },
        duration: {
            type: Number,
            required: true,
        },
        // Language-specific fields for duration
        duration_en: {
            type: String,
            default: "Duration",
        },
        duration_fi: {
            type: String,
            default: "Kesto",
        },
        duration_np: {
            type: String,
            default: "अवधि",
        },
        date: {
            type: Date,
            required: true,
        },
        // Language-specific fields for date
        date_en: {
            type: String,
            default: "Date",
        },
        date_fi: {
            type: String,
            default: "Päivämäärä",
        },
        date_np: {
            type: String,
            default: "मिति",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Goal', goalSchema);
