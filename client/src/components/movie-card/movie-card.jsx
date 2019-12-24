// client/src/components/movie-card/movie-card.jsx 

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card className="text-center mx-auto" id="movie-card" border="info" style={{ width: '16rem' }}>
        <Card.Img variant="top mx-auto d-block" className="movie-poster" src={movie.ImageUrl} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Comedy Rating: {movie.ComedyRating}</Card.Text>
          <Button variant="outline-info" onClick={() => onClick(movie)}>Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};