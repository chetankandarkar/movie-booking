describe('Register', () => {
    beforeEach(() => {
      cy.visit('/register'); 
    });
  
  
    it('should display the registration form', () => {
      cy.get('h2').should('contain', 'Registration Page');
      cy.get('input[name="loginId"]').should('exist');
      cy.get('input[name="firstName"]').should('exist');
      cy.get('input[name="lastName"]').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="contactNumber"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('input[name="confirmpassword"]').should('exist');
      cy.contains('Submit').should('exist');
      cy.contains('Clear').should('exist');
      cy.contains('Already have an account?').should('contain', 'Already have an account?');
      cy.contains('Sign in').should('exist');
    });
  
   
    it('should display an error message if password and confirm password do not match', () => {
      const password = 'password1';
      const confirmPassword = 'password2';
  
  
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="confirmpassword"]').type(confirmPassword);
      cy.contains('Submit').click();
  
  
      cy.get('.alert-danger').should('contain', "Password and confirm password doesn't match");
    });
  
  
    it('should display a success message after successful registration', () => {
      const loginId = 'john123';
      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'john.doe@example.com';
      const contactNumber = '1234567890';
      const password = 'password';
      const confirmPassword = 'password';
  
   
  
      cy.get('input[name="loginId"]').type(loginId);
      cy.get('input[name="firstName"]').type(firstName);
      cy.get('input[name="lastName"]').type(lastName);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="contactNumber"]').type(contactNumber);
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="confirmpassword"]').type(confirmPassword);
      cy.contains('Submit').click();
  
   
  
      cy.get('.alert-success').should('contain', 'Account created successfully');
    });
  
   
  
    it('should clear the form when clicking "Clear"', () => {
      const loginId = 'john123';
      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'john.doe@example.com';
      const contactNumber = '1234567890';
      const password = 'password';
      const confirmPassword = 'password';
  
   
  
      cy.get('input[name="loginId"]').type(loginId);
      cy.get('input[name="firstName"]').type(firstName);
      cy.get('input[name="lastName"]').type(lastName);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="contactNumber"]').type(contactNumber);
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="confirmpassword"]').type(confirmPassword);
      cy.contains('Clear').click();
  
   
  
      cy.get('input[name="loginId"]').should('have.value', '');
      cy.get('input[name="firstName"]').should('have.value', '');
      cy.get('input[name="lastName"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
      cy.get('input[name="contactNumber"]').should('have.value', '');
      cy.get('input[name="password"]').should('have.value', '');
      cy.get('input[name="confirmpassword"]').should('have.value', '');
    });
  
   
  
    it('should navigate to the login page when clicking "Sign in"', () => {
      cy.contains('Sign in').click();
      cy.url().should('include', '/');
    });
  });