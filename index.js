var Uber = require('node-uber');
var express = require('express');
var app = express();

var options = {
  sandbox: true,
  client_id: 'un81qt5z-8T8MMtvv_fZUiSLGdzpX5Ss',
  client_secret: 'u4htZMSmIpqjphfpoA8baH4ol-v3FJHRehEz_68w',
  server_token: 'a5My_3bOOscgixm_fLfiTUa0aMxXPTuQV8puyu7F',
  redirect_uri: 'http://localhost:3000/callback',
  name: 'manish',

}

var uber = new Uber(options);

app.get('/', function (req, res) {
  // Kick off the authentication process
  var scope = ['request'];
  res.redirect(uber.getAuthorizeUrl(scope, 'http://localhost:3000/callback'));
});

app.get('/callback', function (req, res) {
  uber.authorization ({grantType: 'authorization_code', authorization_code: req.query.code}, function (err, access_token) {
    // Now we've got an access token we can use to book rides.
    // Access tokens expires in 30 days at whichpoint you can refresh.
    // You should save this token
    // More info: https://developer.uber.com/docs/authentication
    uber.access_token = access_token;
    res.send('Got an access token! Head to /book to initiate an ride request.');
  });
});

app.get('/api/estimates/address', function(request, response) {
  // extract the query from the request URL
  uber.estimates.getPriceForRouteByAddressAsync(
    '1455 Market St, San Francisco, CA 94103, US',
    '2675 Middlefield Rd, Palo Alto, CA 94306, US')
  .then(function(res) {
   console.log(res); 
   response.send(res);
 })
  .error(function(err) { console.error(err);  
  });
});

app.get('/api/estimates/route', function(request, response) {
  // extract the query from the request URL
  uber.estimates.getPriceForRouteAsync(3.1357169, 101.6881501, 3.0833, 101.6500)
  .then(function(res) { 
    response.send(res);
    console.log(res); 
  })
  .error(function(err) { console.error(err); });
});

app.get('/api/estimates/location', function(request, response) {
  // extract the query from the request URL
  uber.estimates.getETAForAddressAsync('455 Market St, San Francisco, CA 94103, US')
  .then(function(res) { 
    response.send(res);
    console.log(res); 
  })
  .error(function(err) { console.error(err); });

});

app.get('/api/products', function(request, response) {
  // extract the query from the request URL
  uber.products.getAllForAddressAsync('1455 Market St, San Francisco, CA 94103, US')
  .then(function(res) {
   response.send(res); 
   console.log(res); 
 })
  .error(function(err) { console.error(err); });
});

app.get('/api/products/location', function(request, response) {
  // extract the query from the request URL
  uber.products.getAllForLocationAsync(3.1357169, 101.6881501)
  .then(function(res) {
   response.send(res);  
   console.log(res);
 })
  .error(function(err) { console.error(err); });
});

app.get('/api/product/id', function(request, response) {
  // extract the query from the request URL
  uber.products.getByIDAsync('d4abaae7-f4d6-4152-91cc-77523e8165a4')
  .then(function(res) { 
    response.send(res);
    console.log(res);
  })
  .error(function(err) { console.error(err); });

});



app.listen(3000, function () {
  console.log('Listening on port 3000!');
});