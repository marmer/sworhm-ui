import "cypress-testing-library/add-commands"

describe('Some Acceptance test', () => {

    it('should load', function () {
        cy.visit('http://localhost:3000');
        cy.getByText('Sworhm UI')
            .should('be.visible');
    });

    it('should be possible to add more entries', function () {
        cy.visit('http://localhost:3000');
        cy.get('.BookingEntryView')
            .its('length')
            .should('eq', 1);

        cy
            .getAllByTitle('add').last()
            .click();

        cy.get('.BookingEntryView')
            .its('length')
            .should('eq', 2);
    });

    it('should load with entries from the backend', function () {
        cy.server({force404: true});

        cy.route("GET", "http://backend.de/api/booking-days/2002-02-01", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");

        cy.visit('http://localhost:3000').debug({
            log: true
        });
        cy.wait("@entriesLoad");
        cy.getAllByPlaceholderText('09:25').eq(0)
            .should('have.value', '00:55');
        cy.getAllByPlaceholderText('2:17').eq(0)
            .should('have.value', '01:13:00');
        cy.getAllByPlaceholderText('What has been done').eq(0)
            .should('have.value', 'another one bites the dust');
        cy.getAllByPlaceholderText('TICKET-123').eq(0)
            .should('have.value', 'JIRA-666');
        cy.getAllByPlaceholderText('personal notes').eq(0)
            .should('have.value', 'knocking on heavens door');

        cy.getAllByPlaceholderText('09:25').eq(1)
            .should('have.value', '01:55');
        cy.getAllByPlaceholderText('2:17').eq(1)
            .should('have.value', '08:15:00');
        cy.getAllByPlaceholderText('What has been done').eq(1)
            .should('have.value', 'stay alive');
        cy.getAllByPlaceholderText('TICKET-123').eq(1)
            .should('have.value', 'JIRA-999');
        cy.getAllByPlaceholderText('personal notes').eq(1)
            .should('have.value', 'cheek to cheek');
    });
});
