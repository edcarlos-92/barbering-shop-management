import React from 'react';

import { useSelector } from 'react-redux';
import AppMessageView from '@edcarlos/core/AppMessageView';
import AppLoader from '@edcarlos/core/AppLoader';
import { AppState } from '../../../redux/store';

const AppInfoView = () => {
  const { error, loading, message } = useSelector<AppState, AppState['common']>(
    ({ common }) => common,
  );

  const showMessage = () => {
    return <AppMessageView variant='success' message={message.toString()} position='top' alignment='left' />;
  };

  const showError = () => {
    return <AppMessageView variant='error' message={error.toString()} position='' alignment='' />;
  };

  return (
    <>
      {loading && <AppLoader />}

      {message && showMessage()}
      {error && showError()}
    </>
  );
};

export default AppInfoView;
