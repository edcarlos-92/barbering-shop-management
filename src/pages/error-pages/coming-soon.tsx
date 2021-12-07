import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage'
import asyncComponent from "../../@edcarlos/utility/asyncComponent";

const ComingSoon = asyncComponent(() => import('../../modules/errorPages/ComingSoon'));
export default AppPage(() => <ComingSoon />);
