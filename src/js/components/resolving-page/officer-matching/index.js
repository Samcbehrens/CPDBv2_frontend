import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import Value from 'grommet/components/Value';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Close from 'grommet/components/icons/base/Close';
import CaretPrevious from 'grommet/components/icons/base/CaretPrevious';
import CaretNext from 'grommet/components/icons/base/CaretNext';

import OfficerForm from '../officer-form';


class OfficerMatching extends Component {
  constructor(props) {
    super(props);

    this.renderRecord = this.renderRecord.bind(this);
    this.renderCandidate = this.renderCandidate.bind(this);
    this.handleOnCandidateSelected = this.handleOnCandidateSelected.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  componentDidMount() {
    this.props.fetchUnmatchable();
  }

  handleNext() {
    const { nextUrl, fetchUnmatchable } = this.props;
    if (nextUrl) {
      fetchUnmatchable(nextUrl);
    }
  }

  handlePrevious() {
    const { prevUrl, fetchUnmatchable } = this.props;
    if (prevUrl) {
      fetchUnmatchable(prevUrl);
    }
  }

  renderRecord() {
    const { record, count, offset } = this.props;
    return (
      <Section align='center' pad='medium' margin='small' colorIndex='light-2'>
        <OfficerForm disabled={ true } officer={ record }>
          <Header>
            <Value label={ `${offset + 1}/${count}` } size='large'/>
            <Box flex={ true } justify='end' direction='row' responsive={ false }>
              <Button icon={ <CaretPrevious /> } onClick={ this.handlePrevious } href='#'/>
              <Button icon={ <CaretNext /> } onClick={ this.handleNext } href='#'/>
            </Box>
          </Header>
        </OfficerForm>
      </Section>
    );
  }

  renderCandidate(candidate, index) {
    return (
      <Section align='center' pad='medium' margin='small' colorIndex='light-2' key={ index }>
        <OfficerForm disabled={ true } officer={ candidate }>
          <Header justify='end'>
            <Button icon={ <Close /> } href='#'/>
            <Button icon={ <Checkmark /> } onClick={ () => this.handleOnCandidateSelected(candidate) }/>
          </Header>
        </OfficerForm>
      </Section>
    );
  }

  handleOnCandidateSelected(candidate) {
    const { id, matchingAPI, fetchUnmatchable, nextUrl } = this.props;
    matchingAPI(id, candidate.id).then(() => {
      if (nextUrl) {
        fetchUnmatchable(nextUrl);
      } else {
        fetchUnmatchable();
      }
    });
  }

  render() {
    const { candidates } = this.props;

    return (
      <Section>
        <Header pad='small'>
          <Title>Matching</Title>
          <Box flex={ true } justify='end' direction='row' responsive={ false }>
            <Search
              inline={ true } fill={ true } size='medium' placeHolder='Search' dropAlign={ { 'right': 'right' } }/>
          </Box>
        </Header>
        <Columns>
          { this.renderRecord() }
          { map(candidates, this.renderCandidate) }
        </Columns>
      </Section>
    );
  }
}

OfficerMatching.propTypes = {
  id: PropTypes.number,
  offset: PropTypes.number,
  fetchUnmatchable: PropTypes.func,
  matchingAPI: PropTypes.func,
  record: PropTypes.object,
  candidates: PropTypes.array,
  count: PropTypes.number,
  nextUrl: PropTypes.string,
  prevUrl: PropTypes.string
};

OfficerMatching.defaultProps = {
  offset: 0,
  record: {},
  candidates: [],
  fetchUnmatchable: () => {},
  matchingAPI: () => {}
};

export default OfficerMatching;
