import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    // English fields
    question_en: {
      type: String,
      required: [true, 'English question is required'],
      trim: true,
    },
    answer_en: {
      type: String,
      required: [true, 'English answer is required'],
      trim: true,
    },

    // Hindi fields
    question_hi: {
      type: String,
      trim: true,
      default: '',
    },
    answer_hi: {
      type: String,
      trim: true,
      default: '',
    },

    // Bengali fields
    question_bn: {
      type: String,
      trim: true,
    },
    answer_bn: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the FAQ model
const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;