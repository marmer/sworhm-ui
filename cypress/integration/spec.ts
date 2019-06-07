import "@testing-library/cypress/add-commands"

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
        cy.getAllByPlaceholderText('what has been done').eq(0)
            .should('have.value', 'another one bites the dust');
        cy.getAllByPlaceholderText('TICKET-123').eq(0)
            .should('have.value', 'JIRA-666');
        cy.getAllByPlaceholderText('personal notes').eq(0)
            .should('have.value', 'knocking on heavens door');

        cy.getAllByPlaceholderText('09:25').eq(1)
            .should('have.value', '01:55');
        cy.getAllByPlaceholderText('2:17').eq(1)
            .should('have.value', '08:15:00');
        cy.getAllByPlaceholderText('what has been done').eq(1)
            .should('have.value', 'stay alive');
        cy.getAllByPlaceholderText('TICKET-123').eq(1)
            .should('have.value', 'JIRA-999');
        cy.getAllByPlaceholderText('personal notes').eq(1)
            .should('have.value', 'cheek to cheek');
    });

    it('it should be possible to delete specific entries', function () {
        cy.server({force404: true});

        cy.route("GET", "http://backend.de/api/booking-days/2002-02-01", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");
        cy.route({
            status: 204,
            response: "",
            method: "DELETE",
            url: "http://backend.de/api/booking-days/2002-02-01/entries/*"
        }).as("entryDelete");

        cy.visit('http://localhost:3000').debug({
            log: true
        });
        cy.wait("@entriesLoad");
        cy.getAllByPlaceholderText('TICKET-123').eq(0)
            .should('have.value', 'JIRA-666');

        cy.getAllByPlaceholderText('TICKET-123').eq(1)
            .should('have.value', 'JIRA-999');

        cy
            .getAllByTitle('remove').first()
            .click();

        cy.wait("@entryDelete");

        cy.getAllByPlaceholderText('TICKET-123')
            .should('have.length', 1)
            .eq(0)
            .should('have.value', 'JIRA-999');
    });

    it('should always be an empty entry there if all entries have been deleted', () => {
        cy.server({force404: true});

        cy.route("GET", "http://backend.de/api/booking-days/2002-02-01", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");
        cy.route({
            status: 204,
            response: "",
            method: "DELETE",
            url: "http://backend.de/api/booking-days/2002-02-01/entries/*"
        }).as("entryDelete");

        cy.visit('http://localhost:3000').debug({
            log: true
        });
        cy.wait("@entriesLoad");

        cy
            .getAllByTitle('remove').first()
            .click();
        cy.wait("@entryDelete");
        cy
            .getAllByTitle('remove').last()
            .click();

        cy.wait("@entryDelete");

        cy.getByPlaceholderText('09:25')
            .should('have.value', '');
        cy.getByPlaceholderText('2:17')
            .should('have.value', '');
        cy.getByPlaceholderText('what has been done')
            .should('have.value', '');
        cy.getByPlaceholderText('TICKET-123')
            .should('have.value', '');
        cy.getByPlaceholderText('personal notes')
            .should('have.value', '');
    });

    it('element should be saved if clicked on save and reloaded the day after', () => {
        cy.server({force404: true});

        cy.route("GET", "http://backend.de/api/booking-days/2002-02-01", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");

        cy.visit('http://localhost:3000').debug({
            log: true
        });

        cy.wait("@entriesLoad");

        cy.getAllByPlaceholderText("09:25").last()
            .type("{selectall}05:30");
        cy.getAllByPlaceholderText('2:17')
            .type("1:15");
        cy.getAllByPlaceholderText('what has been done')
            .type("sleeping");
        cy.getAllByPlaceholderText('TICKET-123')
            .type("ABC-321");
        cy.getAllByPlaceholderText('personal notes')
            .type("It was relaxing");

        cy.getAllByTitle('save').last()
            .click();

        // TODO: marmer 06.06.2019 make the test run and check whether the entry has been saved/updated
    });
});
