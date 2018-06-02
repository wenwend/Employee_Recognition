imageID = process.argv[2]; //This is the id of the image received as a parameter

//Use imageID to query the database
var imageBase64 = //Data from query data:image/png;base64,iVBORw0KGgoAAAA....



var base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");

require("fs").writeFile("./app_server/controllers/.png", base64Data, 'base64', function(err) {
  console.log(err);
});
