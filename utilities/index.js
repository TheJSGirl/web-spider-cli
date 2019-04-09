function urlToFilename(url) {

    const res = url.replace(/[^\w\s]/gi, '');
    console.log("res----", res)
    return res
}

module.exports = {
    urlToFilename
}