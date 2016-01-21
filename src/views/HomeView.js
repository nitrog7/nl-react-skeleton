import React from 'react';
import { AppStore, FalcorStore } from 'stores/index';
import DemoButton from 'components/DemoButton';

export class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);

    // Get data from Falcor store
    FalcorStore.get('hello').then(data => {
      this.setState({
        hello: AppStore.get('hello'),
        helloFalcor: data.hello
      });
    });
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange() {
  }

  render() {
    return (
      <div className='container text-center'>
        <h1>NL React Falcor Skeleton</h1>
        <p>AppStore: {this.state.hello}</p>
        <p>FalcorStore: {this.state.helloFalcor}</p>
        <DemoButton/>
      </div>
    );
  }
}

export default HomeView;
