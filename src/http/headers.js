const Builder = require('../builder');
const { HTTP_LINE_BREAK } = require('../constants');


class Header extends Builder {
    /**
     * 
     * @param {String} name 
     * @param {String} value 
     */
    constructor(name, value) {
        super();
        this.name = name.toLowerCase();
        this.value = value;
    }

    asString() {
        return `${this.name}: ${this.value}\r\n`;
    }
}

class Headers extends Builder {
    constructor() {
        super();
        this._headers = [];
    }
    /**
     * 
     * @param {string} name 
     * @param {string} value 
     * @returns 
     */
    setHeader(name, value) {
        const header = this.findHeader(name);
        if (header) {
            return header.value = value;
        }
        this._headers.push(new Header(name, value));
    }
    
    findHeader(name) {
        return this._headers.find((header) => header.name === name.toLowerCase());
    }
    asList() {
        return Array.from(this._headers);
    }
    asString() {
        return this._headers.map(header => header.asString()).join(HTTP_LINE_BREAK);
    }
}

module.exports = {
    Header,
    Headers,
};
