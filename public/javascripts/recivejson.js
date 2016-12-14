var express = require("express");
var myParser = require("body-parser");
var app = express();

  app.use(myParser.urlencoded({extended : true}));
  app.post("/sendmessage", function(request, response) {
      console.log(request.body.yourFieldName); 
      response.send("Message received.");
      response.end();
});

app.listen(8080);