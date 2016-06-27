import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { requestFAQs, askQuestion } from 'actions/faq-page';
import { dataAvailableSelector, faqsSelector } from 'selectors/faq-page/faqs-selector';
import { getIsSubmitting } from 'selectors/faq-page/faq-form-selector';
import FAQListSection from 'components/faq-page/faq-list-section';
import FAQListSectionPlaceHolder from 'components/faq-page/faq-list-section-placeholder';
import FAQForm from 'components/faq-page/faq-form';


export class UnconnectedFAQPageContainer extends Component {
  componentDidMount() {
    this.props.requestFAQs();
  }

  render() {
    const { dataAvailable, faqs, isSubmitting, askQuestion } = this.props;

    if (dataAvailable) {
      return (
        <div>
          <FAQListSection faqs={ faqs }/>
          <FAQForm askQuestion={ askQuestion } isSubmitting={ isSubmitting }/>
        </div>
      );
    } else {
      return (
        <FAQListSectionPlaceHolder/>
      );
    }
  }
}

UnconnectedFAQPageContainer.propTypes = {
  requestFAQs: PropTypes.func.isRequired,
  askQuestion: PropTypes.func,
  dataAvailable: PropTypes.bool,
  faqs: PropTypes.array,
  store: PropTypes.object,
  isSubmitting: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    faqs: faqsSelector(state),
    isSubmitting: getIsSubmitting(state)
  };
}

const mapDispatchToProps = {
  requestFAQs,
  askQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedFAQPageContainer);
