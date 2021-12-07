import React from 'react';
import AppPage from '@edcarlos/hoc/AppPage';
import asyncComponent from '@edcarlos/utility/asyncComponent';


const ShopExpenses = asyncComponent(() => import('modules/Barber/shopExpenses'));
export default AppPage(() => <ShopExpenses />);