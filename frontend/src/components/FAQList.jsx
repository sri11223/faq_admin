// src/components/FAQList.jsx
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import DOMPurify from 'dompurify';

const FAQList = ({ faqs, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null); 
  const [updatedQuestion, setUpdatedQuestion] = useState('');
  const [updatedAnswer, setUpdatedAnswer] = useState('');
  const [activeKey, setActiveKey] = useState(null); 

  // Handle Edit Button Click
  const handleEdit = (faq) => {
    console.log(faq.id);
    setEditId(faq.id); 
    setUpdatedQuestion(faq.question); 
    setUpdatedAnswer(faq.answer); 
    setActiveKey(faq.id); 
  };

  // Handle Save Button Click
  const handleSave = (id) => {
    console.log(updatedAnswer, updatedQuestion);
    onUpdate(id, updatedQuestion, updatedAnswer); 
    setEditId(null); 
    setUpdatedQuestion(''); 
    setUpdatedAnswer(''); 
    setActiveKey(null);
  };

  // Handle Cancel Button Click
  const handleCancel = () => {
    setEditId(null); 
    setUpdatedQuestion(''); 
    setUpdatedAnswer(''); 
    setActiveKey(null); 
  };

  return (
    <div className="faq-container">
      <h2 className="faq-header">Frequently Asked Questions</h2>
      <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        {faqs.map((faq) => (
          <Accordion.Item eventKey={faq.id} key={faq.id}>
            <Accordion.Header>
              {editId === faq.id ? (
                // Render an input field for editing the question
                <input
                  type="text"
                  value={updatedQuestion}
                  onChange={(e) => setUpdatedQuestion(e.target.value)}
                  className="form-control"
                />
              ) : (
                faq.question // Display the question if not in edit mode
              )}
              <div className="ml-3">
                {/* Edit and Delete buttons */}
                <button
                  className="btn btn-link"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent accordion from toggling
                    handleEdit(faq);
                  }}
                  style={{ color: '#ffc107' }}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Deleting FAQ with ID:', faq.id); // Debugging line
                    onDelete(faq.id);
                  }}
                  style={{ color: '#dc3545' }}
                >
                  <FaTrash />
                </button>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {editId === faq.id ? (
                <div>
                  {/* Answer Edit */}
                  <textarea
                    value={updatedAnswer}
                    onChange={(e) => setUpdatedAnswer(e.target.value)}
                    className="form-control"
                    rows="4"
                  />
                  {/* Save and Cancel buttons */}
                  <button
                    className="btn btn-success m-2"
                    onClick={() => handleSave(faq.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Sanitize and display the answer
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(faq.answer),
                  }}
                />
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQList;
