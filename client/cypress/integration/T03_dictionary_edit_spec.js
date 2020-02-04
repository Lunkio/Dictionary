describe('Dictionary editing', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3001')
        cy.contains('Create Dictionary').click()
        cy.get('#nameId').type('No Issues')
        cy.get('#originalId').type('A')
        cy.get('#desiredId').type('B')
        cy.contains('Add').click()
        cy.get('.btn-primary').click()
        cy.contains('Available Dictionaries').click()
    })

    it('valid dictionary can be created and deleted', function() {
        cy.contains('Remove dictionary').click()
        cy.contains('No dictionaries, create one and they will appear here')
    })

    it('dictionary can be renamed', function() {
        cy.contains('Edit dictionary').click()
        cy.get('#renameBtn').click()
        cy.get('#renameInput').clear().type('Renamed Dictionary')
        cy.get('#submitRename').click()
        cy.contains('Renamed Dictionary')
    })

    it('values can be added while editing, but not empty values', function() {
        cy.contains('Edit dictionary').click()
        cy.get('#addBtn').click()
        cy.contains('Value can not be empty')
        cy.get('#originalAddId').type('New Original')
        cy.get('#desiredAddId').type('New Desired')
        cy.get('#addBtn').click()
        cy.contains('New values added')
        cy.contains('New Original')
        cy.contains('New Desired')
    })

    it('single value can be edited', function() {
        cy.contains('Edit dictionary').click()
        cy.get('.btn-info').click()
        cy.get('#originalEditId').clear().type('Edited original')
        cy.get('#desiredEditId').clear().type('Edited desired')
        cy.get('#applyEdit').click()
        cy.contains('Values updated succesfully')
        cy.contains('Edited Original')
        cy.contains('Edited Desired')
    })

    it('values can be deleted', function() {
        cy.contains('Edit dictionary').click()
        cy.get('.btn-danger').click()
        cy.contains('Values removed succesfully')
    })
})