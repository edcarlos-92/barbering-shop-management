import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage';
import asyncComponent from '../../@edcarlos/utility/asyncComponent';

const Error503 = asyncComponent(() =>
  import('../../modules/errorPages/Error503'),
);
export default AppPage(() => <Error503 />);
