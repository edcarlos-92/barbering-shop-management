import React from 'react'
//import Axios, { setAuthToken } from '../../@edcarlos/services/auth/jwt-auth';
import {notificationConst} from 'shared/constants/AppConst';
import axios from 'axios';

const nodemailer = require("nodemailer");

//http://rslr.connectbind.com:8080/bulksms/bulksms?username=${txtGhanaUser}&password=${txtGhanaPass}&type=0&dlr=0&destination=${phoneNumber}&source=${smsSenderID}&message=${textMessage}<&url=KKKK>
//http://rslr.connectbind.com:8080/bulksms/bulksms?username=${txtGhanaUser}&password=${txtGhanaPass}&type=0&dlr=0&destination=${phoneNumber}&source=${smsSenderID}&message=${textMessage}
export const smsMessaging = async (phoneNumber,textMessage)=>{

    const {smsSenderID,smsClientID,smsAPIKey,txtGhanaUser,txtGhanaPass} = notificationConst
    //const API_Link = `https://my.forwardvaluesms.com/vendorsms/pushsms.aspx?apiKey=${smsAPIKey}&clientid=${smsClientID}&msisdn=${phoneNumber}&sid=${smsSenderID}&msg=${textMessage}&fl=0`
    const API_Link = `http://rslr.connectbind.com:8080/bulksms/bulksms?username=${txtGhanaUser}&password=${txtGhanaPass}&type=0&dlr=0&destination=${phoneNumber}&source=${smsSenderID}&message=${textMessage}`
    axios.post(API_Link)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
}

export const emailMessaging = async (toEmail,textMessage,emailSubject) =>{

  const {emailUser,emailPass,emailHost,emailFrom,emailPort,emailHeadImage} = notificationConst

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host:  emailHost,//'smtp.your-email.com'
    port: emailPort,
    secure: true, // true for 465, false for other ports
    address:emailHost,
    auth: {
      user: emailUser, // generated ethereal user
      pass: emailPass, // generated ethereal password
    },
  });

  try {
      // send mail with defined transport object
      let messageInfo = await transporter.sendMail({
        from: emailFrom, // sender address  '"Fred Foo 👻" <mailing@edcartech.com>'
        to: toEmail, // list of receivers "edcartech@gmail.com,semecaland1@gmail.com"
        subject: emailSubject, // Subject line "Hello ✔"
        //text: textMessage, // plain text body  "Hello Carlos This is a test mail?"
        html: `

            <div style="width:500px;overflow: auto;margin:auto;border-radius: 6px;border: 1px solid #ccc">
                <body style="margin:0;padding:0;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                        <tr>
                        <td align="center" style="padding:0;">
                            <table role="presentation" style="width:500px;border-collapse:collapse;border-spacing:0;text-align:left;">
                            <tr>
                                <td align="center" style="padding:40px 0 30px 0;">
                                <img src="${emailHeadImage}" alt="" width="300" style="height:auto;display:block;" />
                                </td>
                            </tr> 
                            <tr>
                                <td style="padding:36px 30px 42px 30px;">
                                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                    <tr>
                                    <td style="padding:0 0 36px 0;color:#153643;">
                                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Hello !!!</h1>
                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                            ${textMessage}                                    
                                        </p>
                                        
                                    </td>
                                    </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            <tr>    
                        </tr>
                    </table>
                </body>
            </div>
            
        `, // html body "<b>Hello world?</b>"
      });
      //console.log(`NodeMailer Result`,messageInfo);
    } catch (err) {
    console.error(err);
  }
  
}

