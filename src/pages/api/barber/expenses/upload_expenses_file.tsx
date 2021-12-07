import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
const fsPromises = require("fs").promises;
import Axios, { setAuthToken } from '@edcarlos/services/auth/jwt-auth';
import helper from '@edcarlos/libs/@edcartech/helpers/appHelper'
//import Axios from 'axios';
import { appDirectories, initialUrl } from "shared/constants/AppConst";
//import {useDispatch, useSelector} from 'react-redux';
//import {doInsert,doUpdate,doDelete} from '../../redux/actions/Safety';
import { authQuery } from '../../../../@edcarlos/libs/@edcartech/mysql/db';


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

    const { onlineExpenseFileUploadDir, onlineAvatarRWDir } = appDirectories;

    try {
      const docFile = data.files.File;//File because that was the appended formdata
      const filePath = docFile.filepath;
      const dbFileName = data.fields.filename;
      const dbRecord = data.fields.id;
      const oldFileName = data.fields.oldfilename

      console.log(`docFile`, docFile);
      console.log(`filePath`, filePath);
      console.log(`oldfilename-- `, data.fields.oldfilename);
      console.log(`dbFileName`, dbFileName);
      console.log(`dbRecord`, dbRecord);



      //const pathToWriteImage = `${appDirectories.avatarRWDir}${dbFileName}`;// Main Working Local upload
      const ReadFile = await fs.readFile(filePath);
      //await fs.writeFile(pathToWriteImage, image);// Write File to Local Folder   Works Only on Local Upload & Node Supported Hosting Server
      //const pathToWriteImage = `./public/assets/images/avatar/${dbFileName}`; // include name and .extention, you can get the name from data.files.image object
      //-------------------TRY COPY FILE THROUGH FTP REMOTE  https://edcartech.com/ImageHub/policy_system/avatar/
      let c = new Client();//https://github.com/mscdex/node-ftp
      //c.put(image, '/domains/edcartech.com/public_html/ImageHub/policy_system/avatar/fooa.e.png', function(err) {
      //c.put(image, `${appDirectories.avatarRWDir}${dbFileName}`, function(err) {
      c.put(ReadFile, `${onlineExpenseFileUploadDir}${dbFileName}`, function (err) {
        //c.put(ReadFile, `${onlineAvatarRWDir}${dbFileName}`, function(err) {
        if (err) throw err;
        c.end();
        c.logout();
      });
      c.connect({
        /*
        host:'edcartech.com',
        port:21,
        user:'u160148732',
        password:'Carlos.87',
        */
        host: process.env.FILE_UPLOAD_HOST,                                      //'edcartech.com', // ex: files.000webhost.com
        port: process.env.FILE_UPLOAD_PORT,
        user: process.env.FILE_UPLOAD_USER,
        password: process.env.FILE_UPLOAD_PASS,
      });

      // console.log(`Host`,process.env.FILE_UPLOAD_HOST);
      // console.log(`Port`,process.env.FILE_UPLOAD_PORT);
      // console.log(`User`,process.env.FILE_UPLOAD_USER);
      // console.log(`Pass`,process.env.FILE_UPLOAD_PASS);
      //-------------------TRY COPY FILE THROUGH FTP REMOTE ftp://edcartech.com/public_html/ImageHub/policy_system/avatar/

      //++++++++++++++++++++++ Get and Delete Old File ++++++++++++++++++++++++++++
      //This Should be done before updating perhaps 


      if (oldFileName != undefined && dbRecord !== 0) {
        console.log(`Very Good Time to Delete Old file`)

        //const get_old_file_name:any = await authQuery(`SELECT expenses_file FROM shop_expenses WHERE id = ?`, dbRecord )
        let d = new Client();
        d.delete(`${onlineExpenseFileUploadDir}${oldFileName}`, function (err) {
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

      }

      /*
      const get_old_file_name:any = await authQuery(`SELECT expenses_file FROM shop_expenses WHERE id = ?`, dbRecord )
      let d = new Client();
      d.delete(`${onlineExpenseFileUploadDir}${get_old_file_name[0].expenses_file}`, function(err) {
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
          */
      //++++++++++++++++++++++ Get and Delete Old File ++++++++++++++++++++++++++++

      /*
    console.log("Full Data to save",data.fields)
    console.log("Db RecordID",dbRecord)
    console.log("To the Db",{expenses_file:dbFileName,id:dbRecord})
    const body = {expenses_file:dbFileName, id:dbRecord};
    const results:any = authQuery(`UPDATE shop_expenses SET expenses_file = ? WHERE id= ? `,[body.expenses_file, body.id])
      */

      res.status(200).send(helper.createResponse(200, 1, "image uploaded!", ""));
      //res.status(200).send(helper.createResponse(200,1,"image uploaded!",results[0]));

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