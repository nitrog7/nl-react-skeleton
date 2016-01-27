import React from 'react';

class LayoutView extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.object
    };
  }

  static get defaultProps() {
    return {
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
