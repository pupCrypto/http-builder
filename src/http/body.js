const { HttpBuilder } = require('./builder');
const { EMPTY_STRING, HTTP_LINE_BREAK } = require('../constants');


class JsonBody extends HttpBuilder {
    constructor(obj) {
        super();
        this._body = obj || null;
    }

    toString() {
        if (!this._body) {
            return EMPTY_STRING;
        }
        return JSON.stringify(this._body);
    }
    static parseString(data) {
        return new JsonBody(JSON.parse(data.split(HTTP_LINE_BREAK).at(-1)));
    }
}

class PlainBody extends HttpBuilder {
    constructor(data = EMPTY_STRING) {
        super();
        this._body = data;
    }

    toString() {
        return this._body;
    }
    static parseString(data) {
        return new PlainBody(data.split(HTTP_LINE_BREAK).at(-1));
    }
}



module.exports = {
    JsonBody,
    PlainBody,
};