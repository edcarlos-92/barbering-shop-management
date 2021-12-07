import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
const fsPromises = require("fs").promises;
import Axios, { setAuthToken } from '../../@edcarlos/services/auth/jwt-auth';
import helper from '../../@edcarlos/libs/@edcartech/helpers/appHelper'
//import Axios from 'axios';
import { appDirectories, initialUrl } from "shared/constants/AppConst";
//import {useDispatch, useSelector} from 'react-redux';
//import {doInsert,doUpdate,doDelete} from '../../redux/actions/Safety';
import { useEffect } from "react";
import { authQuery } from '../../@edcarlos/libs/@edcartech/mysql/db';


const Client = require('ftp'); //alt jsftp


// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  }
};


export default async function handler(req, res) {



  if (req.method === 'POST') {
    // Process a POST request

    // parse form with a Promise wrapper
    const data: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    try {
      const imageFile = data.files.avatar; // .avatar because I named it in client side by that name: // fdata.append("avatar", currentFile);
      const dbFileName = data.fields.filename;
      const dbRecord = data.fields.id;
      const imagePath = imageFile.filepath;
      const pathToWriteImage = `${appDirectories.avatarRWDir}${dbFileName}`;// Main Working Local upload
      const image = await fs.readFile(imagePath);
      //await fs.writeFile(pathToWriteImage, image);// Write File to Local Folder   Works Only on Local Upload & Node Supported Hosting Server
      //const pathToWriteImage = `./public/assets/images/avatar/${dbFileName}`; // include name and .extention, you can get the name from data.files.image object
      //-------------------TRY COPY FILE THROUGH FTP REMOTE  https://edcartech.com/ImageHub/policy_system/avatar/
      let c = new Client();//https://github.com/mscdex/node-ftp
      //c.put(image, '/domains/edcartech.com/public_html/ImageHub/policy_system/avatar/fooa.e.png', function(err) {
      //c.put(image, `${appDirectories.avatarRWDir}${dbFileName}`, function(err) {
      c.put(image, `${appDirectories.onlineAvatarRWDir}${dbFileName}`, function (err) {
        if (err) throw err;
        c.end();
        c.logout();
      });
      c.connect({
        host: process.env.FILE_UPLOAD_HOST,
        port: process.env.FILE_UPLOAD_PORT,
        user: process.env.FILE_UPLOAD_USER,
        password: process.env.FILE_UPLOAD_PASS,
      });

      // File upload configuration
      const config = {
        host: process.env.FILE_UPLOAD_HOST,
        port: process.env.FILE_UPLOAD_PORT,
        username: process.env.FILE_UPLOAD_USER,
        password: process.env.FILE_UPLOAD_PASS,
      };
      // File upload via FTP
      let c = new Client();
      c.connect({
        host: process.env.FILE_UPLOAD_HOST,
        port: process.env.FILE_UPLOAD_PORT,
        user: process.env.FILE_UPLOAD_USER,
        password: process.env.FILE_UPLOAD_PASS,
      });

      //++++++++++++++++++++++ Get and Delete Old File ++++++++++++++++++++++++++++

      const get_old_file_name: any = await authQuery(`SELECT avatar FROM system_users WHERE id = ?`, dbRecord)
      //console.log(`get_old_file_name`, get_old_file_name[0].avatar);
      let d = new Client();
      d.delete(`${appDirectories.onlineAvatarRWDir}${get_old_file_name[0].avatar}`, function (err) {
        if (err) throw err;
        d.end();
        d.logout();
      });
      d.connect({
        host: process.env.FILE_UPLOAD_HOST,
        port: process.env.FILE_UPLOAD_PORT,
        user: process.env.FILE_UPLOAD_USER,
        password: process.env.FILE_UPLOAD_PASS,
      });
      //++++++++++++++++++++++ Get and Delete Old File ++++++++++++++++++++++++++++






      //store path in DB
      console.log("Full Data to save", data.fields)
      console.log("Db RecordID", dbRecord)
      console.log("To the Db", { avatar: dbFileName, id: dbRecord })
      //dispatch(doUpdate('update_avatar',{avatar:dbFileName,id:dbRecord}));
      //const TOKEN_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQwMzkxMTgwLCJleHAiOjE2NDA1NzExODB9.Qb7IWsmm9vBHAXQdELbHBjk-w16eiHkEdgAEiOiW3sM'
      const TOKEN_KEY = data.fields.token;
      const API_Link = 'users/user_avator'
      const body = { avatar: dbFileName, id: dbRecord };
      //url: `/${API_Link}/${body.id}`,
      /*
      await Axios({ method: 'PUT', url: `/${API_Link}`,headers: {Authorization: `Bearer ${TOKEN_KEY}`}, data: body})
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
      */

      const results: any = authQuery(`UPDATE system_users SET avatar = ? WHERE id= ? `, [body.avatar, body.id])

      res.status(200).send(helper.createResponse(200, 1, "image uploaded!", results[0]));

      //res.status(200).json({ message: 'image uploaded!'});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  } else {
    res.status(405).json({ message: 'This Should be a PUT Method' });
  }



}




























/*
export default async (req, res) => {
    if (req.method === 'POST') {


    };
};
*/