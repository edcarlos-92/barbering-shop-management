var CryptoJS = require('crypto-js');
import Moment from 'moment';

export const Emailregex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const generateUniqueID = (charLimit) => {
  let characters = `${Date.now()}${
    Math.floor(Math.random() * (9e12 - 1)) + 1e12
  }`;
  let result = '';
  let length = charLimit;
  for (let i = length; i > 0; --i)
    result += characters[Math.round(Math.random() * (characters.length - 1))];
  return result;
};

export const randomNum = (numberOfChar) => {
  let characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  let length = numberOfChar; //35 // Customize the length here.
  for (let i = length; i > 0; --i)
    result += characters[Math.round(Math.random() * (characters.length - 1))];
  //console.log(result)
  return result;
};

export const randomColor = () => {
  const r_ = Math.floor(Math.random() * 16777215).toString(16);
  const r = () => (Math.random() * 256) >> 0;
  return `#${r_}`;
  //return `rgb(${r()}, ${r()}, ${r()})`;
};

export const encryptorUtil = (rowText: any) => {
  //var ciphertextUserid = CryptoJS.AES.encrypt(JSON.stringify(rowText), 'my-secret-key@123').toString();
  var ciphertextUserid = CryptoJS.AES.encrypt(
    rowText,
    'my-secret-key@123',
  ).toString();
  return ciphertextUserid;
};

export const decryptorUtil = (encryptedText: any) => {
  var bytes = CryptoJS.AES.decrypt(encryptedText, 'my-secret-key@123');
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export const niceDateDefault = (theDate: any, format?: any) => {
  const date = new Date(theDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dt;
  let mth;
  let finalDate;

  if (day < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    mth = '0' + mth;
  }

  if (format == `y`) return (finalDate = `${year}-${month}-${day}`);
  if (format == `m`) return (finalDate = `${month}-${year}-${day}`);
  if (format == `d` || !format) return (finalDate = `${day}-${month}-${year}`);

  //return finalDate = `${day}-${month}-${year}`;
};

export const niceDateWithTime = (theDate: any, format?: any) => {
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

  if (format == `y`)
    return (finalDate = `${year}-${month}-${day} at ${hour}h:${minutes}mn`);
  if (format == `m`)
    return (finalDate = `${month}-${year}-${day} at ${hour}h:${minutes}mn`);
  if (format == `d` || !format)
    return (finalDate = `${day}-${month}-${year} at ${hour}h:${minutes}mn`);

  //return finalDate = `${day}-${month}-${year} at ${hour}h:${minutes}mn`;
};

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

  return (finalTime = `${hour}:${minutes}`);
};

export const HumanDateTime = (theDate?: any) => {
  if (!theDate) theDate = Date.now();
  return `${Moment(theDate).format('ll')} at ${Time(theDate)}`;
};

export const humanDate = (theDate?: any) => {
  if (!theDate) theDate = Date.now();
  return `${Moment(theDate).format('ll')}`;
};

export function deleteAllCookies() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const deleteAllCookiesAlt = () => {
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
};

//https://usefulangle.com/post/3/javascript-search-array-of-objects
export const retrieveObjectKeyValue = (dataObject, id) => {
  var Type = '';
  for (var i = 0; i < dataObject.length; i++) {
    if (dataObject[i].id == id) {
      Type = dataObject[i].itemValue;
      break;
    }
  }
  return Type;
};

export const objectValueWithReference = (dataObject, id, reference) => {
  if (dataObject == null || dataObject == 0 || dataObject == undefined) {
    return [];
  }
  let Type = '';
  for (var i = 0; i < dataObject.length; i++) {
    if (dataObject[i].id == id) {
      Type = dataObject[i][reference];
      if (typeof Type == 'number') Type = parseFloat(Type).toFixed(2);
      break;
    }
  }
  return Type;
};

export const findAMatch = (object, field, value) => {
  let result = false;
  for (let i = 0; i < object.length; i++) {
    if (object[i][`${field}`] === value) {
      //console.log(`Found Match For`,object[i][`${field}`]);
      result = true;
    }
  }
  return result;
};

export const findTotal = (object, field) => {
  let result = 0;
  for (let i = 0; i < object.length; i++) {
    result += object[i][`${field}`];
  }
  return result;
};

export const selectFieldFromObject = (select, object, field, value) => {
  let result = null;
  for (let i = 0; i < object.length; i++) {
    if (object[i][`${field}`] === value) {
      //console.log(`Found Match For`,object[i][`${field}`]);
      result = object[i][`${select}`];
    }
  }
  return result;
};

export const countFromObject = (object, field, value) => {
  let result = 0;
  for (let i = 0; i < object.length; i++) {
    if (object[i][`${field}`] === value) {
      result++;
    }
  }
  return result;
};

export const getUserFromToken = (token) => {
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      // ignore
    }
  }
  return null;
};

export const sanitizePhoneNumber = (number) => {
  let phoneNumber = '';
  const getFist3Digit = number.slice(0, 3);
  if (number.charAt(0) == 0) {
    phoneNumber = `233${number.slice(1)}`;
  } else if (number.charAt(0) === '+') {
    phoneNumber = number.slice(1);
  } else if (getFist3Digit === `233`) {
    //console.log(`Number At 233`,number);
    phoneNumber = number;
  } else if (number.length < 10) {
    //console.log(`Number is less than 10`,number);
    phoneNumber = `233${number}`;
  }

  //console.log(`getFist3Digit`,getFist3Digit);

  return phoneNumber;
};

export function getBracketString(txt) {
  let regExp = /\(([^)]+)\)/;
  let matches = regExp.exec(txt);
  if (matches) return matches[1];
}
export function getSquareBracketWithBackets(txt) {
  let regExp = /\[([^)]+)\]/;
  let matches = regExp.exec(txt);
  if (matches) return [matches[1]];
}
export function getSquareBracketString(txt) {
  let regExp = /\[([^)]+)\]/;
  let matches = regExp.exec(txt);
  if (matches) return matches[1];
}
export function removeBracketWithString(txt) {
  if (txt.length !== 0) return txt.replace(/ *\([^)]*\) */g, '');
}
export function removeSquareBracketWithString(txt) {
  if (txt.length !== 0) return txt.replace(/ *\[[^)]*\] */g, '');
}

export function removeBracketStringByType(txt, type) {
  if (txt.length !== 0 && type === '[]')
    return txt.replace(/ *\[[^)]*\] */g, '');
  if (txt.length !== 0 && type === '()')
    return txt.replace(/ *\([^)]*\) */g, '');
  return false;
}
