import React from 'react';
import AppPage from '../@edcarlos/hoc/DefaultPage/index';
import asyncComponent from '../@edcarlos/utility/asyncComponent';

const ResetPassword = asyncComponent(() =>
  import('../modules/auth/ResetPasswordAwsCognito'),
);
export default AppPage(() => <ResetPassword />);
