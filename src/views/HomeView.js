import React from 'react';
import { AppStore, FalcorStore } from 'stores/index';
import DemoButton from 'components/DemoButton';

export class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange() {

  }

  render() {
    let hello = AppStore.get('hello');
    let helloFalcor = FalcorStore.get('hello');
    console.log('helloFalcor', helloFalcor);
    return (
      <div className='container text-center'>
        <h1>NL React Falcor Skeleton</h1>
        <p>{hello}</p>
        <DemoButton/>
      </div>
    );
  }
}

export default HomeView;
