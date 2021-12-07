import moment from "moment";
import { authRole } from "../../shared/constants/AppConst";
import { Breakpoint } from "@mui/system";
var CryptoJS = require("crypto-js");
import Moment from 'moment';


export const getBreakPointsValue = (valueSet: any, breakpoint: Breakpoint) => {
  if (typeof valueSet === "number") return valueSet;
  switch (breakpoint) {
    case "xs":
      return valueSet.xs;
    case "sm":
      return valueSet.sm || valueSet.xs;
    case "md":
      return valueSet.md || valueSet.sm || valueSet.xs;
    case "lg":
      return valueSet.lg || valueSet.md || valueSet.sm || valueSet.xs;
    default:
      return (
        valueSet.xl || valueSet.lg || valueSet.md || valueSet.sm || valueSet.xs
      );
  }
};

export const getFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  let k = 1024,
    dm = 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const multiPropsFilter = (
  products: any[],
  filters: any,
  stringKey = "title"
) => {
  const filterKeys = Object.keys(filters);
  return products.filter((product) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
      // Loops again if product[key] is an array (for material attribute).
      if (Array.isArray(product[key])) {
        return product[key].some((keyEle: any) =>
          filters[key].includes(keyEle)
        );
      }
      console.log("key", key, filters[key], product[key]);
      if (key === stringKey) {
        return product[key].toLowerCase().includes(filters[key].toLowerCase());
      }
      return filters[key].includes(product[key]);
    });
  });
};

export const getCustomDateTime = (
  value = 0,
  unit = "days",
  format = "YYYY-MM-DD"
) => {
  if (value === 0) {
    return moment().format(format);
  } else {
    // @ts-ignore
    return moment().add(value, unit).format(format);
  }
};

export const timeFromNow = (date: any) => {
  const timestamp = moment(date).format("X");
  const newDate = moment.unix(Number(timestamp));
  return moment(newDate).fromNow();
};

export const checkPermission = (routeAuth: any, userRole: any) => {
  if (routeAuth === null || routeAuth === undefined) {
    return true;
  }

  if (userRole && Array.isArray(userRole)) {
    return routeAuth.some((r: any) => userRole.indexOf(r) >= 0);
  }

  if (routeAuth.length === 0) {
    return !userRole || userRole.length === 0;
  }
  if (userRole && Array.isArray(userRole) && Array.isArray(routeAuth)) {
    return routeAuth.some((r) => userRole.indexOf(r) >= 0);
  }
  return routeAuth.indexOf(userRole) >= 0;
};

export const generateUniqueID = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

export const getUserFromAuth0 = (user: any) => {
  if (user)
    return {
      id: user.id ? user.id : 1,
      user_login: user.sub,
      display_name: user.name,
      user_email: user.user_email,
      avatar: user.avatar,
      user_role: user.user_role,// user.user_role authRole.user
    };
  return user;
};

export const getUserFromFirebase = (user: any) => {
  console.log("user: ", user);
  if (user)
    return {
      id: user.id ? user.id : 1,
      user_login: user.user_login,
      display_name: user.display_name ? user.display_name : "AECI Safety User",
      user_email: user.user_email,
      avatar: user.avatar,
      user_role: user.user_role,// user.user_role authRole.user
    };
  return user;
};
export const getUserFromAWS = (user: any) => {
  if (user)
    return {
      id: user.id ? user.id : 1,
      user_login: user.username,
      display_name: user.attributes.name ? user.attributes.name : "AECI Safety User",
      user_email: user.attributes.user_email,
      avatar: user.avatar,
      user_role: user.user_role,// user.user_role authRole.user
    };
  return user;
};

export const getUserFromJwtAuth = (user: any) => {
  if (user)
    return {
      id: user.id ? user.id : 1,
      user_login: user.user_login,
      display_name: user.display_name,
      user_email: user.user_email,
      avatar: user.avatar,
      user_role: user.user_role,// user.user_role authRole.user
      user_section: user.user_section,
      user_pass: user.user_pass
    };
  return user;
};


//==============================================CUSTOM UTILITIES

