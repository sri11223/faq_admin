import React, { useState } from 'react';
import FAQDisplay from '../components/FAQDisplay';
import LanguageSelector from '../components/LanguageSelector';
import { Container } from 'react-bootstrap';
import { Globe } from 'react-bootstrap-icons';
import '../styles/UserPage.css';

const UserPage = () => {
  const [lang, setLang] = useState('en');

  return (
    <div className="user-page">
      <Container className="faq-container">
        <div className="faq-header">
          <h1><Globe className="icon" /> Frequently Asked Questions</h1>
          <LanguageSelector onSelect={setLang} />
        </div>
        <FAQDisplay lang={lang} />
      </Container>
    </div>
  );
};

export default UserPage;
