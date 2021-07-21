import FsSettings from './src/app';
import clock from 'clock';

// 
// const TimeConfiguration = { timeId: 'time', fitfont: TimeFont };
// const DateConfiguration = { dateId: 'date', fitfont: DateFont };

// const core = new Core(TimeConfiguration, DateConfiguration);
// core.initialize();

describe('fitbit-settings/app', () => {
    afterEach(() => {
    });

    test('Time element', () => {
        const settings = new FsSettings(initialSettings, { filePath: 'file-path.cbor'});
    });
});