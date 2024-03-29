import clock from 'clock';
import document from "document";

import { preferences } from "user-settings";
import { FitFont } from 'fitfont';
import { gettext } from "i18n";

const DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

class CoreElement {
    constructor(elementId, { fitfont, color }) {
        try {
            this.id = elementId;

            if (fitfont) {
                this.element = new FitFont({id: elementId, ...fitfont});
            } else {
                this.element = document.getElementById(elementId);
            }
        } catch (err) {
            console.error(err);
        }
    
        // TO-DO: 
        // Decide if we want to continue to keep the
        // fitfont configuration here
        this.fitfont = fitfont || null;

        if (color) {
            this.setColor(color);
        }
    }

    get() {
        return this.element;
    }

    setColor(color) {
        document.getElementById(this.id).style.fill = color;
        this.element.style.fill = color;
    }
}

// Create the Time instance with the id of your element
// by default we assume this is a standard element, but the options can be set
// ** TimeElement ** 
// timeId = 'time'
// options.format = 24h || 12h
// options.fitfont = false || true
export class TimeElement extends CoreElement {
    constructor({ timeId, fitfont, format, onTick }) {
        super(timeId, { fitfont });
    
        this.options = {
            format: format || preferences.clockDisplay,
            type: 'timeElement',
        };

        if (onTick) {
            this.onTickHandler = onTick;
        }
    }

    deriveTime(dateObject) {
        const currentTime  = (this.options.format === '24h') ? dateObject.getHours() : ((dateObject.getHours() + 11) % 12 + 1);
        const hours = ("0" + currentTime).slice(-2);
        const minutes = ("0" +  dateObject.getMinutes()).slice(-2);
        return `${hours}:${minutes}`;
    }
    
    set(dateObject) {
        try {
            this.element.text = this.deriveTime(dateObject);
        } catch (err) {
            console.error(err);
        }
    }

    onTick(callback) {
        this.onTickHandler = callback;
    }
}

// Create a Date instance that can continually update
// ** DateElement **
// dateId = 'date'
// options.fitfont = false || true
// options.i18n = false || true
export class DateElement extends CoreElement {
    constructor({ dateId, fitfont, i18n, titleCase = true }) {
        super(dateId, { fitfont });

        this.options = {
            i18n: i18n || false,
            type: 'dateElement',
            titleCase: titleCase
        };
    }

    updateRequired(newDate) {
        return this.shortDate !== newDate.toDateString();
    }

    set(dateObject) {
        this.shortDate = dateObject.toDateString();

        let weekDay = DAYS[dateObject.getDay()];
        
        if (this.options.i18n) {
            weekDay = gettext(weekDay);
        }
        
        if (this.options.titleCase) {
            this.element.text = `${weekDay.charAt(0).toUpperCase() + weekDay.substring(1)}, ${dateObject.getDate()}`;
        } else {
            this.element.text = `${weekDay}, ${dateObject.getDate()}`;
        }
    }
}

export default class {
    constructor(timeConfiguration, dateConfiguration) {
        if (timeConfiguration.dateId) {
            console.error('Core expected timeConfiguration in first parameter, but received dateConfiguration instead. - new Core(timeConfiguration, dateConfiguration)');
        }

        if (dateConfiguration.timeId) {
            console.error('Core expected dateConfiguration in second parameter, but received timeConfiguration instead. - new Core(timeConfiguration, dateConfiguration)');
        }

        const dateElement = new DateElement(dateConfiguration);
        const timeElement = new TimeElement(timeConfiguration);

        this.time = timeElement;
        this.date = dateElement;
    }

    initialize() {
        console.info('Initializing core...');
        clock.granularity = 'minutes';

        console.info('Configuring time...');
        const currentDateObject = new Date();
        this.time.set(currentDateObject);
        this.date.set(currentDateObject);

        console.info('Configuring tick listener...');
        clock.addEventListener('tick', (tickEvent) => {
            const { date } = tickEvent;
            this.time.set(date);

            if (typeof this.time.onTickHandler === 'function') {
                this.time.onTickHandler(tickEvent);
            }

            // Update date on date changes
            if (this.date.updateRequired(date)) {
                this.date.set(date);
            }
        });
    }
}
