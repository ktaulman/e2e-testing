describe('Testing HomePage ',()=>{
    before(()=>{
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
     

   })
   context("checks if update information works",()=>{
       it("Checks if items can be cleared and are typeable",()=>{
            cy.get('[data-cy=user__form] input')
            .each(($el)=>{
                cy.wrap($el).clear().type('kevin').clear();
            })
            cy.get('[data-cy=user__aboutMe').clear().type('test_text').clear();
       })
   })

})