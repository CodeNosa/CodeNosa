//C:\Users\henn5\Desktop\CodeNosa-main\backend\src\models\Testimonial.js
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    nomClient: {
      type: String,
      required: true
    },

    entreprise: {
      type: String
    },

    projet: {
      type: String
    },

    commentaire: {
      type: String,
      required: true
    },

    note: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    verifie: {
      type: Boolean,
      default: false
    },

    approuve: {
      type: Boolean,
      default: false
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Testimonial", testimonialSchema);
