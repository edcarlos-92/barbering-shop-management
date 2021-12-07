import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage'
import asyncComponent from "../../@edcarlos/utility/asyncComponent";

const Error404 = asyncComponent(() => import('../../modules/errorPages/Error404'));
export default AppPage(() => <Error404 />);
