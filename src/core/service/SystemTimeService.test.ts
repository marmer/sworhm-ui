import SystemTimeService from "./SystemTimeService";
import {TimeService} from "./TimeService";

describe("Tests for SystemTimeService", () => {
    const underTest: TimeService = new SystemTimeService();

    describe("#now", () => {
        it('should serve a date object pretty close to now', () => {
            const nowInMs: number = new Date().getTime();
            const acceptableDelta = 100;

            expect(underTest.getNow().getTime()).toBeGreaterThanOrEqual(nowInMs);
            expect(underTest.getNow().getTime()).toBeLessThanOrEqual(nowInMs + acceptableDelta);
        });
    });
});