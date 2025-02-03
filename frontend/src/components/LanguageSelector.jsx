import React from 'react';
import '../styles/LanguageSelector.css';

const LanguageSelector = ({ onSelect }) => {
  const handleChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className="language-selector">
      <select onChange={handleChange} className="custom-select">
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
