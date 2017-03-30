import React, { PropTypes, Component } from 'react';

import Header from 'grommet/components/Header';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Split from 'grommet/components/Split';
import App from 'grommet/components/App';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import { RESOLVING_PATH } from 'utils/constants';


class ResolvingPage extends Component {
  render() {
    return (
      <App centered={ false }>
        <Split flex='right'>
          <Sidebar colorIndex='neutral-1'>
            <Header pad='medium'
              justify='between'>
              <Title>
                CPDP
              </Title>
            </Header>
            <Box flex='grow'
              justify='start'>
              <Menu primary={ true }>
                <Accordion animate={ false } active={ 0 }>
                  <AccordionPanel heading='Matching'>
                    <Menu primary={ true }>
                      <Anchor href={ `/${RESOLVING_PATH}officer-matching` } className='active'>
                        Officer
                      </Anchor>
                    </Menu>
                  </AccordionPanel>
                  <AccordionPanel heading='Resolving'>
                    <Menu primary={ true }>
                      <Anchor href={ `/${RESOLVING_PATH}officer-resolving` } className='active'>
                        Officer
                      </Anchor>
                    </Menu>
                  </AccordionPanel>
                </Accordion>
              </Menu>
            </Box>
          </Sidebar>
          { this.props.children }
        </Split>
      </App>
    );
  }
}

ResolvingPage.propTypes = {
  children: PropTypes.node
};

export default ResolvingPage;
