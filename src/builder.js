class Builder {
    constructor() {
        if (new.target === Builder) {
            throw new TypeError('Cannot construct Builder instances directly');
        }
    }
    
    // TODO: add doc-string
    asBuffer() {
        throw new Error('Not implemented');
    }
}

module.exports = Builder;
