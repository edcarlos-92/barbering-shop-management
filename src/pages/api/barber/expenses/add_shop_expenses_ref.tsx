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

                //console.log(`entered API`,req.body )

                const { id, ex_shop_expenses_reference_id, item_id, quantity, total_cost } = req.body[0]
                console.log(`Looping..For..`, id)
                try {

                    const get_records: any = await query(`SELECT * FROM shop_expenses_ref WHERE (ex_shop_expenses_reference_id=? and id =?) or (ex_shop_expenses_reference_id=? and item_id =?) `, [ex_shop_expenses_reference_id, id, ex_shop_expenses_reference_id, item_id])
                    if (get_records.length == 0 || get_records.length == undefined) {
                        console.log(`Length...`, get_records.length, `ID Not Found Good For Insert For `, id, `On--------`, ex_shop_expenses_reference_id)

                        //console.log(`ID Not Found Good For Insert For ${i} `,id,`On--------`,ex_shop_expenses_reference_id)

                        const results = await query(
                            `INSERT INTO shop_expenses_ref
                                      (
                                        id,
                                        ex_shop_expenses_reference_id,
                                        item_id,
                                        quantity,
                                        total_cost
                                      ) VALUES (?,?,?,?,?)
                                      `,
                            [
                                id,
                                ex_shop_expenses_reference_id,
                                item_id,
                                quantity,
                                total_cost
                            ]
                        )
                    }
                    else {

                        console.log(`Length...`, get_records.length, `Found ID Good For Update On`, get_records[0].id, `On--------`, ex_shop_expenses_reference_id)
                        console.log(`...Now Show what you have...`, get_records)
                        const results: any = await query(
                            `UPDATE shop_expenses_ref SET 
                                        ex_shop_expenses_reference_id = ?,
                                        item_id = ?,
                                        quantity = ?,
                                        total_cost = ? WHERE id = ? `,
                            [
                                ex_shop_expenses_reference_id,
                                item_id,
                                quantity,
                                total_cost,
                                get_records[0].id
                            ]
                        )
                    }

                } catch (e: any) {
                    return res.status(500).json({ message: e.message })
                }





















                //console.log(`Got Data After Declaration`, req.body[i].id )

                // if (!item_id || !ex_shop_expenses_reference_id) {
                //     console.log(`item_id and ex_shop_expenses_reference_id Not Exist`)
                //     //--> Do Nothing if there is no records
                // }else{
                //     //procceed to the loop
                //     //console.log(`Got Data`,req.body[i].id )
                // }

                //}
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