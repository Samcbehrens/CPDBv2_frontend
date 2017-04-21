import React, { Component, PropTypes } from 'react';


export default class ResolvingPage extends Component {
  render() {
    const { unmatchable } = this.props;

    return <div>{ JSON.stringify(unmatchable) }</div>;
  }
}

ResolvingPage.propTypes = {
  unmatchable: PropTypes.array
};
