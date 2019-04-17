
function urlToFilename(url) {

    const res = url.replace(/[^\w\s]/gi, '');
    return res
}

module.exports = {
    urlToFilename
}