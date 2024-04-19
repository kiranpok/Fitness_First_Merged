const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
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


      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      gender: {
        type: String,
      },


      // Language-specific fields for gender
      gender_en: {
        type: String,
        default: "gender",
      },

      gender_fi: {
        type: String,
        default: "sukupuoli",
      },

      gender_np: {
        type: String,
        default: "लिङ्ग",
      },



      birthdate_en: {
        type: String,
        default: "birthdate",
      },
      birthdate_fi: {
        type: String,
        default: "syntymäaika",
      },
      birthdate_np: {
        type: String,
        default: "जन्म मिति",
      },

      birthdate: {
        type: String,
      },

      height: {
        type: String,
      },

      // Language-specific fields for height

      height_en: {
        type: String,
        default: "height",
      },
      height_fi: {
        type: String,
        default: "pituus",
      },
      height_np: {
        type: String,
        default: "उचाइ",
      },
      // Language-specific fields for weight

      weight: {
        type: String,
      },

      weight_en: {
        type: String,
        default: "weight",
      },
      weight_fi: {
        type: String,
        default: "paino",
      },
      weight_np: {
        type: String,
        default: "वजन",

      },


    },

    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);