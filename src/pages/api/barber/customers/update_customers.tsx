import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db';
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper';


const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'PUT') {

    //Check Token if needed
    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {
        const { id, customer_name, customer_phone, customer_email, customer_dob, created_at, updated_at } = req.body
        try {
          if (!customer_name || !customer_phone) {
            return res
              .status(400)
              .json({ message: '`id`,`customer_name`, `customer_phone` are all required' })
          }

          const results: any = query(
            `UPDATE customer_reg SET             
                customer_name = ?,
                customer_phone = ?,
                customer_email = ?,
                customer_dob = ?,
                created_at = ?,
                updated_at = ? WHERE id = ? `,
            [
              customer_name,
              customer_phone,
              customer_email,
              customer_dob,
              created_at,
              updated_at,
              id
            ]
          )
          res.status(200).send(helper.createResponse(200, 1, "Record Updated", results[0]));

          //return res.json(results)
        } catch (e: any) {
          res.status(500).json({ message: e.message })
        }

      } else {
        res.status(403).send(helper.createResponse('Error', 0, 'Token Not Found', ""));
      }
    });

  } else {
    res.status(405).json({ message: 'This Should be a PUT Method' });
  }

}

export default handler