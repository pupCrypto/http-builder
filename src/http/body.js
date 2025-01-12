const Builder = require('../builder');
const { EMPTY_STRING } = require('../constants');


class JsonBody extends Builder {
    constructor(obj) {
        super();
        this._body = obj || null;
    }

    asString() {
        if (!this._body) {
            return EMPTY_STRING;
        }
        return JSON.stringify(this._body);
    }
}

class PlainBody extends Builder {
    constructor() {
        super();
        this._body = EMPTY_STRING;
    }

    asString() {
        return this._body;
    }
}



module.exports = {
    JsonBody,
    PlainBody,
};