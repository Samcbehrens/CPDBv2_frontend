import React, { Component, PropTypes } from 'react';
import { get, map } from 'lodash';

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
  }

  renderRecord() {
    const { records, count, offset, handleNext, handlePrevious } = this.props;
    const record = get(records, '0.record');

    return (
      <Section align='center' pad='medium' margin='small' colorIndex='light-2' className='test--record'>
        <OfficerForm disabled={ true } officer={ record }>
          <Header>
            <Value className='test--offset' label={ `${offset + 1}/${count}` } size='large'/>
            <Box flex={ true } justify='end' direction='row' responsive={ false }>
              <Button className='test--previous-button'
                icon={ <CaretPrevious /> } onClick={ handlePrevious }/>
              <Button className='test--next-button' icon={ <CaretNext /> } onClick={ handleNext }/>
            </Box>
          </Header>
        </OfficerForm>
      </Section>
    );
  }

  renderCandidate(candidate, index) {
    return (
      <Section className='test--candidate'
        align='center' pad='medium' margin='small' colorIndex='light-2' key={ index } >
        <OfficerForm disabled={ true } officer={ candidate }>
          <Header justify='end'>
            <Button icon={ <Close /> } href='#'/>
            <Button className='test--select-candidate-button'
              icon={ <Checkmark /> } onClick={ () => this.handleOnCandidateSelected(candidate) }/>
          </Header>
        </OfficerForm>
      </Section>
    );
  }

  handleOnCandidateSelected(candidate) {
    const { id, matchingAPI, fetchData } = this.props;

    matchingAPI(id, candidate.id).then(() => {
      fetchData();
    });
  }

  render() {
    const { records } = this.props;
    const candidates = get(records, '0.candidates');

    return (
      <Section>
        <Header pad='small'>
          <Title className='test--matching-text'>Matching</Title>
          <Box flex={ true } justify='end' direction='row' responsive={ false }>
            <Search className='test--search-box'
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
  fetchData: PropTypes.func,
  matchingAPI: PropTypes.func,
  records: PropTypes.array,
  candidates: PropTypes.array,
  count: PropTypes.number,
  nextUrl: PropTypes.string,
  prevUrl: PropTypes.string,
  handleNext: PropTypes.func,
  handlePrevious: PropTypes.func
};

OfficerMatching.defaultProps = {
  fetchData: () => {},
  matchingAPI: () => {}
};

export default OfficerMatching;
