import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import PreLoader from '../components/PreLoader';
import Panel from '../components/Panel';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const BaseLayout: React.FC<{ children?: React.ReactNode, isLoggedIn?: boolean }> = ({ children, isLoggedIn = false }) => (
  <>
    <PreLoader />
    <Panel />
    <Header isLoggedIn={isLoggedIn} />
    {children || <Outlet />}
    <Footer />
  </>
);

BaseLayout.propTypes = {
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool,
};

export default BaseLayout;
