describe('Login', () => {
    beforeEach(() => {
      cy.request('/http://localhost:8081/api/v1.0/moviebooking/login'); 
    });
  
    it('should display the login form', () => {
      cy.get('h1').should('contain', 'Welcome to BookMyTicket.com!!');
      cy.get('h3').should('contain', 'Login Page');
      cy.get('input[name="loginId"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.contains('Submit').should('exist');
    });

    it('should log in successfully with valid credentials', () => {
      const loginId = 'your_login_id';
      const password = 'your_password';

  
      cy.get('input[name="loginId"]').type(loginId);
      cy.get('input[name="password"]').type(password);
      cy.contains('Submit').click();
  
      cy.url().should('include', '/home'); 
      cy.get('h3').should('contain', 'Welcome back');
    });
  
  
    it('should display an error message with invalid credentials', () => {
      const loginId = 'invalid_login_id';
      const password = 'invalid_password';
  
      cy.get('input[name="loginId"]').type(loginId);
      cy.get('input[name="password"]').type(password);
      cy.contains('Submit').click();
   
  
      cy.url().should('include', '/login'); 
      cy.get('.alert-danger').should('contain', 'Invalid Credentials, try again');
    });
  
    it('should navigate to the reset password page when clicking "Forgot password?"', () => {
      cy.contains('Forgot password?').click();
      cy.url().should('include', '/resetpassword');
      
    });
  
  
    it('should navigate to the registration page when clicking "Don\'t have an account?"', () => {
      cy.contains('Don\'t have an account?').click();
      cy.url().should('include', '/register');
    });
  });