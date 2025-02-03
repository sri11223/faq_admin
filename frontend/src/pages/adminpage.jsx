import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FAQForm from '../components/FAQForm';
import FAQList from '../components/FAQList';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const AdminPage = () => {
  const [faqs, setFaqs] = useState([]); // State to store FAQs
  const [loading, setLoading] = useState(false); // Loading state for fetching data

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  // Function to fetch FAQs from the backend
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://faq-admin-backend.onrender.com/api/faqs');
      setFaqs(response.data); // Update the FAQs state with fetched data
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Function to create a new FAQ and refresh the list
  const handleCreateFAQ = async (newFAQ) => {
    try {
      const response = await axios.post('https://faq-admin-backend.onrender.com/api/faqs', newFAQ);
      const createdFAQ = response.data;
  
      // Append the new FAQ to the existing FAQs list
      setFaqs((prevFaqs) => [...prevFaqs, createdFAQ]);
  
      console.log('FAQ created successfully:', createdFAQ);
    } catch (error) {
      console.error('Error creating FAQ:', error);
      alert('Failed to create FAQ. Please try again.');
    } finally {
      // Optionally, fetch the latest FAQs from the backend
      fetchFAQs();
    }
  };

  // Function to update an existing FAQ
  const handleUpdate = async (id, question, answer) => {
    try {
      const response = await axios.put(`https://faq-admin-backend.onrender.com/api/faqs/${id}`, {
        question_en: question,
        answer_en: answer,
      });
  
      // Update the specific FAQ in the state
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.id === id ? { ...faq, question: question, answer: answer } : faq
        )
      );
  
      console.log('FAQ updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating FAQ:', error);
      alert('Failed to update FAQ. Please try again.');
    }
  };

  // Function to delete an FAQ
  const handleDelete = async (id) => {
    try {
      if (!id) {
        console.error('FAQ ID is undefined');
        return;
      }
  
      await axios.delete(`https://faq-admin-backend.onrender.com/api/faqs/${id}`);
  
      // Remove the deleted FAQ from the state
      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
  
      console.log('FAQ deleted successfully');
    } catch (error) {
      console.error('Error deleting FAQ:', error.response?.data || error.message);
      alert('Failed to delete FAQ. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* FAQ List on the left */}
        <Col md={8}>
          <Card className="p-3 mb-4" style={{ background: 'linear-gradient(135deg, #ff7e5f, #feb47b)' }}>
            <h1 className="text-center text-white">Frequently Asked Questions</h1>

            {/* Show loader while fetching data */}
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <FAQList
                faqs={faqs}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            )}
          </Card>
        </Col>

        {/* FAQ Form on the right */}
        <Col md={4}>
          <Card className="p-3" style={{ background: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="text-center text-primary">Add New FAQ</h3>
            <FAQForm onSubmit={handleCreateFAQ} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
