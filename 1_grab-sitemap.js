const fs = require('fs');
const sitemaps = require('sitemap-stream-parser');
const {siteMap} = require('./settings');

const urls = [];
sitemaps.parseSitemaps(siteMap, (page_url) => {
    urls.push(page_url);
}, function (err, sitemaps) {
    const filePath = './data/interim/urls.json';
    fs.writeFile(filePath, JSON.stringify(urls, null, 2), function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Saved ' + filePath);
        }
    });
});