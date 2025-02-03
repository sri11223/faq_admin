import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/FAQDisplay.css'; // Custom CSS for styling

const FAQDisplay = ({ lang }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`https://faq-admin-backend.onrender.com/api/faqs?lang=${lang}`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, [lang]);

  return (
    <div className="faq-container">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Accordion defaultActiveKey="0">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={faq._id}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))
          ) : (
            <p className="text-center">No FAQs available.</p>
          )}
        </Accordion>
      )}
    </div>
  );
};

export default FAQDisplay;
