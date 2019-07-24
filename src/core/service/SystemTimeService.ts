import {TimeService} from "./TimeService";

export default class SystemTimeService implements TimeService {
    getNow(): Date {
        return new Date();
    }
}