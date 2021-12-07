import React from 'react';
import AppPage from '@edcarlos/hoc/AppPage';
import asyncComponent from '@edcarlos/utility/asyncComponent';


const CustomerRegistration = asyncComponent(() => import('modules/Barber/customerReg'));
export default AppPage(() => <CustomerRegistration />);
