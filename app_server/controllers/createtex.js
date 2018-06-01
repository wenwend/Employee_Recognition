var fs = require('fs');

//node createtex.js awardType recipientName signatureURL presenterName awardDate

//Process the arguments
// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);
// console.log(process.argv[3]);
// console.log(process.argv[4]);
// console.log(process.argv[5]);
// console.log(process.argv[5]);

//DEBUGGING VALUES
// awardType = "Employee of the Year";
// recipientName = "Jon Reynolds";
// signatureURL = "./signature.jpg";
// presenterName = "Some person";
// awardDate = "05/13/2018";

awardType = process.argv[2];
recipientName = process.argv[3];
signatureURL = process.argv[4];
presenterName = process.argv[5];
awardDate = process.argv[6];

var fileContents = '';

fileContents = '\\documentclass{letter}\n';
fileContents += '\n';
fileContents += '%%% PACKAGES\n';
fileContents += '\\usepackage{lscape,graphicx}\n';
fileContents += '\n';
fileContents += '%%% DOCUMENT SIZE AND MARGINS\n';
fileContents += '\\usepackage{geometry}\n';
fileContents += ' \\geometry{\n';
fileContents += ' letterpaper,\n';
fileContents += ' left=0.75in,\n';
fileContents += ' right=0.75in,\n';
fileContents += ' top=1in,\n';
fileContents += ' bottom=1in\n';
fileContents += ' }\n';
fileContents += '\n';
fileContents += '%%% DOCUMENT\n';
fileContents += '\\begin{document}\n';
fileContents += '\\thispagestyle{empty}\n';
fileContents += '\\begin{landscape}\n';
fileContents += '\\begin{center}\n';
fileContents += '\n';
fileContents += '%%% AWARD TITLE\n';
fileContents += '\\Huge \\textbf{' + awardType + '\\\\[0.5in]} \\par\n';
fileContents += '\n';
fileContents += '%%% RECIPIENT\n';
fileContents += '\\large \\textbf{Awarded To}\n';
fileContents += '\\Huge \\textbf{\\\\' + recipientName + '\\\\[0.4in]} \\par\n';
fileContents += '\\large \\textbf{On ' + awardDate + '}\n';
fileContents += '\n';
fileContents += '%%% SIGNATURE AND PRESENTER\n';
fileContents += '\\includegraphics[width=4in, height=2in]{' + signatureURL + '}\\\\[1mm]\n';
fileContents += '\\vspace{-2cm}{\\rule[0.6in]{4in}{.1pt}}\n';
fileContents += '\\vspace{-1.5cm}{\\fontsize{12}{14}\\selectfont \\textbf{\\\\[.1mm]' + presenterName + '}}\n';
fileContents += '\n';
fileContents += '\\end{center}\n';
fileContents += '\\end{landscape}\n';
fileContents += '\\end{document}';


//SOURCE: https://www.w3schools.com/nodejs/nodejs_filesystem.asp
fs.writeFile('./app_server/controllers/award.tex', fileContents, function (err) {
  if (err) throw err;
  console.log('Award Created!');
});