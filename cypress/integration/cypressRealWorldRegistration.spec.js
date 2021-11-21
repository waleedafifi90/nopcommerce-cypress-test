/// <reference types="cypress" />

describe('Registration End to End scenario', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  })

  it('Verify clicking on signup link', () => {
    cy.get('[data-test=signup').click();
    cy.url().should('include', 'signup');
    cy.get('[data-test=signup-title]').click();
  });


  context('Filling registration Form', () => {
    beforeEach(() => {
      cy.get('[data-test=signup-submit]').should('be.disabled')
    });

    it('Verify Filling the First name field', () => {
      cy.get('#firstName').type('Waleed').should('have.value', 'Waleed').focused();
    });
  
    it('Verify Filling the Last name field', () => {
      cy.get('#lastName').type('Afifi').should('have.value', 'Afifi');
    });
  
    it('Verify Filling the User name field', () => {
      cy.get('#username').type('waleed').should('have.value', 'waleed');
    });
  
    it('Verify Filling the password field', () => {
      cy.get('#password').type('waleed').should('have.value', 'waleed');
    });
  
    it('Verify Filling confirm password field', () => {
      cy.get('#confirmPassword').type('waleed').should('have.value', 'waleed');
    });
  });

  context('Signup form submission', () => {
    it('verify clicking on sign up button', () => {
      cy.get('[data-test=signup-submit]').click();
    })
    
    it('Verify the user will be redirected to login page sucessfully', () => {
      cy.url().should('include', 'signin')
    })
  })

  context('Fill Login Fields', () => {

    beforeEach(() => {
      cy.contains('Sign in').click();
      cy.get('[data-test=signin-submit]').should('be.disabled')
    });

    it('Verify filling username field', () => {
      cy.get('#username').type('waleed').should('be.focused').and('not.have.value', '');
    })

    it('Verify filling password field', () => {
      cy.get('#password').type('waleed').should('be.focused').and('not.have.value', '');
    })
    
  })

  context('Login Functionallity', () => {
    it('Verify clicking in sign in button', () => {
      cy.get('[data-test=signin-submit]').click();
    });

    it('Verify the get started modal is displayed after login', () => {
      // cy.get('iframe[id="Your App: \'cypress\'"]').should('be.visible');
    })
  })

})