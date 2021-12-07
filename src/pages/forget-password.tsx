import React from 'react';
import AppPage from '../@edcarlos/hoc/DefaultPage/index'
import asyncComponent from "../@edcarlos/utility/asyncComponent";

const ForgotPassword = asyncComponent(() => import('../modules/auth/ForgetPassword/index'));
export default AppPage(() => <ForgotPassword />);
