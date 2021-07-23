let clock = {};

clock = {
    registeredHandlers: {
        open: [],
        message: []
    },
    addEventListener: jest.fn((eventName, cb) => {
        const handlers = clock.registeredHandlers[eventName] || [];
        handlers.push(cb);
        clock.registeredHandlers[eventName] = handlers;
    }),
    emitTick: (date) => {
        clock.registeredHandlers['tick'].forEach((handler) => {
            handler({ date });
        });
    },
    granularity: 'minutes',
    send: jest.fn(),
    readyState: 1,
    OPEN: 1
}

module.exports = clock;
