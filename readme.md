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

## License

MIT © [Brandon Him](https://github.com/brh55/fitbit-core)
