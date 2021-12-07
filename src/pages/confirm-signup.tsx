import React from 'react';
import AppPage from '../@edcarlos/hoc/DefaultPage/index';
import asyncComponent from '../@edcarlos/utility/asyncComponent';

const ConfirmSignup = asyncComponent(() =>
  import('../modules/auth/ConfirmSignupAwsCognito'),
);
export default AppPage(() => <ConfirmSignup />);
