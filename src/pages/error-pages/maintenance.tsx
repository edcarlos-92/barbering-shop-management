import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage'
import asyncComponent from "../../@edcarlos/utility/asyncComponent";

const Maintenance = asyncComponent(() => import('../../modules/errorPages/Maintenance'));
export default AppPage(() => <Maintenance />);
