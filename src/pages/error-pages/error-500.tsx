import React from 'react';
import AppPage from '../../@edcarlos/hoc/AppPage'
import asyncComponent from "../../@edcarlos/utility/asyncComponent";

const Error500 = asyncComponent(() => import('../../modules/errorPages/Error500'));
export default AppPage(() => <Error500 />);
