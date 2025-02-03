// src/components/QuillEditor.jsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null); 
  const quillInstance = useRef(null); 

  useEffect(() => {
    if (!quillInstance.current) {
      // Initialize Quill editor
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow', 
        modules: {
          toolbar: {
            container: [
              [{ font: ['serif', 'monospace'] }, { size: ['small', 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#EE82EE'] }, { background: ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#EE82EE'] }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ header: [1, 2, 3, false] }, 'blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }, { align: ['right', 'center', 'justify'] }],
              ['link', 'image', 'video', 'formula'],
              ['clean'],
            ],
          },
        },
      });

      // Listen for text changes and update the parent state
      quillInstance.current.on('text-change', () => {
        const htmlContent = quillRef.current.querySelector('.ql-editor').innerHTML; 
        const plainText = quillInstance.current.getText().trim(); 
        onChange(htmlContent, plainText); 
      });
    }

    // Set the initial content of the editor
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.root.innerHTML = value || '';
    }
  }, [value, onChange]);

  return <div ref={quillRef} style={{ height: '300px', border: '1px solid #ccc' }} />;
};

export default QuillEditor;
