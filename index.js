const HttpRequest = require('./src/http/req');
const HttpResponse = require('./src/http/res');

const { JsonBody, PlainBody } = require('./src/http/body');

module.exports = {
    HttpRequest,
    HttpResponse,
    JsonBody,
    PlainBody,
};