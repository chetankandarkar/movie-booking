describe('HomePage', () => {

  beforeEach(() => {
    cy.request('http://localhost:8081/api/v1.0/moviebooking/all'); 
  });


  it('should display the welcome message', () => {
    cy.contains('Welcome back').should('be.visible');
  });


  it('should display the movies table', () => {
    cy.get('table').should('exist');
  });


  it('should navigate to the booking page when clicking "Book Ticket"', () => {
    cy.get('tbody tr').first().within(() => {
      cy.contains('Book Ticket').click();
    });

    cy.url().should('include', '/bookticket');
  });

});