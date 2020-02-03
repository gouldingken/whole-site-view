const fs = require('fs');
const sizeOf = require('image-size');
const async = require('async');
const packingAlgo = require('./packingAlgo.js');
const imageColumns = require('./imageColumns.js');
const {packedHeight, columnLimit, outputScale} = require('./settings');

const getSizes = (callback) => {
    fs.readdir('./images', function (err, items) {
        console.log(items);
        const sizes = [];
        const tasks = [];
        for (let i = 0; i < items.length; i++) {
            tasks.push((done) => {
                sizeOf('./images/' + items[i], function (err, dimensions) {
                    sizes.push({file: items[i], dimensions});
                    done();
                });
            });
        }

        async.parallelLimit(tasks, 100, () => {
            console.log('ALL DONE');
            callback(sizes);
        });
    });
};
getSizes((sizes) => {
    // console.log(sizes);
    let max = 0;
    sizes.forEach((c, i) => {
        max = Math.max(max, c.dimensions.height);
    });
    console.log('MAX: ' + max);
    const height = packedHeight;
    const packing = packingAlgo(30, height, (c) => c.dimensions.height);
    const buckets = packing.fitBlocks(sizes);
    console.log('Num buckets ' + buckets.length);
    console.log(height + ' x ' + buckets.length * sizes[0].dimensions.width);
    imageColumns(height, buckets, columnLimit, outputScale);
});
