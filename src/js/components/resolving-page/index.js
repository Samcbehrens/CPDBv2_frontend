import React, { PropTypes, Component } from 'react';
import Header from 'grommet/components/Header';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Split from 'grommet/components/Split';
import App from 'grommet/components/App';


class ResolvingPage extends Component {
  render() {
    return (
      <App centered={ false }>
        <Split flex='right'>
          <Sidebar colorIndex='neutral-1'>
            <Header pad='medium'
              justify='between'>
              <Title>
                Title
              </Title>
            </Header>
            <Box flex='grow'
              justify='start'>
              <Menu primary={ true }>
                <Anchor href='officer'
                  className='active'>
                  Officer
                </Anchor>
                <Anchor href='#'>
                  Second
                </Anchor>
                <Anchor href='#'>
                  Third
                </Anchor>
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
