import React, { useEffect } from 'react';
import AppInfoView from '@edcarlos/core/AppInfoView';
import AppGridContainer from '@edcarlos/core/AppGridContainer';
import SmsEmailNotification from './SmsEmailNotification';
import AppAnimate from '@edcarlos/core/AppAnimate';
import PageHeader from "@edcarlos/libs/@edcartech/components/Controls/PageHeader";
import { Paper, TableBody, TableRow, Toolbar, InputAdornment, Box, Grid } from '@mui/material';
import IntlMessages from '@edcarlos/utility/IntlMessages';
import InfoIcon from '@mui/icons-material/Info';

//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getCustomersData } from '../../redux/actions';
import { AppState } from '../../redux/store';
//-------------------------Redux Store----------------------------------------

const SystemNotifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCustomersData(dispatch);
  }, []);
  const { customersData } = useSelector<AppState, AppState['barber']>(({ barber }) => barber,);

  return (
    <>

      <Box>
        <PageHeader
          title={<IntlMessages id='common.sms_email.label' />}
          subTitle={<IntlMessages id='common.sms_email.sub.label' />}
          icon={<InfoIcon fontSize="large" />}
        />
      </Box>

      {customersData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppGridContainer>
            <>
              <Grid item xs={12} md={4}></Grid>
              <Grid item sm={12} xs={12} md={4} >
                <SmsEmailNotification optionalCustomerData={customersData} />
              </Grid>
              <Grid item xs={12} md={4}></Grid>
            </>
          </AppGridContainer>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </>
  );
};

export default SystemNotifications;








