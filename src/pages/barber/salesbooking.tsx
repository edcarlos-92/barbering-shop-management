import React from 'react';
import AppPage from '@edcarlos/hoc/AppPage';
import asyncComponent from '@edcarlos/utility/asyncComponent';


const SalesBooking = asyncComponent(() => import('modules/Barber/salesBooking'));
export default AppPage(() => <SalesBooking />);
