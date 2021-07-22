import { JSDOM } from 'jsdom';

const dom = new JSDOM(`
<svg>
    <Text id="date"></Text>
    <Text id="time"></Text>
</svg>
`,{
    contentType: "text/xml"
});

export default class {
    constructor(config) {
        this.dom = dom;
    }
}