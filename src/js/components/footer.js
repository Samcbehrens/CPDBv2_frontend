import React from 'react';

import FooterNavLInk from 'components/common/footer-nav-link';
import { wrapperStyle, linkStyle } from './footer.style';


export default class Footer extends React.Component {
  render() {
    const links = ['Complaints Process', 'Glossary', 'Legal Disclaimer', 'Get Updates', 'Collaborate'];
    return (
      <div style={ wrapperStyle }>
        { links.map( (link, ind) => (
          <FooterNavLInk style={ linkStyle } key={ ind }>{ link }</FooterNavLInk>
        )) }
      </div>
    );
  }
}