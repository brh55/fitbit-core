# fitbit-core

> 🏴‍☠️ A library to handle core functionality for building Fitbit OS watchface

> This is in progress

**Functionality For Now**
- Handles Date Functionality
- Handles Time Functionality
- Automatically Update Date/Time on Ticks
- Support FitFont Rendering

### Usage
```js
const TimeConfiguration = { timeId: 'time', fitfont: TimeFont };
const DateConfiguration = { dateId: 'date', fitfont: DateFont };

const core = new Core(TimeConfiguration, DateConfiguration);
core.initialize();
```

## fitbit-core/app

### Core(TimeConfiguration, DateConfiguration)
**Type:** `class`<br>
**Usage:** `new Core(TimeConfiguration, DateConfiguration)`

#### TimeConfiguration
**Type:** `object`<br>
Configuration for the element used to display the **time**.

##### timeId *(required)*
**Type:** `string`<br>
ID of the Time Element

##### fitfont
**Type:** `object`<br>
Fitfont configuration, this will render the element as a Fitfont element instead. ID will be populated with the `timeId`.

##### format
**Type:** `enum` ("12h"/"24h")<br>
Configure which format will the clock display.

#### DateConfiguration
**Type:** `object`<br>
Configuration for the element used to display the **date**.

##### dateId *(required)*
**Type:** `string`<br>
ID of the Date Element

##### fitfont
**Type:** `object`<br>
Fitfont configuration, this will render the element as a Fitfont element instead. ID will be populated with the `dateId`.

##### i18n
**Type:** `boolean`<br>
Set to true to automatically reference your PO files for translations. Days are all lowercase.

## Core Instance API
### core.date
**Type:** `Class Instance`<br>

#### core.date.set(dateObject)
Parses the date object and sets the element text value to the date.

#### core.date.setColor(colorString)
Sets the Date element color to the value inputted.

### core.time
**Type:** `Class Instance`<br>

#### core.time.set(dateObject)
Parses the date object and sets element text value to the time.

#### core.time.setColor(colorString)
Sets the Time element color to the value inputted.

## License

MIT © [Brandon Him](https://github.com/brh55/fitbit-core)
