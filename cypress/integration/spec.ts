describe('Some Acceptance test', () => {
  it('should load', function () {
    cy.visit('http://localhost:3000')
    cy.get('.SwormUi')
        .find('h1')
        .should('be.visible')
        .and('have.text', 'Sworhm UI');
  })

  it('should be possible to add more entries', function () {
    cy.visit('http://localhost:3000')
    cy.get('.BookingEntryView')
        .its('length')
        .should('eq', 2);

    cy.get('.BookingEntryView:last')
        .find('button[title=add]')
        .click();

    cy.get('.BookingEntryView')
        .its('length')
        .should('eq', 3);
  })
})