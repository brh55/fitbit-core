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
    emitMockEvent: (eventName, data) => {
        clock.registeredHandlers[eventName].forEach((handler) => {
            handler({data});
        });
    },
    granularity: 'minutes',
    send: jest.fn(),
    readyState: 1,
    OPEN: 1
}

module.exports = clock;
