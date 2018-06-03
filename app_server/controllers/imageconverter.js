//SOURCE: https://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk

imageBase64 = process.argv[2]; //This is the image as a string received as a parameter

var imageData = imageBase64.replace(/^data:image\/png;base64,/, "");  //Remove header data

require("fs").writeFile("./app_server/controllers/signature.png", imageData, 'base64', function(err) {
  console.log(err);
});
