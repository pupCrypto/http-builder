class Builder {
    constructor() {
        if (new.target === Builder) {
            throw new TypeError('Cannot construct Builder instances directly');
        }
    }
    
    /**
     * Returns a Buffer object
     * @returns {Buffer}
     */
    asBuffer() {
        return Buffer.from(this.asString());
    }

    /**
     * Returns a string
     * @returns {string}
     */
    asString() {
        throw new Error('Not Implemented');
    }
}

module.exports = Builder;
