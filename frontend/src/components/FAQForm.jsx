// src/components/FAQForm.jsx
import React, { useState } from 'react';
import QuillEditor from './QuillEditor';

const FAQForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [answerHtml, setAnswerHtml] = useState(''); // Stores the HTML content from Quill
  const [answerText, setAnswerText] = useState(''); // Stores the plain text content from Quill
  const [errors, setErrors] = useState({});

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!question.trim()) newErrors.question = 'Question is required';
    if (!answerText.trim()) newErrors.answer = 'Answer is required'; // Validate plain text
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ question_en: question, answer_en: answerHtml }); // Submit the FAQ data
      setQuestion(''); // Reset the question field
      setAnswerHtml(''); // Reset the HTML answer field
      setAnswerText(''); // Reset the plain text answer field
      setErrors({}); // Clear errors
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add New FAQ</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Question Field */}
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question
              </label>
              <input
                type="text"
                id="question"
                className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {errors.question && (
                <div className="invalid-feedback">{errors.question}</div>
              )}
            </div>

            {/* Answer Field with Quill Editor */}
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Answer
              </label>
              <QuillEditor
                value={answerHtml}
                onChange={(html, text) => {
                  setAnswerHtml(html); // Save HTML content
                  setAnswerText(text); // Save plain text content
                }}
              />
              {errors.answer && (
                <div className="text-danger">{errors.answer}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Add FAQ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQForm;