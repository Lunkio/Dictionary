describe('Dictionary creation', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3001')
        cy.contains('Create Dictionary').click()
    })

    it('valid dictionary can be created', function() {
        cy.get('#nameId').type('No Issues')
        cy.get('#originalId').type('A')
        cy.get('#desiredId').type('B')
        cy.contains('Add').click()
        cy.get('.btn-primary').click()
        cy.contains('Dictionary added successfully!')
        cy.contains('Available Dictionaries').click()
        cy.contains('No Issues')
        cy.contains('Duplicate value').should('not.exist')
        cy.contains('Fork value').should('not.exist')
        cy.contains('Cycle value').should('not.exist')
        cy.contains('Chain value').should('not.exist')
    })

    it('dictionary without name cannot be created', function() {
        cy.get('#originalId').type('A')
        cy.get('#desiredId').type('B')
        cy.contains('Add').click()
        cy.get('.btn-primary').click()
        cy.contains('Original')
    })

    it('dictionary without values cannot be created', function() {
        cy.get('#nameId').type('No Issues')
        cy.get('.btn-primary').click()
        cy.contains('Dictionary needs at least one value')
    })

    it('dictionary values cannot be empty', function() {
        cy.get('#nameId').type('No Issues')
        cy.contains('Add').click()
        cy.contains('Value can not be empty')
    })
})