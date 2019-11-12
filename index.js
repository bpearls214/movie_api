const express = require('express');
  morgan = require('morgan'),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

app.use(morgan('common'));

let TopMovies = [
{
  title : 'Bridesmaids',
  description: 'Competition between the maid of honor and a bridesmaid, over who \
   is the bride\'s best friend, threatens to upend the life of an out-of-work \
   pastry chef.',
  comedyLevel: 'insanely hilarious',
  genre : 'Comedy',
   director : 'Paul Feig'
  },
  {
    title : 'Step Brothers',
    description : 'Two co-dependent high school seniors are forced to deal \
    with separation anxiety after their plan to stage a booze-soaked party goes awry.',
    comedyLevel : 'stupidly funny',
    genre : 'Comedy',
     director : 'Greg Mottola'
  },
  {
    title : 'Meet the Parents',
    description : 'Male nurse Greg Focker meets his girlfriend\'s parents before \
    proposing, but her suspicious father is every date\'s worst nightmare.',
    comedyLevel : 'Really Focking good',
    genre : 'Comedy',
     director : 'Jay Roach'
  },
  {
    title : 'Forgetting Sarah Marshell',
    description : 'Devastated Peter takes a Hawaiian vacation in order to deal with \
    the recent break-up with his TV star girlfriend, Sarah. Little does he know, \
    Sarah\'s traveling to the same resort as her ex - and she\'s \
    bringing along her new boyfriend.',
    comedyLevel : 'American treasure',
    genre : 'Romantic Comedy',
     director : 'Nicholas Stroller'
  },
  {
    title : 'Twilight',
    description : 'Bella Swan moves to Forks and encounters Edward Cullen, a gorgeous boy with a secret.',
    comedyLevel : 'soul sucking',
    genre :  'Drama',
    director : 'Catherine Hardwicke'
  },
  {
    title : 'Titanic',
    description : 'A seventeen-year-old aristocrat falls in love with a kind but \
    poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    comedyLevel : 'People fight over doors ability to support more than one person',
    genre : 'Drama',
    director : 'James Cameron'
  }
];

let Genres = [
  {
  name : 'Drama',
  description : 'Should contain numerous consecutive scenes of characters portrayed\
  to effect a serious narrative throughout the title\. This can be exaaggerated\
  upon to produce a melodrama\. Subjective\.',
  comedyLevel: 'potential humor undercurrents'
},
{
  name : 'Romantic Comedy',
  description : 'A romantic comedy film should just be classified as comedy\
  however society likes to classify things that don\'t always require a new \
  classification.  Romantic comedies typically have an undercurrent or secondary \
  story line that is romantic in nature, making these comedies "Romantic Comedies" \
  and often branded as comedy for females.',
  comedyLevel: 'literally comedy'
},
{
   name : 'Comedy',
   description : 'A comedy film is a genre of film in which the main emphasis is \
   on humour. These films are designed to make the audience laugh through amusement and most often \
   work by exaggerating characteristics for humorous effect.',
   comedyLevel: 'literally comedy'
 },
];

let Directors = [
  {
    name : 'James Cameron',
    born : 'August 16, 1954'
  },
  {
    name : 'Catherine Hardwicke',
    born : 'October 21, 1955'
  },
  {
    name : 'Nicholas Stroller',
    born : 'March 19, 1976'
  },
  {
    name : 'Jay Roach',
    born : 'June 14, 1957'
  },
  {
    name : 'Paul Feig',
    born : 'September 17, 1962'
  }
];

let Users = [
  {
    id : "5d9d82069bc166069f68524d",
    favoriteMovies : [],
    username : "moviebuff74",
    password : "securepassword89",
    email : "example123456@gmail.com",
    birthday : "1974-02-14"
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

// get a list of all top movies
app.get('/movies', (req, res) => {
  res.json(TopMovies)
});

// get movie info by movie title
app.get('/movies/:title', (req,res) => {
  res.json(TopMovies.find( (movie) =>
    {return movie.title === req.params.title }));
  });

// get genre info by genre name
app.get('/genre/:name', (req,res) => {
  res.json(Genres.find ( (genre) =>
    {return genre.name === req.params.name }));
});

// Get director info by director name
app.get('/director/:name', (req, res) => {
  res.json(Directors.find ( (director) =>
    {return director.name === req.params.name}));
});

// Get full user info by username
app.get('/users/:username', (req,res) => {
  res.json(Users.find ( (user) =>
    {return user.username === req.params.username}));
});

// PUT requests
// update users information
app.put('/users/:username/:password/:email/:birthday', (req, res) => {
  res.send('User information updated.');
});

// POST requests
// adds data for a new user
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    res.status(400).send('Missing username in request body');
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.send(newUser);
  }
});

//adds movie to favorites for user
app.post('/favoriteMovies/:username/:title', (req, res) => {
  res.send('Favorite movie added to user profile.');
});

// DELETE requests
// deletes a movie from a users favorites by username
app.delete('/favoriteMovies/:username/:title', (req, res) => {
  res.send('Movie was sucessfully removed from your list of favorite movies.');
});

// deletes a user from the registry of users
app.delete('/users/:username', (req, res) => {
  res.send('User account was successully deleted.');
});


// serve static files
app.use(express.static('public'));

// error handling


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
