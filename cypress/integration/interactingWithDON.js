/// <reference types="cypress" />

describe('', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo');
    });

    it('Verify we have 2 x items', () => {
        cy.get('.todo-list li').should('have.length', 2);
    });

    it('Verify first element text', () => {
        cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
    });

    it('Verify last element text', () => {
        cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
    });

    it('Verify adding new todo item', () => {
        const newItem = 'Waleed test';
        cy.get('[data-test=new-todo]').type(`${newItem}{enter}`).trigger('input');
    });

    it('Check todo item', () => {
        cy.get(':nth-child(1) > .view > .toggle').check().parents('li').should('have.class', 'completed');
        // cy.get(':nth-child(1) > .view > .toggle').check().closest('.completed');
    });

    context('Test Context', () => {

        beforeEach(() => {
            cy.contains('Walk the dog').prev('input').check();
        })
        // it('Verify check the item', () => {
            
        // });

        it('Verify filtring on Active', () => {
            // cy.get('.filters > :nth-child(2) > a').click();
            cy.get('.todo-list li').should('have.length', 2);
        });

        it('Verify clear the completed todo items', () => {
            cy.get('.footer > .todo-button').click();
            cy.get('.todo-list li').should('have.length', 1);
            cy.get('.footer > .todo-button').should('not.visible');
            // cy.get('.footer > .todo-button').should('have.css', 'display:none');
            cy.get('ul[class="todo-list"] li').should('not.have.class', 'completed');
            // cy.get('ul[class="todo-list"] li input').should('not.be.checked');
            cy.get('.todo-count > strong').should('have.text', '1');
        })
        
    })

    // Number of Items, Last added item, Item left value, Verify if the input is cleared

    // it('Verify we have 3 todo items', () => {
    //     cy.get('.todo-list li').should('have.length', 3);
    // });
})