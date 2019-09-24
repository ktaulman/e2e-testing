describe("Tests Login Page",()=>{
    context('Did elements display',()=>{
        before(()=>{
            cy.visit('/')
        })
        it("Did all text render and in default state?",()=>{
            
            cy.get('[data-cy=navbar__title]')
            .contains('e2e Testing Site')
            .should('contain','e2e Testing Site')
            
            cy.get('[data-cy=form]').as('form')


            cy.get('@form')
              .find('[data-cy=form__emailLabel]')
              .should('contain','Email')
              .should('have.attr','for','emailInput')
            
            cy.get('@form')
                .find('[data-cy=form__emailInput]')
                .should('have.attr','name','emailInput')
                .and('have.value','')
            
            cy.get('@form')
                .find('[data-cy=form__passwordLabel]')
                .contains('Password')
                .should('have.attr','for','passwordInput')

            cy.get('@form')
                .find('[data-cy=form__passwordInput]')
                .should('have.attr','name','passwordInput')
                .and('have.value','')

            cy.get('@form')
                .find('[data-cy=form__passwordInput]')
                .should('have.attr','name','passwordInput')
                .and('have.value','')
        })

    })

    context('Are inputs working',()=>{
        let typedEmail='kevin@google.com';
        let typedPassword='123abc';
        before(()=>{
            cy.visit('/')
        })

       it('Can you type into inputs?',()=>{

            cy.get('[data-cy=form__emailInput]')
            .type(typedEmail)

            cy.get('[data-cy=form__passwordInput')
            .type(typedPassword);
        })
        it('Do inputs store typed value properly?',()=>{
            cy.get('[data-cy=form__emailInput]')
            .should('have.value',typedEmail)

            cy.get('[data-cy=form__passwordInput')
            .should('have.value',typedPassword)
        })
        it('Can you clear inputs and reset value?',()=>{
            cy.get('[data-cy=form__emailInput]')
            .clear()
            .should("have.value",'')

            cy.get('[data-cy=form__passwordInput]')
            .clear()
            .should('have.value','')
        })
    })
    context.only('Does the submit button work? ',()=>{
       it('is button there and can you click it? ',()=>{
            cy.server()
            cy.fixture(example.json).as('exampleJSON')
            cy.route({
                method:'POST',
                url:'/api/user',
                response:'@exampleJSON'
            })
           
            cy.get('[data-cy=form__submit]')
            cy.request('POST','/api/user',{
                email:typedEmail,
                password:typedPassword
            })
       })
    })


})