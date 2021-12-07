import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage';
import asyncComponent from '../../@edcarlos/utility/asyncComponent';

const Page1 = asyncComponent(() =>
  import('../../modules/sample/Page1'),
);
export default AppPage(() => <Page1 />);
