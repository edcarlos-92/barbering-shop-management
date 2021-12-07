import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db'
import helper from '@edcarlos/libs/@edcartech/helpers/appHelper'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    try {
      //const {id} = req.query
      const get_records = await query(`SELECT ex_shop_expenses_reference_id as id, ROUND(SUM(total_cost), 2) as itemValue FROM shop_expenses_ref GROUP BY ex_shop_expenses_reference_id`)
      res.status(200).send(helper.createResponse(200, 1, "Record found", get_records));
      //return res.json(shop_expenses_ref[0])
    } catch (e: any) {
      res.status(500).json({ message: e.message })
    }
  } else {
    res.status(405).json({ message: 'This Should be a GET Method' });
  }

}

export default handler