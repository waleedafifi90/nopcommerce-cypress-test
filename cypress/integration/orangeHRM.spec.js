/// <reference types="cypress" />
    Cypress.Cookies.defaults({
      preserve: "csrftoken"
  })

describe('Add Dependant Scenario', () => {
  before(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com')
  })

  it('Verify filling the username', () => {
    cy.get('#txtUsername').type('Admin').should('have.value', 'Admin');
  });

  it('Verify filling the password', () => {
    cy.get('#txtPassword').type('admin123').should('have.value', 'admin123');
  });

  it('Verify clicking on login button', (csrfToken) => {
    // const csrfToken = Cypress.$("meta[name=_csrf_token]").attr("content");
    // cy.clearCookies();
    // // cy.setCookie('orangehrm', `${csrfToken}`)
    // cy.request({
    //   method: "POST",
    //   url: "http://opensource-demo.orangehrmlive.com/auth/validateCredentials",
    //   failsOnStatusCode: true,
    //   form: true,
    //   body: {
    //     email: "Admin",
    //     password: "admin123",
    //     _token: `${csrfToken}`
    //   },
    //   headers: {
    //     'X-CSRF-Token': csrfToken
    //   }
    // });

    cy.visit('http://opensource-demo.orangehrmlive.com')

    const username = 'Admin'
    const password = 'admin123'
  
    cy.get('#txtUsername').type('Admin').should('have.value', 'Admin');
    cy.get('#txtPassword').type('admin123').should('have.value', 'admin123');

    // cy.request({
    //   method: 'POST',
    //   url: 'opensource-demo.orangehrmlive.com/auth/validateCredentials',
    //   failOnStatusCode: false, // dont fail so we can make assertions
    //   form: true, // we are submitting a regular form body
    //   body: {
    //     username,
    //     password,
    //     _csrf: csrfToken, // insert this as part of form body
    //   },
    // })

    cy.get('form[id="frmLogin"]').submit()
  })
})