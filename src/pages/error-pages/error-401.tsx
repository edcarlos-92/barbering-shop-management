import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage';
import asyncComponent from '../../@edcarlos/utility/asyncComponent';

const Error401 = asyncComponent(() =>
  import('../../modules/errorPages/Error401'),
);
export default AppPage(() => <Error401 />);
