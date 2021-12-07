import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Filter from 'bad-words'
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db'
import helper, { fetchTokenid } from '@edcarlos/libs/@edcartech/helpers/appHelper'
const filter = new Filter()

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {

        await helper.checkPermission(req, "v", async function (isPermited: any) {
            if (isPermited) {

                const gottenTokenid = fetchTokenid()
                const checker = 'd37fd3f6-2be2-4d04-88c4-fb3e270249e5-';

                const { id, item_name, description, created_at } = req.body[0]
                console.log(`Looping..For..`, id)
                try {
                    const get_records: any = await query(`SELECT * FROM expenses_items WHERE item_name=?`, [item_name])
                    if (get_records.length == 0 || get_records.length == undefined) {
                        console.log(`Length...`, get_records.length, `ID Not Found Good For Insert For `, id, `On--------`, item_name)

                        const results = await query(
                            `INSERT INTO expenses_items
                                      (
                                        id,
                                        item_name,
                                        description,
                                        created_at
                                      ) VALUES (?,?,?,?)
                                      `,
                            [
                                id,
                                item_name,
                                description,
                                created_at
                            ]
                        )
                    }
                    else {

                        console.log(`Length...`, get_records.length, `Found ID Good For Update On`, get_records[0].id, `On--------`, item_name)
                        console.log(`...Now Show what you have...`, get_records)
                        const results: any = await query(
                            `UPDATE expenses_items SET 
                                        item_name = ?,
                                        description = ?,
                                        created_at = ? WHERE id = ? `,
                            [
                                item_name,
                                description,
                                created_at,
                                get_records[0].id
                            ]
                        )
                    }

                } catch (e: any) {
                    return res.status(500).json({ message: e.message })
                }

                return res.status(200).send(helper.createResponse(200, 1, "Done", req.body.length));

            } else {
                res.status(403).send(helper.createResponse('Error', 0, 'Token Not Found', ""));
            }

        });

    } else {
        res.status(405).json({ message: 'This Should be a POST Method' });
    }

}

export default handler



// ON DUPLICATE KEY UPDATE
// id =  VALUES(id),
// item_name =  VALUES(item_name),
// description =  VALUES(description),
// created_at = VALUES(created_at),
// discount_type = VALUES(discount_type),
// discount = VALUES(discount),
// total_service_cost = VALUES(total_service_cost)