var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'111111',
  database:'opentutorials'
});
db.connect();
 
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
    var smoked = `
    <!doctype html>
    <html>
    <head>
      <title>SMOKING TIME STAMP</title>
      <meta charset="utf-8">
    </head>
    <body>
      <form action="addsmoked" target="POST">
      <input type="submit" value="smoked">
      </form>
    </body>
    </html>
    `
    db.query(`SELECT * FROM smoked`,function(error,results){
      var data = ``;
      var i = 0;
      while(i<results.length){
        var data += `
        <tr>
        <td>${results[i].id}</td>
        <td>${results[i].time}</td>
        </tr>
        `;
        i++;
      }
      var table = `
      <table>
      <thead>
      <tr><td>횟수</td><td>시간</td></tr>
      </thead>
      ${data}
      </table>
      `;
    }
      response.writeHead(200);
      response.end(table);
    } else {

    }
});
app.listen(3000);