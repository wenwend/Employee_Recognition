#!/bin/bash
# bashscript.sh awardType recipientName signatureURL presenterName awardDate recipientEmail
 echo "launching award creation script"

#create image file from database
node ./app_server/controllers/imageconverter.js $3

#convert image to .jpg if necessary


#create latex file from parameters
node ./app_server/controllers/createtex.js "$1" "$2" "./app_server/controllers/signature.png" "$4" "$5"

#USE THIS ONCE PNG TO JPG IS IMPLEMENTED
#node ./app_server/controllers/createtex.js "$1" "$2" "./app_server/controllers/signature.jpg" "$4" "$5"


#convert latex file into a pdf
node ./app_server/controllers/converttex.js

#send pdf to recipientEmail
node ./app_server/controllers/mailer.js "$6"

echo "award creation script done"
