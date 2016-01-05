import React from 'react';

class LayoutView extends React.Component {
  static propTypes() {
    return {
      children: React.PropTypes.object,
      route: React.PropTypes.object,
      routes: React.PropTypes.array
    };
  }

  static defaultProps() {
    return {
      route: {},
      routes: []
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container-fluid container-nav page">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default LayoutView;
