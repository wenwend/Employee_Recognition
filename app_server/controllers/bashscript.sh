#!/bin/bash
# bashscript.sh awardType recipientName signatureURL presenterName awardDate recipientEmail
 echo "launching award creation script"
# echo $1 #awardType    
# echo $2 #recipientName
# echo $3 #signatureURL
# echo $4 #presenterName
# echo $5 #awardDate
# echo $6 #recipientEmail
node ./app_server/controllers/createtex.js "$1" "$2" "$3" "$4" "$5"
#echo "current directory"
#ls
#echo "./app_server/controllers"
#ls ./app_server/controllers
#echo "root directory"
#ls ../../
#cat ./app_server/controllers/award.tex
pdflatex ./app_server/controllers/award.tex
#node ./app_server/controllers/converttex.js
#ls
node ./app_server/controllers/mailer.js "$6"
echo "award creation script done"
