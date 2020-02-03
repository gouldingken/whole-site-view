module.exports = {
    siteRoot: "https://www.sasaki.com/",
    siteMap: "https://www.sasaki.com/sitemap.xml",
    imageWidth: 1200,//the size of the browser window
    scaleFactor: 0.5,//the scale factor to apply to the image. Actual output size is imageWidth * scaleFactor
    //when capturing full height images of an entire page, it can be helpful to apply CSS overrides - e.g. if a class uses a % of vh, we can override with a fixed pixel value
    cssOverride: `
        div.page { 
            padding-top: 60px !important; 
        }
        div.post-single {
            padding-top: 60px !important; 
        }
        div.person-single {
            padding-top: 60px !important; 
        }
        div.project-single {
            padding-top: 60px !important; 
        }`,
    packedHeight: 39500,//the pixel height for the output image (determines final aspect ratio)
    columnLimit: 21,//limit per output image (used to manage file size and memory)
    outputScale: 3 / 4,//scale factor applied when saving final image
};