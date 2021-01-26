/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = false;

  /* eslint-disable no-console */
  console.log(isPrivate);
  /* eslint-disable no-console */
  console.log(signed);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

// component pode ser uma funcao ou uma classe, entao utiliza  oneOfType que aceita um array
// PropTypes.element => elemento do react ou  PropTypes.func => que é uma
// isRequired = tem que ser obrigatorio pois nao tem como renderizar uma rota sem ter um componente nela.
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
