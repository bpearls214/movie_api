const express = require('express');
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [ {
  title : 'Bridesmaids',
  comedyLevel: 'insanely hilarious'
  },
  {
    title : 'Step Brothers',
    comedyLevel : 'stupidly funny'
  },
  {
    title : 'Wedding Crashers',
    comedyLevel : 'Vince vaugn at his finest'
  },
  {
    title : 'Meet the Parents',
    comedyLevel : 'Really Focking good'
  },
  {
    title : 'Forgetting Sarah Marshell',
    comedyLevel : 'American treasure'
  },
  {
    title : 'Twilight',
    comedyLevel : 'soul sucking'
  },
  {
    title : 'Anchorman',
    comedyLevel : 'Peak Will Ferrell'
  },
  {
    title : 'Titanic',
    comedyLevel : 'People fight over doors ability to support more than one person'
  },
  {
    title : 'Isn\'t It Romantic',
    comedyLevel : 'Cliche mockery FTW'
  },
  {
    title : 'Pitch Perfect',
    comedyLevel : 'Inspo for singing cults worldwide'
  }
]

// GET requests
app.get('/', function (req, res) {
  res.send('Welcome to my app!');
});
app.get('/secreturl', function (req, res) {
  res.send('This is a secret url with super top-secret content.');
});
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

// serve static files
app.use(express.static('public'));

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080);
