describe('Horse Racing App', () => {
  it('should load page', () => {
    cy.visit('/')
    cy.get('[data-test=header]').should('be.visible')
  })

  it('should load horse list', () => {
    cy.visit('/')
    cy.get('[data-test=horse-table]').should('be.visible')
    cy.get('[data-test=horse-table] table tbody tr').should('have.length', 20)
  })

  it('should load race track', () => {
    cy.visit('/')
    cy.get('[data-test=race-track]').find('[data-test=race-lane]').should('have.length', 10)
  })

  it('should see program list', () => {
    cy.visit('/')
    cy.get('[data-test=generate-program-btn]').click()
    cy.get('[data-test=program-table] table tbody tr').should('not.equal', 0)
  })
})
