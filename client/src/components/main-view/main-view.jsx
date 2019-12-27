// client/src/main-view/main-view.jsx 

import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: null,
      selectedMovie: null,
      user: null
    };
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://cineme-api.herokuapp.com/movies', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
        this, setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    axios.get('https://cineme-api.herokuapp.com/movies')
      .then(response => {
        //assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onBackClick(movie) {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    // if the state isn't initialized this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // before the movies have been loaded 
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie}
            onClick={button => this.onBackClick()}
          />
        ) : (movies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onClick={movie => this.onMovieClick(movie)}
          />
        ))
          )}
      </div>
    );
  }
}