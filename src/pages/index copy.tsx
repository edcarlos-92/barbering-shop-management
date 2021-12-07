import React from 'react';
import AppPage from '../@edcarlos/hoc/DefaultPage/index'
import asyncComponent from "../@edcarlos/utility/asyncComponent";

const SignIn = asyncComponent(() => import('../modules/auth/Signin/index'));
export default AppPage(() => <SignIn />);
