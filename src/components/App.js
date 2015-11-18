import React from 'react';
import { Router, Route } from 'react-router';
import * as views from 'views';

const {
  HomeView
  } = views;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route path='/' component={HomeView} />
      </Router>
    );
  }
}

export default App;