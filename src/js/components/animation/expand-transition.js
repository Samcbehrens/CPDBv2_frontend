import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { innerHeight } from 'utils/dom';
import { TransitionMotion, spring } from 'react-motion';
import { defaultConfig } from 'utils/spring-presets';


export default class ExpandTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childHeight: null,
      prevKey: null
    };
    this.expanded = false;
  }

  onExpansionBegin() {
    if (this.props.onExpansionBegin) {
      setTimeout(() => {
        this.props.onExpansionBegin(this.props.childKey);
      }, 0);
    }
    this.expanded = true;
  }

  onFullyClosed() {
    if (this.props.onFullyClosed) {
      setTimeout(() => {
        this.props.onFullyClosed(this.state.prevKey);
      }, 0);
    }
    this.expanded = false;
  }

  render() {
    if (global.disableAnimation && this.props.childKey) {
      return this.props.children;

    } else if (this.props.childKey === null && (!this.expanded || global.disableAnimation)) {
      // when childKey is null and child is fully closed, render nothing.
      return null;

    } else if (this.props.childKey !== null && this.props.childKey !== this.state.prevKey) {
      // calculate child height when just received a new child
      const ref = component => {
        if (component) {
          this.setState({
            childHeight: innerHeight(ReactDOM.findDOMNode(component)),
            prevKey: this.props.childKey
          });
        }
      };
      return React.cloneElement(this.props.children, { ref: ref, style: { height: 0 } });

    } else {
      // interpolate height on subsequent renders
      return (
        <TransitionMotion
          willLeave={ () => ({ height: spring(0, defaultConfig()) }) }
          defaultStyles={ this.props.childKey ?
            [{ key: String(this.props.childKey), style: { height: 0, x: 0 } }] : [] }
          styles={ this.props.childKey ?
          [{
            key: String(this.props.childKey),
            style: { height: spring(this.state.childHeight, defaultConfig()), x: 1 }
          }]
            : [] }>
          { (interpolatedStyles) => {
            let config = interpolatedStyles[0];

            if (config) {
              if (config.style.x === 0) {
                this.onExpansionBegin();
              }

              return React.cloneElement(this.props.children, { style: { height: config.style.height } });
            }

            this.onFullyClosed();
            return null;
          } }
        </TransitionMotion>
      );
    }
  }
}

ExpandTransition.propTypes = {
  // children must be one element only and must merge props.style that is passed down to it
  children: PropTypes.element.isRequired,

  // childKey must be unique to children, childKey is null mean nothing will be rendered.
  childKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  // called when expansion just begun with a new child (new childKey as well)
  onExpansionBegin: PropTypes.func,

  // called when child is fully closed (it's height is 0 and childKey is null)
  onFullyClosed: PropTypes.func
};
