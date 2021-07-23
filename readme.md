# fitbit-core
[![Travis branch](https://img.shields.io/travis/brh55/fitbit-core/main.svg?style=flat-square)](https://travis-ci.org/brh55/fitbit-core) [![Coveralls branch](https://img.shields.io/coveralls/brh55/fitbit-core/master.svg?style=flat-square)](https://coveralls.io/github/brh55/fitbit-core) [![npm badge](https://img.shields.io/npm/dt/fitbit-core.svg?style=flat-square)](https://www.npmjs.com/package/fitbit-core)

> 🌑 A library to handle core functionality for building Fitbit OS watchface

> Note, this is still a work in progress

The purpose of this library is to provide a simple interface to abstract the basic core functionality of a Fitbit watchface (date and time). As a result, you'll be able to manage and render the time and date, all within 2 lines code, allowing you to focus mainly on styling and superset features.

**Functionality**
- Manage and Display Date including i18n / multi-language support
- Manage and Display Time including user's format preferences and updating on ticks.
- Simple interface
- Support custom font through FitFont Rendering

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

**Example: Fitfont**
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

## Relevant
This library works well in conjunction with:

- `fitbit-settings` - A simple library to handle managing settings

## License
MIT © [Brandon Him](https://github.com/brh55/fitbit-core)
