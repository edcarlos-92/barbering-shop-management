import React, { useContext, useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IntlMessages from '@edcarlos/utility/IntlMessages'
import { Fonts } from "shared/constants/AppEnums";
import Moment from 'moment';
import Card from "@mui/material/Card";
import AppTableContainer from "@edcarlos/core/AppTableContainer";
import AppAnimate from "@edcarlos/core/AppAnimate";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { appDirectories } from "shared/constants/AppConst";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useThemeContext } from "@edcarlos/utility/AppContextProvider/ThemeContextProvider";
import jwtAxios, { setAuthToken } from '@edcarlos/services/auth/jwt-auth';
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { blue, green, red } from '@mui/material/colors';
import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import { useIsMounted } from '@edcarlos/libs/@edcartech/Hooks/useIsMounted'
import AppGridContainer from '@edcarlos/core/AppGridContainer'
import HeaderText, { DynamicHeaderText } from '@edcarlos/libs/@edcartech/components/HeaderText'
import { useAuthUser } from '@edcarlos/utility/AuthHooks'
import { useIntl } from 'react-intl'
import { Grid as NUIGrid, Card as NUICard, Text as NUIText } from "@nextui-org/react";
import Chip from '@mui/material/Chip'

//-----------------------Redux Store------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { silentInsert, silentDelete, getCustomersData, doSelect, uploadFileHandler, getFileUpload, getPersonalInfoData, getSystemUsersData, doAddOrEdit, silentDeleteRec, silentAddOrEdit, doInsert } from 'redux/actions';
import { AppState } from 'redux/store';
import { getSquareBracketString, removeSquareBracketWithString, selectFieldFromObject, randomNum, retrieveObjectKeyValue, objectValueWithReference, HumanDateTime, humanDate, niceDateDefault, niceDateWithTime } from '@edcarlos/libs/@edcartech/utils'
import ConfirmDialog from '@edcarlos/libs/@edcartech/components/ConfirmDialog'
import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment'
import { useRouter } from 'next/router'
//-------------------------Redux Store----------------------------------------
const isBrowser = typeof window != 'undefined';

//=========================BARCODE AREA============================
import {
  Container,
  CardContent,
  makeStyles,
  TextField,
} from '@mui/material';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import QRgen from '@edcarlos/libs/@edcartech/components/QrCodeComp/QRgenerator'
import QRscan from '@edcarlos/libs/@edcartech/components/QrCodeComp/QRscanner'
//=========================BARCODE AREA============================

const StyledTable = styled(Table)(() => ({
  "& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td":
  {
    padding: 8,
  },
}));

const GridItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const GridItemL = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
}));

const avatarStyle = {
  width: 80,
  height: 80,
}

export default function TestPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuthUser();
  const { messages } = useIntl();
  const isMountedRef = useIsMounted();
  const componentRef = useRef(null);

  const [text, setText] = useState(user?.id || '');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef: any = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(String(user?.id || 'test'));
      setImageUrl(response);
    } catch (error) {
      // Error handling for QR code generation
    }
  };

  useEffect(() => {
    if (isBrowser) {
      generateQrCode();
    }
  }, []);

  return (
    <>
      <ReactToPrint
        trigger={() => <IconButton > <PrintIcon color='primary' /> </IconButton>}
        content={() => componentRef.current}
      />

      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box
          ref={componentRef}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1, maxWidth: 900, width: "100%" }}>
            <Card
              sx={{
                p: { xs: 6, xl: 8 },
                minHeight: 1000,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* First Top Information */}
              <Grid container spacing={3}>
                <Grid item xs>
                  <GridItem>
                    <Box sx={{ display: "inline-block" }}>
                      <Avatar sx={{ ...avatarStyle }} src={`${appDirectories.macRecruitLogo}`} />
                    </Box>
                  </GridItem>
                </Grid>
                <Grid item xs={6}>
                  <GridItem>
                    <Typography variant="h1" component="h1" >
                      Barber Shop Management System
                    </Typography>
                    <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                      {new Date().getFullYear()} Test Page
                    </Typography>
                  </GridItem>
                </Grid>
                <Grid item xs>
                  <GridItem>
                    <Box sx={{ display: "inline-block" }}>
                      {imageUrl ? (
                        <Avatar sx={{ ...avatarStyle }} src={imageUrl} alt='QrCode' />
                      ) : null}
                    </Box>
                  </GridItem>
                </Grid>
              </Grid>

              <Divider sx={{ color: '#000' }} />

              {/* Test Content */}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                  <Grid container item spacing={2}>
                    <Grid item xs={12}>
                      <GridItemL>
                        <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
                          Test Page Content
                        </Typography>
                        <Typography component="p" sx={{ mb: 1 }}>
                          This is a test page for the Barber Shop Management System.
                        </Typography>
                        <Typography component="p" sx={{ mb: 1 }}>
                          User ID: {user?.id || 'Not logged in'}
                        </Typography>
                        <Typography component="p" sx={{ mb: 1 }}>
                          User Role: {user?.user_role || 'Unknown'}
                        </Typography>
                      </GridItemL>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ color: '#000' }} />

              <Typography align='center' component="p" sx={{ mb: 1, mt: 1, fontWeight: Fonts.MEDIUM, color: "#777" }}>
                {`Copyright © ${new Date().getFullYear()} Barber Shop Management System`}
              </Typography>
            </Card>
          </Box>
        </Box>
      </AppAnimate>
    </>
  )
}