describe('Some Acceptance test', () => {

  it('should load', function () {
    cy.visit('http://localhost:3000');
    cy.get('.SwormUi')
        .find('h1')
        .should('be.visible')
        .and('have.text', 'Sworhm UI');
  });

  it('should be possible to add more entries', function () {
    cy.visit('http://localhost:3000');
    cy.get('.BookingEntryView')
        .its('length')
        .should('eq', 1);

    cy.get('.BookingEntryView:last')
        .find('button[title=add]')
        .click();

    cy.get('.BookingEntryView')
        .its('length')
        .should('eq', 2);
  });

    it('should load with entries from the backend', function () {
    cy.server({ force404: true });

      cy.route("GET", "http://backend.de/api/bookings/2002-02-01/entries", "fixture:day_2002-02-01_entries.json")
          .as("entriesLoad");

      cy.visit('http://localhost:3000');
      cy.wait("@entriesLoad");
      cy.get('.BookingEntryView').eq(0)
          .find('.start').should('have.value', '00:55')
      cy.get('.BookingEntryView').eq(0)
          .find('.duration').should('have.value', '01:13:00')
      cy.get('.BookingEntryView').eq(0)
          .find('.description').should('have.value', 'another one bites the dust')
      cy.get('.BookingEntryView').eq(0)
          .find('.ticket').should('have.value', 'JIRA-666')
      cy.get('.BookingEntryView').eq(0)
          .find('.notes').should('have.value', 'knocking on heavens door');

      cy.get('.BookingEntryView').eq(1)
          .find('.start').should('have.value', '01:55')
      cy.get('.BookingEntryView').eq(1)
          .find('.duration').should('have.value', '08:15:00')
      cy.get('.BookingEntryView').eq(1)
          .find('.description').should('have.value', 'stay alive')
      cy.get('.BookingEntryView').eq(1)
          .find('.ticket').should('have.value', 'JIRA-999')
      cy.get('.BookingEntryView').eq(1)
          .find('.notes').should('have.value', 'cheek to cheek');
    });
});
