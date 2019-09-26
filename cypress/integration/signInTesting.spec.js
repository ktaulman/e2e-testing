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
            
            cy.get('@form')
                .find('[data-cy=form__submit]')
                .contains('Submit')


            cy.get('[data-cy=error__div')
            .should('not.be.visible')
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
    context('Does the form submit properly? ',()=>{
        beforeEach(()=>{
           cy.visit('/')
           cy.get('[data-cy=form__submit]').as('form__submit');
           cy.get('[data-cy=error__div]').as('error__div');
           cy.get('[data-cy=form]').as('form');
           cy.updateUser()
        })
        let typedEmail='kevin@google.com';
        let typedPassword='123abc';
    
       it('does it error if both are empty?',()=>{
            cy.get('@form__submit')
                .click();

            cy.get('@error__div')
            .contains('email and password are empty')
        })

       it('does it require full email?',()=>{
           cy.get('@form')
            .find('[data-cy=form__passwordInput]')
            .type(typedPassword)
           
            cy.get('@form__submit')
                .click();

           cy.get('@error__div')
            .contains('email is empty')
       })

       it('does it require full password?',()=>{
           cy.get('@form')
            .find('[data-cy=form__emailInput]')
            .type(typedEmail)
        
            cy.get('@form__submit').click();
            cy.get('@error__div')
            .contains('password is empty')
       })
      it('does it return a valid signIn',()=>{
            cy.get('@form')
                .find('[data-cy=form__emailInput]')
                .type(typedEmail)
            cy.get('@form')
                .find('[data-cy=form__passwordInput]')
                .type(typedPassword)
            cy.get('@form__submit')
                .click()
            cy.log('Page should now display homePage')
            cy.get('[data-cy=homePage]')
      })
      it('does it reject a bad signIn?',()=>{
        cy.get('@form')
            .find('[data-cy=form__emailInput]')
            .type("kevin@kevin.com")
        cy.get('@form')
            .find('[data-cy=form__passwordInput]')
            .type(typedPassword)
        cy.get('@form__submit')
            .click()
       
        cy.get('@error__div')
            .contains(('error logging in'))
       
     })
     
    })


})