import React, { Component, PropTypes } from 'react';


export default function (ComponentClass) {
  return class Printable extends Component {
    constructor(props) {
      super(props);
      this._mediaPrintListener = this._mediaPrintListener.bind(this);
      this.state = {
        isPrinting: false
      };
    }

    _mediaPrintListener(media) {
      this.setState({isPrinting: media.matches});
    }

    componentDidMount() {
      const query = window.matchMedia('print')
      query.addListener(this._mediaPrintListener);
    }

    render() {
      const { isPrinting } = this.state;

      return <ComponentClass isPrinting={ isPrinting } { ...this.props }/>
    }
  }
}
