describe('Testing Page Elements and CSS ',()=>{
   it("checks for page loaded",()=>{
        // cy.visit('/')
        // cy.server();
        // cy.route({
        //     method:"GET",
        //     url:"/api/test",
        //     response:[{
        //         name:"kevin",
        //         url:"hello"
        //     }]
        // })
        // cy.request("GET","/api/test")
   }) 
   context("checks rendering of elements",()=>{
       beforeEach(()=>{
           cy.visit('/')
       })

      it('checks all items in navbar rendered',()=>{
        //saves alias beforeUses
        cy.get('[data-cy=navbar]').as('navbar')
        //find h1
        cy.get('@navbar')
            .find('[data-cy=navbar__title]')
            .should('be.visible')
            .contains('e2e Testing Site')
        //find hyperlinks
        cy.get('@navbar')
            .find('[data-cy=navbar__links] a')
            //can chain a return to express multiple assertions 
            .then((data)=>{
                expect(data).to.have.length(3);
            })
            .should('be.visible')
      })

   })

      context('checks to make sure hyperlinks are proper',()=>{
            beforeEach(()=>{
                cy.get('[data-cy=navbar__links]').as('links')
            })
            it('checks favorites, href, and clickthrough',()=>{
                cy.get('@links')
                .find('[data-cy=navbar__favorites]')
                .should('have.attr','href','./favorites')
                .click()
                //checks if url updated
                cy.url().as('currentURL')
                cy.get('@currentURL').should('be.equal','http://localhost:3000/favorites')
            })
            it('checks shopping link, have attr, and click through',()=>{
                cy.get('@links')
                .find('[data-cy=navbar__shopping]')
                .then(data=>{
                    expect(data).to.have.attr('href','./shopping')
                })
                .click();
                cy.url().and('be.equal','http://localhost:3000/shopping')
            })
             
            it('checks account link, have attr, and click through',()=>{
                cy.get('@links')
                .find('[data-cy=navbar__account]')
                .and('have.attr','href','./account')
                .click();

                cy.url().then(data=>{
                    expect(data).to.be.equal('http://localhost:3000/account')
                })
               
            })
          
                
      })

})