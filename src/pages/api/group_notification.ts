import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '@edcarlos/libs/@edcartech/mysql/db';
import helper, { fetchTokenid } from '@edcarlos/libs/@edcartech/helpers/appHelper'
import { smsMessaging, emailMessaging } from '@edcarlos/utility/AppMessaging';
// import { appIntl } from "@edcarlos/utility/helper/Utils";
//emailMessaging(`semecaland1@gmail.com`,`Hi Edorh Carlos`,`Test Mail`)

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {

        //const  messages  = appIntl();

        await helper.checkPermission(req, "v", async function (isPermited: any) {
            if (isPermited) {

                const { id, user_id, sms_notification, email_notification, push_notification, text_message, created_at, notification_type, role_or_user_id } = req.body
                const sender = fetchTokenid()

                try {
                    console.log(`Role ID`, role_or_user_id)

                    console.log(` Adding Notifications SMS`, sms_notification, `EMAIL `, email_notification, `PUSH `, push_notification)

                    if (!role_or_user_id || !text_message) {//
                        return res.status(400).json({ message: 'user_id & text_message are all required' })
                    }


                    const get_records: any = await query(`SELECT * FROM system_users WHERE user_role=? `, [role_or_user_id])
                    if (get_records.length != 0 || get_records.length != undefined) {

                    const results = query(
                        `INSERT INTO system_notifications
                        (
                        id,
                        customer_id,
                        sms_notification,
                        email_notification,
                        push_notification,
                        text_message,
                        sender,
                        created_at,
                        notification_type,
                        role_or_user_id
                        ) VALUES (?,?,?,?,?,?,?,?,?,?)
                        `,
                        [
                            id,
                            role_or_user_id,
                            sms_notification,
                            email_notification,
                            push_notification,
                            text_message,
                            sender,
                            created_at,
                            notification_type,
                            role_or_user_id
                        ]
                    )
                    .then( async (rows:any)  => {

                        for (let i = 0; i < get_records.length; i++){
                            const { id,display_name, user_phone_number, user_email } = get_records[i];
                            console.log(`Found User for Roles`,get_records.length);
                            console.log(`display_name`, display_name);
                            console.log(`user_phone_number`, user_phone_number);
                            console.log(`user_email`, user_email);
                            const textMessage = `Dear ${display_name} ${text_message}`;
                            if (sms_notification === true && user_phone_number !== 0) {
                                console.log(`Sending SMS...`);
                            }
                            if (email_notification === true && user_email !== 0) {
                                await emailMessaging(user_email, textMessage, `INFORMATION`).catch(console.error);
                                console.log(`Sending Email...`);
                            }
                            if (push_notification === true) {
                                query(`UPDATE system_users SET  user_notification = 1 WHERE id = ? `, [id])
                                console.log(`Sending Notification...`);
                            }


                        }


                            // const get_customer_records: any = await query(`SELECT * FROM system_users WHERE id=? `, [user_id])
                            // const { display_name, user_phone_number, user_email } = get_customer_records[0]
                            // console.log(`Information about clients`, display_name)
                            // const textMessage = `Dear ${display_name} ${text_message}`;
                            // if (sms_notification === true && user_phone_number !== 0) {
                            //     //await smsMessaging(user_phone_number, textMessage);
                            //     console.log(`Sending SMS...`);
                            // }
                            // if (email_notification === true && user_email !== 0) {
                            //     await emailMessaging(user_email, textMessage, `INFORMATION`).catch(console.error);
                            //     console.log(`Sending Email...`);
                            // }
                            // if (push_notification === true) {
                            //     query(`UPDATE system_users SET  user_notification = 1 WHERE id = ? `, [user_id])
                            //     //await emailMessaging(user_email, textMessage, `INFORMATION`).catch(console.error);
                            //     console.log(`Sending Notification...`);
                            // }
                    }); 
                    res.status(200).send(helper.createResponse(200, 1, "Record Inserted", results));







                    }






                   
                    //console.log(`Record Added Successfully `,results)
                    //res.end(JSON.stringify(results));

                    //return res.json(results)
                } catch (e: any) {
                    res.status(500).json({ message: e.message })
                }
            } else {
                res.status(403).send(helper.createResponse('Error', 0, 'Token Not Found', ""));
            }

        });

    } else {
        res.status(405).json({ message: 'This Should be a POST Method' });
    }
}

export default handler
