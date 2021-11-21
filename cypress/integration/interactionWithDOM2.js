describe('Interacting with DOM part 2', () => {
  it('Verify visiting web page', () => {
    cy.visit('https://example.cypress.io/commands/actions')
  });

  it('verify typing in text field', () => {
    cy.get('#email1').type('test@test.com', {delay: 20}).should('have.value', 'test@test.com');
  });

  it('verify checking disabled textarea value', () => {
    cy.get(':nth-child(2) > .form-control').type('test text', {force: true}).should('have.value', 'test text');
  });

  it('Verify it focusing on Password', () => {
    cy.get('#password1').focus().should('have.class', 'action-focus').and('have.class', 'focus')
      // .prev().should('have.css', 'color: orange')
    // cy.get(':nth-child(5) > .well > form > .form-group > label')
  })

  it('Verify bluring web element', () => {
    cy.get('#fullName1').type('test text').blur().should('have.class', 'action-blur').and('have.class', 'error')
    // .prev().should('have.attr', 'style', 'color:red;')

  })

  it('verify clearing text field value', () => {
    cy.get('#description').clear().should('have.value', '');

  })

  it('Verify submitting the form', () => {
    cy.get('#couponCode1').type('test text').parents('form').submit().next().should('contain.text', 'Your form has been submitted!').and('be.visible');
  });

  it('Verify clicking on element', () => {
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('bottomRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('bottomLeft');
    cy.get('#action-canvas').click('topLeft');
    cy.get('#action-canvas').click('center');
  });

  it('Verify clicking on a specific elemen coordinates', () => {
    cy.get('#action-canvas').click(50, 100);
  });

  it('Verify clicking on a covered element', () => {
    cy.get('.action-opacity > button').click({force: true});
  })

  it('Verify double click on an element', () => {
    cy.get('.action-div').dblclick().should('not.be.visible')
  })

  it('Verify right click on an element', () => {
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
  });

  it('Verify checking specific checkbox', () => {
    cy.get('.action-checkboxes > :nth-child(1) > label > input').check().should('be.checked');
  });

  it('Verify clicking on disabled raduo button', () => {
    cy.get('#optionsRadios3').check({force: true}).should('be.checked');
  });

  it('Verify scrolling to specific view', () => {
    cy.get('#password1').scrollIntoView().should('be.visible');
    cy.scrollTo('top');
  })


})