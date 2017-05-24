import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import Value from 'grommet/components/Value';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import CaretPrevious from 'grommet/components/icons/base/CaretPrevious';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Refresh from 'grommet/components/icons/base/Refresh';

import OfficerForm from '../officer-form';


class OfficerMerging extends Component {
  constructor(props) {
    super(props);

    this.handleMerge = this.handleMerge.bind(this);
    this.renderRecord = this.renderRecord.bind(this);
    this.renderCandidate = this.renderCandidate.bind(this);
    this.handleDataChanges = this.handleDataChanges.bind(this);

    this.state = {
      updatedRecord: {}
    };
  }

  handleMerge() {
    const { id, fetchData, deleteUnmergeable } = this.props;
    deleteUnmergeable(id, this.state.updatedRecord).then(() => fetchData());
  }

  handleDataChanges(field, value) {
    let { updatedRecord } = this.state;

    updatedRecord[field] = value;
    this.setState({ updatedRecord: updatedRecord });
  }

  renderHeader() {
    return (
      <Header pad='small'>
        <Title className='test--merging-text'>Resolving</Title>
        <Box flex={ true } justify='end' direction='row' responsive={ false }>
          <Search className='test--search-box' inline={ true } fill={ true } size='medium'
            placeHolder='Search' dropAlign={ { 'right': 'right' } }/>
        </Box>
      </Header>
    );
  }

  renderRecord() {
    const { records, offset, count, handleNext, handlePrevious } = this.props;
    const record = get(records, '0.record', {});

    return (
      <Section className='test--record' pad='medium' margin='small' colorIndex='light-2'>
        <OfficerForm officer={ record } >
          <Header>
            <Value className='test--offset' label={ `${offset + 1}/${count}` } size='large'/>
            <Box flex={ true } justify='end' direction='row' responsive={ false }>
              <Button className='test--previous-button'
                icon={ <CaretPrevious /> } onClick={ handlePrevious } href='#'/>
              <Button className='test--next-button'
                icon={ <CaretNext /> } onClick={ handleNext } href='#'/>
            </Box>
          </Header>
        </OfficerForm>
      </Section>
    );
  }

  renderCandidate() {
    const { records } = this.props;
    const candidate = get(records, '0.candidate');

    return (
      <Section className='test--candidate' pad='medium' margin='small' colorIndex='light-2'>
        <OfficerForm officer={ { ...candidate, ...this.state.updatedRecord } } disabled={ false }
          handleDataChanges={ (field, value, mapper) => { this.handleDataChanges(field, value, mapper); } }>
          <Footer justify='end'>
            <Button icon={ <Refresh /> } href='#'/>
            <Button className='test--merge-button' onClick={ this.handleMerge } icon={ <Checkmark /> } href='#'/>
          </Footer>
        </OfficerForm>
      </Section>
    );
  }

  render() {
    return (
      <Section>
        {
          this.renderHeader()
        }
        <Columns>
          {
            this.renderCandidate()
          }
          {
            this.renderRecord()
          }
        </Columns>
      </Section>
    );
  }
}

OfficerMerging.propTypes = {
  id: PropTypes.number,
  count: PropTypes.number,
  nextUrl: PropTypes.string,
  prevUrl: PropTypes.string,
  offset: PropTypes.number,
  records: PropTypes.array,
  fetchData: PropTypes.func,
  handleNext: PropTypes.func,
  handlePrevious: PropTypes.func,
  deleteUnmergeable: PropTypes.func
};

export default OfficerMerging;
