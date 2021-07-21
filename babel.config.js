module.exports = api => {
    const isTest = api.env('test');

    // Include ES Modules for Jest
    if (isTest) {
        return {
            presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                        esmodules: true
                    }
                  }
                ]
            ]
        }
    }

    // Add object assign shim
    return {
        presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                    ie: "10"
                },
                modules: false
              }
            ]
        ],
        only: ["src/*.js"],
        plugins: ["@babel/plugin-transform-object-assign"]
    };
};