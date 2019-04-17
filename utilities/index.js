var url = require('url');
function urlToFilename(webUrl) {

const slug = url.parse(webUrl);
    return slug.hostname;
}

module.exports = {
    urlToFilename
}