export const randomNum = () => {
  let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  let length = 35 // Customize the length here.
  for (let i = length; i > 0; --i) result += characters[Math.round(Math.random() * (characters.length - 1))]
  //console.log(result)
  return result;
}

export const randomColor = () => {
  const r_ = Math.floor(Math.random() * 16777215).toString(16);
  const r = () => Math.random() * 256 >> 0;
  return `#${r_}`
  //return `rgb(${r()}, ${r()}, ${r()})`;
}

export const encryptorUtil = (rowText: any) => {
  //var ciphertextUserid = CryptoJS.AES.encrypt(JSON.stringify(rowText), 'my-secret-key@123').toString();
  var ciphertextUserid = CryptoJS.AES.encrypt(rowText, 'my-secret-key@123').toString();
  return ciphertextUserid;
}

export const decryptorUtil = (encryptedText: any) => {
  var bytes = CryptoJS.AES.decrypt(encryptedText, 'my-secret-key@123');
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

export const niceDateDefault = (theDate: any) => {
  const date = new Date(theDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  //let hour = date.getHours();
  //let minutes = date.getMinutes();
  let dt;
  let mth;
  let finalDate;

  if (day < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    mth = '0' + mth;
  }

  return finalDate = `${day}-${month}-${year}`;
}

export const niceDateWithTime = (theDate: any) => {
  const date = new Date(theDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let dt;
  let mth;
  let finalDate;

  if (day < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    mth = '0' + mth;
  }

  return finalDate = `${day}-${month}-${year} at ${hour}h:${minutes}mn`;
}

export const Time = (theDate: any) => {
  const date = new Date(theDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour: any = date.getHours();
  let minutes: any = date.getMinutes();
  let dt;
  let mth;
  let hrs;
  let min;
  let finalTime;

  if (day < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    mth = '0' + mth;
  }


  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return finalTime = `${hour}:${minutes}`;
}


export const HumanDateTime = (theDate?: any) => {
  if (!theDate) theDate = Date.now()
  return `${Moment(theDate).format("ll")} at ${Time(theDate)}`;
}

export const humanDate = (theDate?: any) => {
  if (!theDate) theDate = Date.now()
  return `${Moment(theDate).format("ll")}`;
}


export function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const deleteAllCookiesAlt = () => {
  document.cookie.split(";")
    .forEach(function (c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

//https://usefulangle.com/post/3/javascript-search-array-of-objects
export const retrieveObjectKeyValue = (dataObject, id) => {
  var Type = '';
  for (var i = 0; i < dataObject.length; i++) {
    if (dataObject[i].id == id) {
      Type = dataObject[i].itemValue;
      break;
    }
  }
  return Type
}

export const objectValueWithReference = (dataObject, id, reference) => {
  if (dataObject == null || dataObject == 0 || dataObject == undefined) {
    return []
  }
  let Type = '';
  for (var i = 0; i < dataObject.length; i++) {
    if (dataObject[i].id == id) {
      Type = dataObject[i][reference];
      if (typeof (Type) == 'number') Type = parseFloat(Type).toFixed(2)
      break;
    }
  }
  return Type
}

export function getBracketString(txt) {
  let regExp = /\(([^)]+)\)/;
  let matches = regExp.exec(txt);
  if (matches) return matches[1];
}

export function removeBracketWithString(txt) {
  return txt.replace(/ *\([^)]*\) */g, "");
}

export function removeBracketStringByType(txt, type) {
  if (type === '[]') return txt.replace(/ *\[[^)]*\] */g, "");
  if (type === '()') return txt.replace(/ *\([^)]*\) */g, "");
}

// export const stringDateFormat = async (rawDate) =>{
//   // const dateFromData= rawDate//"06/15/1990" //string type
//   // const formatDate = (dateString: string) => {
//   // const options: Intl.DateTimeFormatOptions = { //Typescript ways of adding the type
//   //   year: "numeric",
//   //   month: "long",
//   //   day: "numeric",
//   // };
//   //   return new Date(dateString).toLocaleDateString([], options);
//   // };

//   // //console.log(formatDate(dateFromData)); // output will be: June 15, 1990
//   // return formatDate(dateFromData);
// }

export const getUserFromToken = token => {
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      // ignore
    }
  }
  return null;
};


export const Emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;