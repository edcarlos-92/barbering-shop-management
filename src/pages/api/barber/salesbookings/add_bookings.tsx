import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db';
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper';
import { smsMessaging, emailMessaging } from '@edcarlos/utility/AppMessaging';
// import { appIntl } from "@edcarlos/utility/helper/Utils";
//emailMessaging(`semecaland1@gmail.com`,`Hi Edorh Carlos`,`Test Mail`)

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {



    if (req.method === 'POST') {

        //const  messages  = appIntl();


        await helper.checkPermission(req, "v", async function (isPermited: any) {
            if (isPermited) {

                const { id, customer_id, booking_date, status, payment_status, sms_notification, push_notification, service_reference_id, email_notification, assignment, issuer, created_at, updated_at, grand_total } = req.body
                try {

                    console.log(` Adding Notifications SMS`, sms_notification, `EMAIL `, email_notification, `PUSH `, push_notification)

                    if (!customer_id || !booking_date) {
                        return res.status(400).json({ message: '`booking_date`, `booking_date` are all required' })
                    }
                    const results = query(
                        `INSERT INTO service_booking
                        (
                        id,
                        customer_id,
                        booking_date,
                        status,
                        payment_status,
                        sms_notification,
                        email_notification,
                        push_notification,
                        service_reference_id,
                        grand_total,
                        assignment,
                        issuer,
                        created_at,
                        updated_at
                        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)  
                        `,
                        [
                            id,
                            customer_id,
                            booking_date,
                            status,
                            payment_status,
                            sms_notification,
                            email_notification,
                            push_notification,
                            service_reference_id,
                            grand_total,
                            assignment,
                            issuer,
                            created_at,
                            updated_at
                        ]
                    )

                    //look for client phone & email if exist
                    const get_customer_records: any = await query(`SELECT * FROM customer_reg WHERE id=? `, [customer_id])

                    const { customer_name, customer_phone, customer_email } = get_customer_records[0]

                    console.log(`Information about clients`, customer_name)
                    console.log(`Grand Total GHC `, grand_total)
                    const currencyText = process.env.DEFAULT_CURRENCY //String(messages["common.currency.label"])//common.currency.raw 
                    const textMessage = `Dear ${customer_name} you just paid ${currencyText} ${grand_total} for our service. Thank you for petroinizing us, see you soon`;

                    if (sms_notification === true && customer_phone !== 0) {
                        await smsMessaging(customer_phone, textMessage);
                        console.log(`Sending SMS...`);
                    }
                    if (email_notification === true && customer_email !== 0) {
                        await emailMessaging(customer_email, textMessage, `PAYMENT CONFIRMATION`).catch(console.error);
                        console.log(`Sending Email...`);
                    }

                    //console.log(`Record Added Successfully `,results)
                    res.status(200).send(helper.createResponse(200, 1, "Record Inserted", results));
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
