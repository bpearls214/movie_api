import React from 'react';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view text-center mx-auto'>
        <div className='movie-title'>
          <h3 className='value'>{movie.Title}</h3>
        </div>
        <img className='movie-poster' src={movie.ImageUrl} />
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movie.Description}</span>
        </div>

        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'>{movie.genre}</span>
        </div>
        <Button variant="outline-danger" onClick={() => onClick()}>Back</Button>
      </div>
    );
  }
}