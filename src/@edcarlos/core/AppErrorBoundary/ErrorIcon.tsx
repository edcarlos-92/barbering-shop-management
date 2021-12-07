import React from "react";
// @ts-ignore
import Logo from "../../../assets/icon/something-wrong.svg";
import { useTheme } from "@mui/material";

const ErrorIcon = () => {
  const theme = useTheme();
  return <Logo  />;//fillColor={theme.palette.primary.main}
};

export default ErrorIcon;
