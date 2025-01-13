const { HttpBuilder } = require('./builder');
const { HTTP_LINE_BREAK, EMPTY_STRING } = require('../constants');


class Header extends HttpBuilder {
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

    toString() {
        return `${this.name}: ${this.value}`;
    }
    static parseString(data) {
        const [name, value] = data.split(':');
        return new Header(name.trim(), value.trim());
    }
}

class Headers extends HttpBuilder {
    /**
     * 
     * @param {Array<Header>} headers 
     */
    constructor(headers = []) {
        super();
        this._headers = headers;
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
    toList() {
        return Array.from(this._headers);
    }
    toString() {
        if (this._headers.length === 0) {
            return EMPTY_STRING;
        }
        return this._headers.map(header => header.toString()).join(HTTP_LINE_BREAK) + HTTP_LINE_BREAK;
    }

    static parseString(data) {
        let emptyStringEncountered = false;
        const headersString = data.split(HTTP_LINE_BREAK).filter((line, idx) => {
            if (line === EMPTY_STRING) {
                emptyStringEncountered = true;
            }
            return idx > 0 && !emptyStringEncountered;
        });
        return new Headers(headersString.map(Header.parseString));
    }
}

module.exports = {
    Header,
    Headers,
};
