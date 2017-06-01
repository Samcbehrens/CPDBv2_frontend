import React, { Component, PropTypes } from 'react';

import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Close from 'grommet/components/icons/base/Close';

import OfficerForm from '../officer-form';


class DedupeTraining extends Component {
  constructor(props) {
    super(props);

    this.handleTrain = this.handleTrain.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrainingData();
  }

  handleTrain(action) {
    const records = this.props.records;
    this.props.train(action, records[0], records[1]).then(() => {
      this.props.fetchTrainingData();
    });
  }

  render() {
    const records = this.props.records;

    return (
      <Section>
        <Header pad='small'>
          <Title className='test--matching-text'>Training</Title>
          <Box flex={ true } justify='end' direction='row' responsive={ false }>
            <Search className='test--search-box'
                    inline={ true } fill={ true } size='medium' placeHolder='Search'
                    dropAlign={ { 'right': 'right' } }/>
          </Box>
        </Header>
        <Columns>
          <Section className='test--candidate'
            align='center' pad='medium' margin='small' colorIndex='light-2'>
            <OfficerForm disabled={ true } officer={ records[0] }>
              <Header justify='end' />
            </OfficerForm>
          </Section>
          <Section className='test--candidate'
            align='center' pad='medium' margin='small' colorIndex='light-2' >
            <OfficerForm disabled={ true } officer={ records[1] }>
              <Header justify='end'>
                <Button className='test--unmatched-button' icon={ <Close /> }
                onClick={ () => this.handleTrain('not_matched') } href='#'/>
                <Button className='test--matched-button'
                  icon={ <Checkmark /> } onClick={ () => this.handleTrain('matched') }/>
              </Header>
            </OfficerForm>
          </Section>
        </Columns>
      </Section>
    );
  }
}

DedupeTraining.propTypes = {
  records: PropTypes.array,
  fetchTrainingData: PropTypes.func,
  train: PropTypes.func
};

DedupeTraining.defaultProps = {
  records: [{}, {}],
  fetchTrainingData: () => {},
  train: () => {}
};

export default DedupeTraining;
