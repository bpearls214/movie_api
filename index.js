const express = require('express');
  morgan = require('morgan'),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

mongoose.connect('mongodb://localhost:27017/cineMeDB', {useNewUrlParser: true});

app.use(bodyParser.json());

app.use(morgan('common'));

// GET requests
// get a list of all top movies
app.get('/movies', (req, res) => {
  Movies.find().then(movies => res.json(movies));
});

// get movie info by movie title
app.get('/movies/:Title', function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// get genre info by genre name
app.get('/genres/:Name', function(req, res) {
  Genres.findOne({ Name : req.params.Name })
  .then(function(genre) {
    res.json(genre)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get director info by director name
app.get('/directors/:Name', function(req, res) {
  Directors.findOne({ Name : req.params.Name })
  .then(function(director) {
    res.json(director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get list of all users
app.get('/users', function(req,res) {
  Users.find ()
  .then(function(users) {
    res.status(201).json(users)
  })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get full user info by username
app.get('/users/:Username', function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// PUT requests
// update users information
app.put('/users/:Username', function (req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username },
  { $set :
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
      Address: {
        Street: req.body.Street,
        City: req.body.City,
        State: req.body.State
      }
  }},
  { new : true }, //this line is to make sure updated doc is returned
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

// POST requests
// adds a user
/* Anticipated JSON format:
{
  ID : Integer,
  Username : String,
  Password : String,
  Email : String,
  Address : {
  Street : String,
  City : String,
  State : String
}
  Birthday : Date
} */
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + " already exists!");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        Address: {
          Street: req.body.Street,
          City: req.body.City,
          State: req.body.State
        }
      })
      .then(function(user) {res.status(201).json(user)
  })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//adds movie to favorites for user
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate(
    { Username : req.params.Username },
    {$push : { SavedMovies : req.params.MovieID } },
    {new : true }, // ensures updated doc is returned
    function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

// DELETE requests
// deletes a movie from a users favorites by username
app.delete('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull : { SavedMovies : req.params.MovieID } },
    { new : true }, //ensures updated doc is returned
    function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
  });

// deletes a user by username
app.delete('/users/:username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username})
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


// serve static files
app.use(express.static('public'));

// error handling


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
