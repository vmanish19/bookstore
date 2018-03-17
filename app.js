var express = require('express');
var app = express();
var bodyParser = require('body-Parser');
var mongoose = require('mongoose');

Genre = require('./models/genre');
Book = require('./models/book');


// Connect to Mongooose

mongoose.connect('mongodb://localhost/bookstore',{ useMongoClient: true });
 var db =  mongoose.connection;

// app.get('/', function( req ,res){

//   res.sendFile(path.join(__dirname+'/views/index.html'));
// });

app.get('/', function( req ,res){

request.get('http://some.server.com/', {
  'auth': {
    'user': 'username',
    'pass': 'password',
    'sendImmediately': false
  }
});

});

app.get('/product', function( req ,res){
  res.sendFile(__dirname + '/views/product.html');
});

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){

		if (err){

			throw err;
		}

		res.json(genres);	

	});
});


app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){

		if (err){

			throw err;
		}

		res.json(books);	

	});
});



app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id , function(err, book){

		if (err){

			throw err;
		}

		res.json(book);	

	});
});



app.listen(3001);
console.log('start');