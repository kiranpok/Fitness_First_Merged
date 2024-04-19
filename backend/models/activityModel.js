const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
    {
        activityName: {
            type: String,
            required: true,
        },
        activityName_en: {
            type: String,
            default: "Activity Name",
        },
        activityName_fi: {
            type: String,
            default: "Toiminnan nimi",
        },
        activityName_np: {
            type: String,
            default: "गतिविधि नाम",
        },
        startTime: {
            type: String,
            required: true,
        },
        startTime_en: {
            type: String,
            default: "Start Time",
        },
        startTime_fi: {
            type: String,
            default: "Aloitusaika",
        },
        startTime_np: {
            type: String,
            default: "समय प्रारम्भ",
        },
        date: {
            type: Date,
            required: true,
        },
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
        activityType: {
            type: String,
            required: true,
        },
        activityType_en: {
            type: String,
            default: "Activity Type",
        },
        activityType_fi: {
            type: String,
            default: "Toiminnan tyyppi",
        },
        activityType_np: {
            type: String,
            default: "गतिविधि प्रकार",
        },
        duration: {
            type: String,
            required: true,
        },
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
        distance: {
            type: Number,
            required: true,
        },
        distance_en: {
            type: String,
            default: "Distance",
        },
        distance_fi: {
            type: String,
            default: "Etäisyys",
        },
        distance_np: {
            type: String,
            default: "दूरी",
        },
        pace: {
            type: Number,
            required: true,
        },
        pace_en: {
            type: String,
            default: "Pace",
        },
        pace_fi: {
            type: String,
            default: "Vauhti",
        },
        pace_np: {
            type: String,
            default: "गति",
        },
        notes: {
            type: String,
        },
        notes_en: {
            type: String,
            default: "Notes",
        },
        notes_fi: {
            type: String,
            default: "Huomautukset",
        },
        notes_np: {
            type: String,
            default: "टिप्पणीहरू",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Activity", activitySchema);