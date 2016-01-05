import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import * as views from 'views';

const {
  HomeView,
  LayoutView
  } = views;

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path='/' component={LayoutView}>
          <IndexRoute path='/' component={HomeView} />
        </Route>
      </Router>
    );
  }
}
