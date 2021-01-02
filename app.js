const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));



app.get('/', function(req, res) {

  res.sendFile(__dirname + "/index.html");


});
app.post('/', function(req, res) {
  var city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=a03153119449c0b52897ab6007d1ab55&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {
      var weatherData = JSON.parse(data);
      var iconURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      var temperature = weatherData.main.temp;
      res.write("<h1>Current temperature in "+city+ "is " + temperature + "</h1></hr>");
      res.write("<h2>current weather condition is  " + weatherData.weather[0].description + "</h2><hr>");
      res.write("<img src=" + iconURL + ">");
      res.send();



    });

  });


});

// var city=Pune;


app.listen(3000, function() {
  console.log("server is running");
});
