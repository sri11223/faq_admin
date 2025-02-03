describe('FAQ Management', () => {
    it('should add a new FAQ', () => {
      cy.visit('http://localhost:3000/admin');
  
      // Fill out the form
      cy.get('input[placeholder="Enter your question"]').type('What is React?');
      cy.get('.ql-editor').type('React is a JavaScript library.');
  
      // Submit the form
      cy.contains('Add FAQ').click();
  
      // Verify the new FAQ is displayed
      cy.contains('What is React?').should('exist');
      cy.contains('React is a JavaScript library.').should('exist');
    });
  });