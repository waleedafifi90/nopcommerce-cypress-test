/// <reference types="cypress" />

describe("learn how to use the selectros",()=>{

    it("best practices of selecting elemnts",()=>{
          const url = "http://192.168.7.40:8888"
            cy.visit(url)
            cy.get(".new-todo").type("element1{enter}")
            cy.get(".todo-list li").find('label').should('contain', 'element1');
            cy.get(".new-todo").type("element2{enter}")
            cy.get(".todo-list li").find('label', {timeout: 0}).should('contain', 'element2');
            cy.get(".todo-list").find('li');
            cy.get(".todo-list li", {timeout: 5000})
              .should("have.length",2)
              .then((el) => {
                  expect(el[0].textContent).to.equal('element1')
                  expect(el[1].textContent).to.equal('element2')
              })
        })
})
