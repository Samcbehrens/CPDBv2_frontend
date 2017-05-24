import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  nextUrlSelector, prevUrlSelector, offsetSelector, countSelector, recordsSelector
} from 'selectors/resolving-page/with-pagination';

export const wrap = (ChildComponent) => {
  class WrappedComponent extends Component {
    constructor(props) {
      super(props);
      this.handleNext = this.handleNext.bind(this);
      this.handlePrevious = this.handlePrevious.bind(this);
    }

    componentDidMount() {
      this.props.fetchData();
    }

    handleNext() {
      const { nextUrl, fetchData } = this.props;
      if (nextUrl) {
        fetchData(nextUrl);
      }
    }

    handlePrevious() {
      const { prevUrl, fetchData } = this.props;
      if (prevUrl) {
        fetchData(prevUrl);
      }
    }

    render() {
      const injectedBehaviors = {
        handleNext: this.handleNext,
        handlePrevious: this.handlePrevious
      };

      const props = {
        ...this.props,
        ...injectedBehaviors
      };

      return (
        <ChildComponent { ...props } />
      );
    }
  }

  WrappedComponent.propTypes = {
    count: PropTypes.number,
    nextUrl: PropTypes.string,
    prevUrl: PropTypes.string,
    offset: PropTypes.number,
    records: PropTypes.array,
    fetchData: PropTypes.func
  };

  return WrappedComponent;
};

/* istanbul ignore next */
const withPagination = (fetchData, statePath) => {
  return (ChildComponent) => {
    return connect((state) => {
      const specificComponentState = get(state, statePath, {});

      return {
        nextUrl: nextUrlSelector(specificComponentState),
        prevUrl: prevUrlSelector(specificComponentState),
        offset: offsetSelector(specificComponentState),
        count: countSelector(specificComponentState),
        records: recordsSelector(specificComponentState)
      };
    }, { fetchData })(wrap(ChildComponent));
  };
};

export default withPagination;
