var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Models
Genre = require('./models/genre');
Book = require('./models/book');

// Connecting to mongoose
mongoose.connect('mongodb://localhost/booklibrary');
var db = mongoose.connection;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/about', function (req, res) {
  res.send('<h1>About page</h1>');

});

app.get('/contact', function (req, res) {
  res.send('Contact Page');
});

// BookStore API
// GET genres
app.get('/api/genres', function(req,res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

// GET books
app.get('/api/books', function(req,res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    })
});

// GET a single book
app.get('/api/books/:_id', function(req,res){
    Book.getBookById(req.params._id, function( err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
})


app.listen(3000);
console.log('Running on port 3000..');