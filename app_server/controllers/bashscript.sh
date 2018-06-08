#!/bin/bash
# bashscript.sh awardType recipientName signatureURL presenterName awardDate recipientEmail
 echo "launching award creation script"

#create image file from database
node ./app_server/controllers/imageconverter.js $3

#convert image to .jpg if necessary
SIGPNG="./app_server/controllers/signature.png"
if [ -f $SIGPNG ]; then #Convert the png
   echo "Converting signature to jpg"
   node pngtojpg.js
fi

#create latex file from parameters
#node ./app_server/controllers/createtex.js "$1" "$2" "./app_server/controllers/signature.png" "$4" "$5"

#create latex file from parameters. If signature.jpg is not present, use default signature file
SIGJPG="./app_server/controllers/signature.jpg"
if [ -f $SIGJPG ]; then #Convert the png
   node ./app_server/controllers/createtex.js "$1" "$2" "./app_server/controllers/signature.jpg" "$4" "$5"
else
   node ./app_server/controllers/createtex.js "$1" "$2" "./app_server/controllers/samplesignature.jpg" "$4" "$5"
fi

#convert latex file into a pdf
node ./app_server/controllers/converttex.js

#send pdf to recipientEmail
node ./app_server/controllers/mailer.js "$6"

echo "award creation script done"