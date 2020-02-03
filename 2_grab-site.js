const captureWebsite = require('capture-website');
const async = require('async');
const {siteRoot, cssOverride, scaleFactor, imageWidth} = require('./settings');

const urls = require('./data/interim/urls');

const pathStart = siteRoot.length;
const getname = (url) => {
    const part = url.substr(pathStart);
    return part.split('/').join('_');
};

const tasks = [];
const items = urls.map((url) => [url, getname(url)]);
items.forEach(([url, filename], i) => {
    tasks.push((done) => {
        captureWebsite.file(url, `./images/${filename}.png`, {
            width:imageWidth,
            scaleFactor: scaleFactor,
            fullPage: true,
            overwrite: true,
            disableAnimations: true,
            delay: 1,
            styles: [
                cssOverride
            ]
        }).then(() => {
            console.log(`${i} / ${items.length} -- saved ${filename}`);
            done();
        });
    });
});

async.parallelLimit(tasks, 1, () => {
    console.log('ALL DONE');
});