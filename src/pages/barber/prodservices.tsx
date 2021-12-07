import React from 'react';
import AppPage from '@edcarlos/hoc/AppPage';
import asyncComponent from '@edcarlos/utility/asyncComponent';


const ShopServices = asyncComponent(() => import('modules/Barber/shopServices'));
export default AppPage(() => <ShopServices />);
