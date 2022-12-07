# fitbit-core
[![Travis branch](https://app.travis-ci.com/brh55/fitbit-core.svg?branch=main&status=started)](https://app.travis-ci.com/github/brh55/fitbit-core) [![Coveralls branch](https://img.shields.io/coveralls/brh55/fitbit-core/master.svg)](https://coveralls.io/github/brh55/fitbit-core) [![npm badge](https://img.shields.io/npm/dt/fitbit-core.svg)](https://www.npmjs.com/package/fitbit-core)

> 🌑 A library to handle core functionality for building Fitbit OS watchface

> Note, this is still a work in progress

The purpose of this library is to provide a simple interface to abstract the basic core functionality of a Fitbit watchface (date and time). As a result, you'll be able to manage and render the time and date, all within 2 lines code, allowing you to focus mainly on styling and superset features.

**Functionality**
- Manage and Display Date including i18n / multi-language support
- Manage and Display Time including user's format preferences and updating on ticks.
- Simple interface
- Support custom font through FitFont Rendering

**Future Roadmap**
- multi-line time (hour / minutes)
- Support seconds

### Usage
Create a `Text` or `FitFont` element in your `.view`. Provide that ID to the core class caller, and initialize the core. 

```js
const TimeConfiguration = { timeId: 'time' };
const DateConfiguration = { dateId: 'date' };

const core = new Core(TimeConfiguration, DateConfiguration);
core.initialize();
```

**Example: Coloring Elements**
```js
const core = new Core({ timeId: 'time', dateId: 'date' });
core.initialize();

if (user.clicked) {
    core.time.setColor('deepbluesky');
    core.date.setColor('plum');
}
```

**Example: Fitfont** <br>
*index.view: View GUI File*
```xml
    <svg>
        <use href="#fitfont" id="time">
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
        </use>
        <use href="#fitfont" id="date">
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
            <use href="#fitfont-char"/>
        </use>
    </svg>
```
*your.js: Clockface JS File*
```js
const CustomDateFont = {
    dateId: 'date',
    font: 'Roboto_30',
    halign: 'middle',
    valign: 'start',
    letterspacing: 0
};

const CustomTimeFont = {
    dateId: 'time',
    font: 'Roboto_70',
    halign: 'middle',
    valign: 'start',
    letterspacing: 1
};

const core = new Core(CustomTimeFont, CustomDateFont);
// Time and Date Displayed
core.initialize();

if (someCondition) {
    const TimeElement = core.time.get();
    TimeElement.letterspacing = 3;
    TimeElement.halign = 'end';
}
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

##### onTick
**Type:** `function` <br>
Register a callback that will be executed upon tick (clock update) events.

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

*Note:* `fitbit-core` will use these `msgid` to map across your i18n/po files: `['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']`

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

#### core.time.onTick(onTickHandler)
Configure a onTick handler to be called when the time ticks

## Relevant
This library works well in conjunction with:

- [`fitbit-settings`](https://github.com/brh55/fitbit-settings) - A simple library to handle managing settings

## Used in The Wild
This module is being used for the following watchfaces:

- [Dogee](https://gallery.fitbit.com/details/6359d45c-696f-4867-aa15-08397fa0f3fe) (4.8 ⭐s) - A free dogecoin watchface by Pixels on Ridge

Pixels on Ridge
## License
MIT © [Brandon Him](https://github.com/brh55/fitbit-core)
