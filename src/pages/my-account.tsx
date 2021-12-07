import React from 'react';
import AppPage from '@edcarlos/hoc/AppPage';
import asyncComponent from '@edcarlos/utility/asyncComponent';

const Account = asyncComponent(() => import('modules/userAccount'));
export default AppPage(() => <Account />);
