import request from 'supertest';
import app from '../app.js'; // Adjust the path to your Express app
import FAQ from '../models/FAQ'; // Adjust the path to your FAQ model
require('dotenv').config();

describe("FAQ API", () => {
  // Clear the FAQ collection before each test
  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  // Test: GET /api/faqs (Empty List)
  it("GET /api/faqs should return an empty array when no FAQs exist", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // Test: POST /api/faqs (Create a New FAQ)
  it("POST /api/faqs should create a new FAQ", async () => {
    const newFaq = {
      question_en: "What is this?",
      answer_en: "This is a test FAQ.",
      question_hi: "यह क्या है?",
      answer_hi: "यह एक परीक्षण FAQ है।",
    };

    const res = await request(app).post("/api/faqs").send(newFaq);
    expect(res.statusCode).toBe(201); // Created
    expect(res.body.question_en).toBe(newFaq.question_en);
    expect(res.body.answer_en).toBe(newFaq.answer_en);

    // Verify the FAQ was saved in the database
    const faqs = await FAQ.find();
    expect(faqs.length).toBe(1);
    expect(faqs[0].question_en).toBe(newFaq.question_en);
  });

 
  // Test: PUT /api/faqs/:id (Update an Existing FAQ)
  it("PUT /api/faqs/:id should update an existing FAQ", async () => {
    const faq = await FAQ.create({
      question_en: "What is this?",
      answer_en: "This is a test FAQ.",
    });

    const updatedData = {
      question_en: "Updated Question",
      answer_en: "Updated Answer",
    };

    const res = await request(app)
      .put(`/api/faqs/${faq._id}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.question_en).toBe(updatedData.question_en);
    expect(res.body.answer_en).toBe(updatedData.answer_en);

    // Verify the FAQ was updated in the database
    const updatedFaq = await FAQ.findById(faq._id);
    expect(updatedFaq.question_en).toBe(updatedData.question_en);
  });

  // Test: DELETE /api/faqs/:id (Delete an FAQ)
  it("DELETE /api/faqs/:id should delete an FAQ", async () => {
    const faq = await FAQ.create({
      question_en: "What is this?",
      answer_en: "This is a test FAQ.",
    });
    console.log(faq)

    const res = await request(app).delete(`/api/faqs/${faq.id}`);
    expect(res.statusCode).toBe(200); // No Content

    // Verify the FAQ was deleted from the database
    const faqs = await FAQ.find();
    expect(faqs.length).toBe(0);
  });

  // Edge Case: Save FAQ with Very Long Strings
  it("POST /api/faqs should save an FAQ with very long strings", async () => {
    const longString = "a".repeat(1000); // A string with 1000 characters
    const newFaq = {
      question_en: longString,
      answer_en: longString,
    };

    const res = await request(app).post("/api/faqs").send(newFaq);
    expect(res.statusCode).toBe(201); // Created
    expect(res.body.question_en).toBe(longString);
    expect(res.body.answer_en).toBe(longString);
  });

 
  // Edge Case: Save FAQ with Special Characters
  it("POST /api/faqs should save an FAQ with special characters", async () => {
    const newFaq = {
      question_en: "What's this? @#$%^&*()",
      answer_en: "It's a test! 😊",
    };

    const res = await request(app).post("/api/faqs").send(newFaq);
    expect(res.statusCode).toBe(201); // Created
    expect(res.body.question_en).toBe(newFaq.question_en);
    expect(res.body.answer_en).toBe(newFaq.answer_en);
  });
});