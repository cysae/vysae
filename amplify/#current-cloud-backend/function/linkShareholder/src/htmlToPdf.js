var wkhtmltpdf = require('wkhtmltopdf');
var MemoryStream = require('memorystream');

function htmlToPdf(html) {
  wkhtmltopdf(html_utf8, event.options, function(code, signal) {
    var pdf = memStream.read();
    return pdf
  }).pipe(memStream);
}
