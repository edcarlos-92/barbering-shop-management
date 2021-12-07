import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db'
import helper from '@edcarlos/libs/@edcartech/helpers/appHelper'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {

    //Check Token if needed
    // await helper.checkPermission(req,"v", async function (isPermited:any) {
    //     if(isPermited){

    try {

      const get_records = await query(`SELECT * FROM service_booking ORDER BY id DESC`)
      res.status(200).send(helper.createResponse(200, 1, "Record found", get_records));
      //return res.json(service_booking[0])
    } catch (e: any) {
      res.status(500).json({ message: e.message })
    }

    //     } else{
    //             res.status(403).send(helper.createResponse('Error',0,'Token Not Found',""));
    //     }
    // });

  } else {
    res.status(405).json({ message: 'This Should be a GET Method' });
  }



}

export default handler