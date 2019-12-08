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

// authentication and authorization
var auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

// cross-origin resource sharing
const cors = require('cors');
app.use(cors());

var allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ //if a specific isn't found on the list of allowed origins
      var message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
      return callback (new Error(message), false);
    }
    return callback(null, true);
  }
}));

// server-side validation
const { check, validationResult } = require('express-validator');

// GET requests

// GET list of movies (with auth)
app.get("/movies", passport.authenticate('jwt', { session: false
}), function(req, res) {
  Movies.find()
  .then(function(movies) {
    res.status(201).json(movies);
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// GET movie info by title (with auth)
app.get('/movies/:Title', passport.authenticate('jwt', {session: false
}), function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// GET genre info by genre name (with auth)
app.get('/genres/:Name', passport.authenticate('jwt', {session: false
}), function(req, res) {
  Genres.findOne({ Name : req.params.Name })
  .then(function(genre) {
    res.json(genre)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// GET director info by director name (with auth)
app.get('/directors/:Name', passport.authenticate('jwt', {session: false
}), function(req, res) {
  Directors.findOne({ Name : req.params.Name })
  .then(function(director) {
    res.json(director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// GET list of all users (with auth)
app.get('/users', passport.authenticate('jwt', {session: false
}), function(req,res) {
  Users.find ()
  .then(function(users) {
    res.status(201).json(users)
  })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET user info by username (with auth)
app.get('/users/:Username', passport.authenticate('jwt', {session: false
}), function(req, res) {
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
// Update user info by username (with auth)
app.put('/users/:Username', passport.authenticate('jwt', {session: false
}), function (req, res) {
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
// Creates new user
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
app.post('/users',
  // validation logic
  [check('Username', 'Username of at least 5 characters is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumberic characters - not allowed').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],
function(req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }

  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + " already exists!");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: hashedPassword,
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

// Adds new movie to users Saved Movies (with auth)
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
// DELETES Saved Movie by username (with auth)
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false
}), function(req, res) {
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

// DELETES user by username (with auth)
app.delete('/users/:username', passport.authenticate('jwt', {session: false
}), function(req, res) {
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
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log('Your app is listening on port 3000');
});
