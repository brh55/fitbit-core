import Core , { TimeElement } from './src/app';
import { JSDOM } from 'jsdom';

// 'Doesn't test very well
const timeFormat = new TimeElement({ timeId: 'time'});
const now = new Date();
const time12h = `${now.getHours()}:${("0" + now.getMinutes()).slice(-2)}`;

const core = new Core({
    timeId: 'time'
}, { 
    dateId: 'date'
});

core.initialize();

describe('fitbit-settings/app', () => {
    test('core instance should provide time and date as accessible elements', () => {
        expect(core.time).toBeDefined();
        expect(core.date).toBeDefined();
    });

    test('time should have time display per user preference', () => {
        expect(core.time.get().text).toEqual(time12h);
    });
});