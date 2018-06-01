#!/bin/bash
# bashscript.sh awardType recipientName signatureURL presenterName awardDate recipientEmail
echo "launching script"
echo $1 #awardType    
echo $2 #recipientName
echo $3 #signatureURL
echo $4 #presenterName
echo $5 #awardDate
echo $6 #senderEmail
echo $7 #recipientEmail
node ./app_server/controllers/createtex.js "$1" "$2" "$3" "$4" "$5"
node ./app_server/controllers/converttex.js
node ./app_server/controllers/mailer.js "$6"
echo "script done"
