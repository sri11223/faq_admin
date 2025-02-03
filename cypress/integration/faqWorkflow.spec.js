describe('FAQ Workflow', () => {
    it('should add, edit, and delete an FAQ', () => {
      cy.visit('http://localhost:3000/admin');
  
      // Add a new FAQ
      cy.get('input[placeholder="Enter your question"]').type('What is React?');
      cy.get('.ql-editor').type('React is a JavaScript library.');
      cy.contains('Add FAQ').click();
  
      // Edit the FAQ
      cy.contains('What is React?').parent().find('button').first().click();
      cy.get('input[type="text"]').clear().type('What is React.js?');
      cy.get('.ql-editor').clear().type('React.js is a JavaScript library.');
      cy.contains('Save').click();
  
      // Verify the updated FAQ
      cy.contains('What is React.js?').should('exist');
      cy.contains('React.js is a JavaScript library.').should('exist');
  
      // Delete the FAQ
      cy.contains('What is React.js?').parent().find('button').last().click();
  
      // Verify the FAQ is deleted
      cy.contains('What is React.js?').should('not.exist');
    });
  });