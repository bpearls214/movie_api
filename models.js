const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
});

var directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String},
  Birthyear: {type: String, required: true},
  Deathyear: {type: String}
});

var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: [{type: mongoose.Schema.Types.ObjectId, ref:'Genres'}],
  Director: [{type: mongoose.Schema.Types.ObjectId, ref:'Directors'}],
  ComedyRating: {type: String}
});

var userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  Address: {
    Street: String,
    City: String,
    State: String
  },
  SavedMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password)
{
  return bcrypt.compareSync(password, this.Password); };
};

var Genre = mongoose.model('Genre', genreSchema);
var Director = mongoose.model('Director', directorSchema);
var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Movie = Movie;
module.exports.User = User;
