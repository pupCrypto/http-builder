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
    toBuffer() {
        return Buffer.from(this.toString());
    }

    /**
     * Returns a string
     * @returns {string}
     */
    toString() {
        throw new Error('Not Implemented');
    }
}

module.exports = Builder;
