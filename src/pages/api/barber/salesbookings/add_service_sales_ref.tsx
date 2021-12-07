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


                //for(var i=0; i < req.body.length; i++){

                //const { id,ex_service_reference_id, service_id,quantity,discount_type,discount,total_service_cost} = req.body[i]   
                //console.log(`Looping..`,i, `For..`,id)
                const { id, ex_service_reference_id, service_id, quantity, discount_type, discount, total_service_cost } = req.body[0]
                console.log(`Looping..For..`, id)
                try {
                    //console.log(`Trying.......................................................`,i)
                    //const get_records:any = await query(`SELECT * FROM service_sales_ref WHERE id =?`,[id]) 
                    //---const get_records:any = await query(`SELECT * FROM service_sales_ref WHERE ex_service_reference_id=? and id =?`,[ex_service_reference_id,id])               
                    const get_records: any = await query(`SELECT * FROM service_sales_ref WHERE (ex_service_reference_id=? and id =?) or (ex_service_reference_id=? and service_id =?) `, [ex_service_reference_id, id, ex_service_reference_id, service_id])
                    if (get_records.length == 0 || get_records.length == undefined) {
                        console.log(`Length...`, get_records.length, `ID Not Found Good For Insert For `, id, `On--------`, ex_service_reference_id)

                        //console.log(`ID Not Found Good For Insert For ${i} `,id,`On--------`,ex_service_reference_id)

                        const results = await query(
                            `INSERT INTO service_sales_ref
                                      (
                                        id,
                                        ex_service_reference_id,
                                        service_id,
                                        quantity,
                                        discount_type,
                                        discount,
                                        total_service_cost
                                      ) VALUES (?,?,?,?,?,?,?)
                                      `,
                            [
                                id,
                                ex_service_reference_id,
                                service_id,
                                quantity,
                                discount_type,
                                discount,
                                total_service_cost
                            ]
                        )
                    }
                    else {

                        console.log(`Length...`, get_records.length, `Found ID Good For Update On`, get_records[0].id, `On--------`, ex_service_reference_id)
                        console.log(`...Now Show what you have...`, get_records)
                        const results: any = await query(
                            `UPDATE service_sales_ref SET 
                                        ex_service_reference_id = ?,
                                        service_id = ?,
                                        quantity = ?,
                                        discount_type = ?,
                                        discount = ?,
                                        total_service_cost = ? WHERE id = ? `,
                            [
                                ex_service_reference_id,
                                service_id,
                                quantity,
                                discount_type,
                                discount,
                                total_service_cost,
                                get_records[0].id
                            ]
                        )
                    }

                } catch (e: any) {
                    return res.status(500).json({ message: e.message })
                }





















                //console.log(`Got Data After Declaration`, req.body[i].id )

                // if (!service_id || !ex_service_reference_id) {
                //     console.log(`service_id and ex_service_reference_id Not Exist`)
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



// ON DUPLICATE KEY UPDATE
// id =  VALUES(id),
// ex_service_reference_id =  VALUES(ex_service_reference_id),
// service_id =  VALUES(service_id),
// quantity = VALUES(quantity),
// discount_type = VALUES(discount_type),
// discount = VALUES(discount),
// total_service_cost = VALUES(total_service_cost)