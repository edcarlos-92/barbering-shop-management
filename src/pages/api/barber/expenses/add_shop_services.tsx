import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { authQuery } from '../../../../@edcarlos/libs/@edcartech/mysql/db';
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper';
const bcrypt = require('bcryptjs');

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {

        await helper.checkPermission(req, "v", async function (isPermited: any) {
            if (isPermited) {

                const { id, expenses_id, service_description, service_price, price_date } = req.body
                try {

                    if (!expenses_id || !service_price) {
                        return res.status(400).json({ message: '`expenses_id`, `service_description` are all required' })
                    }
                    const results = authQuery(
                        `INSERT INTO shop_services
                        (
                        id,
                        expenses_id,
                        service_description,
                        service_price,
                        price_date
                        ) VALUES (?,?,?,?,?)  
                        `,
                        [
                            id,
                            expenses_id,
                            service_description,
                            service_price,
                            price_date
                        ]
                    )
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
