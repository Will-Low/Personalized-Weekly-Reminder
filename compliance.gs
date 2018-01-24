function evaluate() {
  var ss = SpreadsheetApp.openById("INSERT YOUR RESPONSE SHEET URL HERE").getActiveSheet();
  var dataRange = ss.getDataRange();
  var values = dataRange.getValues();
  var numberOfRows = dataRange.getNumRows();
  var compliantSubs = []; // subs = service subscribers, compliant = completed the task within the past week
  var nonCompliantSubs = [];
  var today = new Date();
  for (var i = numberOfRows; i > 1; i--){
    var loggedDate = values[i-1][0];
    if (values[i-1][1] == ""){
      continue;
    }
    // Checking if email is a compliantSub
    if (compliantSubs.indexOf(values[i-1][1]) != -1){
      continue;
    }

    // Compiling list of compliantSubs so loop skips those already compliant
    if (loggedDate.setDate(loggedDate.getDate() + 7) >= today){
      compliantSubs.push(values[i-1][1]);
    }

    // Compiling list of nonCompliantSubs to receive emails
    else{
      if (nonCompliantSubs.indexOf(values[i-1][1]) == -1) // Checking to make sure the email isn't already in the nonCompliantSub list
      {
        nonCompliantSubs.push(values[i-1][1]);
      }
    }
  }

  for (var j = 0; j < nonCompliantSubs.length; j++){
    MailApp.sendEmail({
       to: nonCompliantSubs[j],
       subject: "REMINDER TO DO ______",
       htmlBody: "This is your weekly reminder to _________\
                 <p>Please document when you've done so here:<p>\
                 URL TO THE GOOGLE FORM IN QUESTION<p>Have a good week!",
    });
  }
}
