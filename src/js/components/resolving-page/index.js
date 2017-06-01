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
                  <AccordionPanel className='test--matching-menu-item' heading='Matching'>
                    <Menu primary={ true }>
                      <Anchor href={ `/${RESOLVING_PATH}officer-matching` }
                        className='active test--matching-officer-button'>
                        Officer
                      </Anchor>
                    </Menu>
                  </AccordionPanel>
                  <AccordionPanel className='test--merging-menu-item' heading='Resolving'>
                    <Menu primary={ true }>
                      <Anchor href={ `/${RESOLVING_PATH}officer-merging` }
                        className='active test--merging-officer-button'>
                        Officer
                      </Anchor>
                    </Menu>
                  </AccordionPanel>
                  <AccordionPanel className='test--merging-menu-item' heading='Dedupe Training'>
                    <Menu primary={ true }>
                      <Anchor href={ `/${RESOLVING_PATH}dedupde-training` }
                        className='active test--merging-officer-button'>
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
