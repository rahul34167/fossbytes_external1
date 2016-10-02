var express = require('express');
var app = express();
var fs = require("fs");
var http = require('http');
var request = require('request');
//var apiurl =  "/wiki/Special:ApiSandbox#action=query&prop=extracts&format=json&exintro=&titles=";

app.get('/', function(req, res){
  res.send('hello world');
});



app.get('/callWiki', function(req, res) {
  
  var search_string = req.query.search_query;
  var parsed_json="";

  console.log("search string is" + search_string);

      request.get({ url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+search_string+"&limit=2&format=json" },function(error, response, body) { 
              if (!error && response.statusCode == 200) { 

                  //res.json(body);
                  parsed_json=JSON.parse(body);
                 // res.send(parsed_json[2]);
                  var result_string =  JSON.stringify(parsed_json[2]);
                 // var final_string = result_string.substring(1,result_string.length-1); 

                  console.log(result_string);
                  var result_notfound = "Result not found. Try looking for something else";
                  var res_string = result_string.replace(/"/g,"");
                 // var global=JSON.parse("["+final_string+"]");
                  
                  var result = [];
                  if(res_string == "")
                  result.push({text: result_notfound});
                  else
                  result.push({text: res_string}); 
                    
                  res.contentType('application/json');
                  res.send(result);

                 } 
             }); 
  
});




var server = app.listen(5001, function () {

   var host = server.address().address
   console.log(host);
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

module.exports = app;