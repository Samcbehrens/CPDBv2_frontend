import React, { Component, PropTypes } from 'react';

import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import Value from 'grommet/components/Value';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import CaretPrevious from 'grommet/components/icons/base/CaretPrevious';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Refresh from 'grommet/components/icons/base/Refresh';

import OfficerForm from './officer-form';


class OfficerConflicts extends Component {
  render() {
    return (
      <Section>
        <Header pad='small'>
          <Title>Resolving</Title>
          <Box flex={ true }
            justify='end'
            direction='row'
            responsive={ false }>
            <Search inline={ true }
              fill={ true }
              size='medium'
              placeHolder='Search'
              dropAlign={ { 'right': 'right' } }/>
          </Box>
        </Header>
        <Columns align='center'>
          <Section align='center'
            pad='medium'
            margin='small'
            colorIndex='light-2'>
            <OfficerForm disabled={ true }>
              <Header>
                <Value label='1/20' size='large'/>
                <Box flex={ true }
                  justify='end'
                  direction='row'
                  responsive={ false }>
                  <Button icon={ <CaretPrevious /> }
                    href='#'/>
                  <Button icon={ <CaretNext /> }
                    href='#'/>
                </Box>
              </Header>
            </OfficerForm>
          </Section>
          <Section align='center'
            pad='medium'
            margin='small'
            colorIndex='light-2'>
            <OfficerForm>
              <Header justify='end'>
                <Button icon={ <Refresh /> }
                  href='#'/>
                <Button icon={ <Checkmark /> }
                  href='#'/>
              </Header>
            </OfficerForm>
          </Section>
        </Columns>
      </Section>
    );
  }
}

OfficerConflicts.propTypes = {
  officer: PropTypes.object
};

OfficerConflicts.defaultProps = {
  officer: {
    'first_name': 'Aaron',
    'last_name': 'Jeffery',
    'middle_initial': 'M',
    'race': 'White',
    'gender': 'Male',
    'on_duty': true
  }
};

export default OfficerConflicts;
