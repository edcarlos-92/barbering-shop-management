import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage';
import asyncComponent from '../../@edcarlos/utility/asyncComponent';

const Page2 = asyncComponent(() =>
  import('../../modules/sample/Page2'),
);
export default AppPage(() => <Page2 />);
