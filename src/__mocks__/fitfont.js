export class FitFont {
    constructor() {
        this.mock = jest.fn();
        this.textMock = jest.fn();
    }

    set text(val) {
        this.textMock(val);
    }

    get text() {
        return this.textMock;
    }
}
