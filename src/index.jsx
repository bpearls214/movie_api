import React from 'react';
import ReactDOM from 'react-dom';

// import statement indicating bundling './index.scss'
import './index.scss';

// Main component (will eventually use all the others)
class CineMeApplication extends React.Component {
  render() {
    return (
      <div className="cineMe">
        <div>Good morning</div>
      </div>
    );
  }
}

// Finds the root of your app 
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(CineMeApplication), container);