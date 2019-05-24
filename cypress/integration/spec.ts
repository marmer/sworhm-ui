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
        .should('eq', 2);

    cy.get('.BookingEntryView:last')
        .find('button[title=add]')
        .click();

    cy.get('.BookingEntryView')
        .its('length')
        .should('eq', 3);
  });

    it('should load with entries from the backend', function () {
    cy.server({"force404": true});

      cy.route("GET", "http://backend.de/api/bookings/2002-02-01/entries", "fixture:day_2002-02-01_entries.json");

      cy.visit('http://localhost:3000');
      cy.get('.BookingEntryView').eq(0)
          .find('.start').should('have.value', '00:55')
          .find('.duration').should('have.value', '01:13:00')
          .find('.description').should('have.value', 'another one bites the dust')
          .find('.ticket').should('have.value', 'JIRA-666')
          .find('.notes').should('have.value', 'knocking on heavens door');

      cy.get('.BookingEntryView').eq(1)
          .find('.start').should('have.value', '01:55')
          .find('.duration').should('have.value', '01:13:00')
          .find('.description').should('have.value', 'stay alive')
          .find('.ticket').should('have.value', 'JIRA-999')
          .find('.notes').should('have.value', 'cheek to cheek');
    });
});
