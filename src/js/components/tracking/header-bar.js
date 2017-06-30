import React, { Component } from 'react';

import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';

import {
  headingWrapperStyle, headingStyle, aliasButtonStyle, aliasButtonTextStyle
} from './search-tracking-style';


class HeaderBar extends Component {
  render() {
    return (
      <div style={ headingWrapperStyle }>
        <Heading style={ headingStyle }>Search Box Tracking</Heading>
        <Button style={ aliasButtonStyle } href='#' plain={ true }
          label={ <Label style={ aliasButtonTextStyle } >Add Alias</Label> } />
      </div>
    );
  }
}

export default HeaderBar;
