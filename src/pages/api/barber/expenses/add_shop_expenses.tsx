import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db';
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper';
import { smsMessaging, emailMessaging } from '@edcarlos/utility/AppMessaging';
import { silentInsert, silentDelete, getCustomersData, doSelect, uploadFileHandler } from '../../../../redux/actions';
import { IncomingForm } from 'formidable';
import { AxiosURL, AxiosExpensesURL } from '@edcarlos/services/auth/jwt-auth';


// import { appIntl } from "@edcarlos/utility/helper/Utils";
//emailMessaging(`semecaland1@gmail.com`,`Hi Edorh Carlos`,`Test Mail`)

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {

        //const  messages  = appIntl();

        await helper.checkPermission(req, "v", async function (isPermited: any) {
            if (isPermited) {

                const { id, expenses_type_id, shop_expenses_reference_id, expenses_note, expenses_file, expenses_date, expenses_amount, created_at } = req.body


                try {

                    //console.log(`Here is the Uploaded File.....`,get_file_upload)//,get_file_upload

                    if (!expenses_type_id || !shop_expenses_reference_id) {
                        return res.status(400).json({ message: '`shop_expenses_reference_id`, `shop_expenses_reference_id` are all required' })
                    }
                    const results = query(
                        `INSERT INTO shop_expenses
                        (
                        id,
                        expenses_type_id,
                        shop_expenses_reference_id,
                        expenses_note,
                        expenses_file,
                        expenses_date,
                        expenses_amount,
                        created_at
                        ) VALUES (?,?,?,?,?,?,?,?)  
                        `,
                        [
                            id,
                            expenses_type_id,
                            shop_expenses_reference_id,
                            expenses_note,
                            expenses_file,
                            expenses_date,
                            expenses_amount,
                            created_at
                        ]
                    )

                    // if(get_file_upload !== undefined){
                    //     console.log(`Selected Upload the File now`)
                    //     uploadFile(get_file_upload,`${AxiosExpensesURL()}upload_expenses_file`);
                    // }else{
                    //     console.log(`No file selected to be uploaded`)
                    // }

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


export const uploadFile = async (acceptedFiles, target) => {

    //const dispatch = useDispatch();

    try {
        //const res = await fetch(`${AxiosURL()}display_scoreboard`, { method: 'GET' });
        const response = await fetch(`${target}`, {
            method: 'POST',
            body: acceptedFiles,
        });
        const data = await response.json();
        if (!response.ok) {
            console.log('Handler Error', data);
            throw data;
        } else {
            console.log('Handler Successfull');
        }
    } catch (error: any) {
        console.log(error.message);
    }
};