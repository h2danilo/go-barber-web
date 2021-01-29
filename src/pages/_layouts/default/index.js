import React from 'react';
import PropTypes from 'prop-types';

// ~ => sempre que comacar com ~ volta p pasta raiz definida no arquivo config-overrides.js (src)
import { Wrapper } from './styles';

function DefaultLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
