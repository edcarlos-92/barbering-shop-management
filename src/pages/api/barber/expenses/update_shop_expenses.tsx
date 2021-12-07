import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db';
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'PUT') {

    //Check Token if needed
    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {
        const { id, expenses_type_id, shop_expenses_reference_id, expenses_note, expenses_file, expenses_date, expenses_amount, created_at } = req.body
        console.log(`---------------Updating ID+++++++++++++++++++++++++`, id)
        try {

          if (!expenses_type_id || !shop_expenses_reference_id) {
            return res.status(400).json({ message: ' `booking_date` are all required' })
          }

          const results: any = query(
            `UPDATE shop_expenses SET  
                expenses_type_id =?,
                shop_expenses_reference_id =?,
                expenses_note =?,
                expenses_file =?,
                expenses_date =?,
                expenses_amount =?,
                created_at =? WHERE id = ? `,
            [
              expenses_type_id,
              shop_expenses_reference_id,
              expenses_note,
              expenses_file,
              expenses_date,
              expenses_amount,
              created_at,
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