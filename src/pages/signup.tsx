import React from 'react';
import AppPage from '../@edcarlos/hoc/DefaultPage/index'
import asyncComponent from "../@edcarlos/utility/asyncComponent";

const SignUP = asyncComponent(() => import('../modules/auth/Signup/index'));
export default AppPage(() => <SignUP />);
