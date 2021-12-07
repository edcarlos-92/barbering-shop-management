import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db'
import helper from '@edcarlos/libs/@edcartech/helpers/appHelper'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const get_records = await query(`SELECT SUM(total_service_cost) as grand_total FROM service_sales_ref WHERE ex_service_reference_id = ?`, id)
      res.status(200).send(helper.createResponse(200, 1, "Record found", get_records));
      //return res.json(service_sales_ref[0])
    } catch (e: any) {
      res.status(500).json({ message: e.message })
    }
  } else {
    res.status(405).json({ message: 'This Should be a GET Method' });
  }



}

export default handler