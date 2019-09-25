describe('Testing HomePage ',()=>{
    before(()=>{
        cy.updateUser();
        cy.login();
    })
    context("checks rendering of elements",()=>{
      it('Checks homepage loaded',()=>{
         cy.get('[data-cy=homePage]')
      })
      it('Makes sure login-page elements are gone',()=>{
          cy.get('[data-cy=form]')
          .should('not.exist')
      })
      it('Are all inputs and textarea there and not empty? ',()=>{
          cy.get('[data-cy=user__form] input')
          .should('have.length',3)
          .each(($el)=>{
              expect($el).to.not.have.value('');
          })

          cy.get('[data-cy=user__form] textarea')
          .should('have.length',1)
          .and('not.be.empty')
      })
     
      after(()=>{
          cy.visit('/')
      })
   })
   context("checks if update information works",()=>{
    let nameInput='Kev';
    let emailInput='kevin@kevin.com';
    let passwordInput='123abc';
    let aboutMeInput='My name is Kevin, I got by Kevin'
       before(()=>{
           cy.login();
       })
       it("Checks if items can be cleared and are typeable",()=>{
            cy.get('[data-cy=user__form] input')
            .each(($el)=>{
                cy.wrap($el).clear().type('kevin').clear();
            })
            cy.get('[data-cy=user__aboutMeInput]').clear().type('test_text').clear();
       })
       it("Checks if inputs update user file",()=>{
           cy.get('[data-cy=user__nameInput]')
                .type(nameInput)
           cy.get('[data-cy=user__emailInput]')
                .type(emailInput)
           cy.get('[data-cy=user__passwordInput]')
                .type(passwordInput)
           cy.get('[data-cy=user__aboutMeInput]')
                .type(aboutMeInput)
            
            cy.get('[data-cy=user__updateButton')
                .click();
            
            cy.get('[data-cy=user__status]')
                .should('contain','Profile Updated')
        })
        it('Throws message if fields are empty',()=>{
            cy.get('[data-cy=user__form] input')
                .each(($el)=>{
                    cy.wrap($el).clear()
                })
            cy.get('[data-cy=user__form] textarea')
                .clear()

            cy.get('[data-cy=user__updateButton]')
                .click();

            cy.get('[data-cy=user__status]')
                .contains("Empty Fields Can't Update")

        })
        it('Will Log Back In with Updated information',()=>{
            cy.visit('/')
            cy.get('[data-cy=form__emailInput]')
            .type(emailInput)

            cy.get('[data-cy=form__passwordInput')
            .type(passwordInput);

            cy.get('[data-cy=form__submit]')
            .click();

            cy.get('[data-cy=user__nameInput')
            .should('have.value',nameInput)
            cy.get('[data-cy=user__emailInput')
            .should('have.value',emailInput)
            cy.get('[data-cy=user__passwordInput')
            .should('have.value',passwordInput)
            cy.get('[data-cy=user__aboutMeInput')
            .should('have.value',aboutMeInput)
        })
   })

})