
Cypress.Commands.add("login", () => {
    
    cy.visit('/')
    cy.get('[data-cy=form]').as('form')
    cy.get('[data-cy=form__submit]').as('form__submit')

    cy.get('@form')
    .find('[data-cy=form__emailInput]')
    .type('kevin@google.com')
    
    cy.get('@form')
    .find('[data-cy=form__passwordInput]')
    .type('123abc')
    
    cy.get('@form__submit')
    .click()
})
