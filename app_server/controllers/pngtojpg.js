//SOURCE: https://www.npmjs.com/package/png-to-jpeg
//REQUIRES: node package: png-to-jpeg@1.0.1
const fs = require("fs");
const pngToJpeg = require('png-to-jpeg');
 
let buffer = fs.readFileSync(".app_server/controllers/signature.png");
pngToJpeg({quality: 90})(buffer)
.then(output => fs.writeFileSync("./signature.jpg", output));
