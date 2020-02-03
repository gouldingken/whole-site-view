var Jimp = require('jimp');
const async = require('async');

const generateImage = (h, columns, scale, name, callback) => {
    let height = Math.round(scale * h);
    let width = Math.round(scale * columns.length * 600);
    let columnWidth = Math.round(scale * 600);
    new Jimp(width, height, 0xFFFFFFFF, (err, image) => {
        const calls = [];
        let x = 0;
        columns.forEach((column, i) => {
            let y = 0;

            const elements = column.elements().slice();
            elements.sort(() => Math.random() - 0.5);//basic shuffle
            // console.log('Column' + i + ' : ' + column.elements().length);
            elements.forEach((element, i) => {
                const w = Math.round(element.dimensions.width * scale);
                const h = Math.round(element.dimensions.height * scale);
                const dims = {x, y};
                calls.push((done) => {
                    // setTimeout(() => {
                    //     console.log(dims, element.file);
                    //     done();
                    // }, 10)
                    Jimp.read('./images/' + element.file, (err, img) => {
                        if (err) {

                        }
                        img.resize(w, h);
                        image.blit(img, dims.x, dims.y);
                        console.log('Blit ' + dims.x + ',' + dims.y + ' : ' + element.file);
                        done();
                    });
                });
                y += h;
            });

            x += columnWidth;
        });

        async.parallelLimit(calls, 4, () => {
            console.log('ALL DONE');
            image.write(name, callback);
        });
    });
};

const generateColumns = (height, columns, step, scale) => {
    const calls = [];

    for (let i = 0; i < columns.length; i += step) {
        calls.push((done) => {
            console.log('================== COLUMN ' + i);
            generateImage(height, columns.slice(i, i + step), scale, 'columns-' + i + '.png', done);
        });
    }

    async.parallelLimit(calls, 1, () => {
        console.log('ALL all done');
    });
};

module.exports = generateColumns;