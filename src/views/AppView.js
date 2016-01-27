import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import * as views from 'views';

const {
  HomeView,
  LayoutView
  } = views;

export default class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={LayoutView}>
          <IndexRoute component={HomeView} />
        </Route>
      </Router>
    );
  }
}
