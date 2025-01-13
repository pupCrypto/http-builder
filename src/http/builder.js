const Builder = require('../builder');


class HttpBuilder extends Builder {
    static parseString(data) {
        throw new Error('Not Implemented');
    }

    static parseObj(data) {
        throw new Error('Not Implemented');
    }
}

module.exports = {
    HttpBuilder,
}