import mongoose from 'mongoose';
import FAQ from '../models/FAQ'; // Adjust the path as needed
require('dotenv').config();

describe("FAQ Model", () => {
  // Connect to the test database before running tests
  beforeAll(async () => {
    const dbUri = process.env.TEST_DB_URI;
    if (!dbUri) {
      throw new Error("TEST_DB_URI is not defined in the environment variables.");
    }
    await mongoose.connect(dbUri);
  });

  // Disconnect from the database after all tests are done
  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Clear the FAQ collection before each test
  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  // Test: Saving a valid FAQ document
  it("should save an FAQ with required fields", async () => {
    const faqData = {
      question_en: "What is this?",
      answer_en: "This is a test FAQ.",
      question_hi: "यह क्या है?", // Optional Hindi question
      answer_hi: "यह एक परीक्षण FAQ है।", // Optional Hindi answer
      question_bn: "এটা কি?", // Optional Bengali question
      answer_bn: "এটি একটি পরীক্ষামূলক FAQ।", // Optional Bengali answer
    };

    const faq = new FAQ(faqData);
    const savedFaq = await faq.save();

    // Assertions
    expect(savedFaq._id).toBeDefined(); // Ensure the document has an _id
    expect(savedFaq.question_en).toBe(faqData.question_en); // Check English question
    expect(savedFaq.answer_en).toBe(faqData.answer_en); // Check English answer
    expect(savedFaq.question_hi).toBe(faqData.question_hi); // Check Hindi question
    expect(savedFaq.answer_hi).toBe(faqData.answer_hi); // Check Hindi answer
    expect(savedFaq.question_bn).toBe(faqData.question_bn); // Check Bengali question
    expect(savedFaq.answer_bn).toBe(faqData.answer_bn); // Check Bengali answer
    expect(savedFaq.createdAt).toBeDefined(); // Ensure createdAt timestamp exists
    expect(savedFaq.updatedAt).toBeDefined(); // Ensure updatedAt timestamp exists
  });

  // Test: Validation fails when required fields are missing
  it("should fail to save an FAQ without required fields", async () => {
    const invalidFaqData = {
      // Missing required fields: question_en and answer_en
      question_hi: "यह क्या है?", // Optional Hindi question
      answer_hi: "यह एक परीक्षण FAQ है।", // Optional Hindi answer
    };

    const faq = new FAQ(invalidFaqData);

    // Attempt to save the invalid FAQ and expect a validation error
    await expect(faq.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});