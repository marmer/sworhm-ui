import "@testing-library/cypress/add-commands"
import moment from "moment";

describe('Some Acceptance test', () => {
    const todayDateAsIsoString = moment(new Date()).format('YYYY-MM-DD');

    it('should load', function () {
        cy.visit('http://localhost:3000');
        cy.getByText('Sworhm UI')
            .should('be.visible');
    });

    it('should be possible to add more bookings', function () {
        cy.server({force404: true});
        cy.route("GET", "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");

        cy.visit('http://localhost:3000');

        cy.wait("@entriesLoad");

        cy.get('.BookingView')
            .its('length')
            .should('eq', 2);

        cy
            .getAllByTitle('add').last()
            .click();

        cy.get('.BookingView')
            .its('length')
            .should('eq', 3);
    });

    it('should load with bookings from the backend', function () {
        cy.server({force404: true});

        cy.route("GET", "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");

        cy.visit('http://localhost:3000').debug({
            log: true
        });
        cy.wait("@entriesLoad");
        cy.getAllByPlaceholderText('09:25').eq(0)
            .should('have.value', '00:55');
        cy.getAllByPlaceholderText('2:17').eq(0)
            .should('have.value', '45');
        cy.getAllByPlaceholderText('what has been done').eq(0)
            .should('have.value', 'another one bites the dust');
        cy.getAllByPlaceholderText('TICKET-123').eq(0)
            .should('have.value', 'JIRA-666');
        cy.getAllByPlaceholderText('personal notes').eq(0)
            .should('have.value', 'knocking on heavens door');

        cy.getAllByPlaceholderText('09:25').eq(1)
            .should('have.value', '01:55');
        cy.getAllByPlaceholderText('2:17').eq(1)
            .should('have.value', '117');
        cy.getAllByPlaceholderText('what has been done').eq(1)
            .should('have.value', 'stay alive');
        cy.getAllByPlaceholderText('TICKET-123').eq(1)
            .should('have.value', 'JIRA-999');
        cy.getAllByPlaceholderText('personal notes').eq(1)
            .should('have.value', 'cheek to cheek');
    });

    it('it should be possible to delete specific bookings', function () {
        cy.server({force404: true});

        cy.route("GET", "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");
        cy.route({
            status: 204,
            response: "",
            method: "DELETE",
            url: "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings/*"
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

    it('should always be an empty entry there if all bookings have been deleted', () => {
        cy.server({force404: true});

        cy.route("GET", "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings", "fixture:day_2002-02-01_entries.json")
            .as("entriesLoad");
        cy.route({
            status: 204,
            response: "",
            method: "DELETE",
            url: "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings/*"
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

        cy.route({
            method: "GET",
            url: "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings",
            response: "fixture:day_2002-02-01_entries.json",
            status: 200
        }).as("entriesLoad");

        cy.route({
            method: "PUT",
            url: "http://localhost:8080/api/v1/days/" + todayDateAsIsoString + "/bookings/65b8818f-0320-450b-9da0-49f3269bafd7",
            status: 200
        }).as("entryUpdate");

        cy.visit('http://localhost:3000').debug({
            log: true
        });

        cy.wait("@entriesLoad");

        cy.getAllByPlaceholderText("09:25").first()
            .type("{selectall}5:30");
        cy.getAllByPlaceholderText('2:17').first()
            .type("{selectall}1:15");
        cy.getAllByPlaceholderText('what has been done').first()
            .type("{selectall}sleeping");
        cy.getAllByPlaceholderText('TICKET-123').first()
            .type("{selectall}ABC-321");
        cy.getAllByPlaceholderText('personal notes').first()
            .type("{selectall}It was relaxing");

        cy.getAllByTitle('save').first()
            .click();

        cy.wait("@entryUpdate")
            .then(xhr => {
                cy.fixture("day_2002-02-01_entries_1_updated.json")
                    .then(updatedEntry1 => assert.deepEqual(xhr.requestBody, updatedEntry1))
            })
    });
});
