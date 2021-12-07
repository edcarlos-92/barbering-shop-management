import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Filter from 'bad-words';
import { authQuery } from '../../../../@edcarlos/libs/@edcartech/mysql/db';
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper';
const bcrypt = require('bcryptjs');

const filter = new Filter()

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'PUT') {

    //Check Token if needed
    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {
        const { id, service_name, service_description, service_price, price_date } = req.body
        try {
          if (!service_name || !service_price) {
            return res
              .status(400)
              .json({ message: '`id`,`service_name`, `service_description` are all required' })
          }

          const results: any = authQuery(
            `UPDATE shop_services SET             
                service_name = ?,
                service_description = ?,
                service_price = ?,
                price_date = ? WHERE id = ? `,
            [
              service_name,
              service_description,
              service_price,
              price_date,
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