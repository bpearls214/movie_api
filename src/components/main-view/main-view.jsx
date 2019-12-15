import React from 'react';
import axios from 'axios';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="main-view"></div>
    );
  }
}

const { /*something*/ } = this.state;

export class MainView extends React.Component {

  componentDidMount() {
    axios.get('<https://cineme-api.herokuapp.com/movies>')
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

  render() {
    // if the state isn't initialized this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // before the movies have been loaded 
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}