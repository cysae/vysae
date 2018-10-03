var wkhtmltopdf = require('wkhtmltopdf');
var MemoryStream = require('memorystream');

const memStream = new MemoryStream();

function htmlToPdf(html, callback) {
  wkhtmltopdf(html, {}, function(code, signal) {
    var pdf = memStream.read();

    callback(pdf)
  }).pipe(memStream);
}

module.exports = htmlToPdf
