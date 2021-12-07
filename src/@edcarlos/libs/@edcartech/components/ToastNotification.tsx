import React from 'react'
import Snackbar from "@mui/material/Snackbar";
//import  Alert  from '@mui/lab/Alert';
import Alert from '@mui/material/Alert';
import { useThemeContext } from '../../../utility/AppContextProvider/ThemeContextProvider';
import { defaultTheme } from '../../../utility/AppContextProvider/defaultConfig';//'../../../../@edcarlos/utility/ContextProvider/defaultConfig';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastNotification(props: any) {

  const { notify, setNotify, type, position, time } = props;

  return (

    <ToastContainer
      position={position}
      autoClose={time}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      icon={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}


export function errorToast(message, setTheme) {
  return toast(message, { type: "error", theme: setTheme });
}

/*
toast("Default toast behavior is untouched, no icon to display");
toast.info("Lorem ipsum dolor"); // same as toast(message, {type: "info"});
toast.error("Lorem ipsum dolor")
toast.success("Lorem ipsum dolor")
toast.warn("Lorem ipsum dolor")
toast.error("Without icon", {
  icon: false
});
*/