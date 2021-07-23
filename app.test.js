import Core , { TimeElement } from './src/app';
import clock from 'clock';

const getTime = (injectedDate, format) => {
    const minutes = ("0" + injectedDate.getMinutes()).slice(-2);
    const time12h = `${("0" + ((injectedDate.getHours() + 11) % 12 + 1)).slice(-2)}:${minutes}`;
    const time24h = `${("0" + injectedDate.getHours()).slice(-2)}:${minutes}`;

    if (format === '12h') {
        return time12h;
    }
    return time24h;
}

const core = new Core({
    timeId: 'time'
}, { 
    dateId: 'date'
});

const ES_DAYS = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
];

core.initialize();

describe('fitbit-settings/app', () => {
    test('core instance should provide time and date as accessible elements', () => {
        expect(core.time).toBeDefined();
        expect(core.date).toBeDefined();
    });

    test('time should have time display per user preference', () => {
        const time12h = getTime(new Date(), '12h');
        expect(core.time.get().text).toEqual(time12h);
    });

    test('time should support 24 hour format', () => {
        const coreInstance = new Core({
            timeId: 'time',
            format: '24h'
        }, { 
            dateId: 'date'
        });
        
        const time24h = getTime(new Date(), '24h');
        coreInstance.initialize();
        expect(coreInstance.time.get().text).toEqual(time24h);
    });

    test('time and date should update on clock ticks', () => {
        const coreInstance = new Core({
            timeId: 'time',
        }, { 
            dateId: 'date',
        });
        coreInstance.initialize();

        // Verify Time is Correct
        const time12h = getTime(new Date(), '12h');
        expect(coreInstance.time.get().text).toEqual(time12h)

        // Store Previous Day
        const previousDay = coreInstance.date.get().text;

        // Update Date to Next Day
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        const futureMinutes = (futureDate.getMinutes() + 10) % 60;
        futureDate.setMinutes(futureMinutes);
        console.log(futureMinutes);
        const futureTime12H = getTime(futureDate, '12h');

        // Emit Event and Check Update
        clock.emitTick(futureDate);
        expect(coreInstance.time.get().text).toEqual(futureTime12H);
        expect(coreInstance.date.get().text).not.toBe(previousDay);
    });

    test('date should support multi-language hour format', () => {
        const coreInstance = new Core({
            timeId: 'time',
            format: '24h'
        }, { 
            dateId: 'date',
            i18n: true
        });
        
        const now = new Date();
        const weekday = ES_DAYS[now.getDay()];
        coreInstance.initialize();
        expect(coreInstance.date.get().text.includes(weekday)).toBe(true);
    });
});