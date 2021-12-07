import React from 'react';
import AppPage from '@edcarlos/hoc/AppPage';
import asyncComponent from '@edcarlos/utility/asyncComponent';


const SystemUsers = asyncComponent(() => import('modules/SystemUsers'));
export default AppPage(() => <SystemUsers />);
