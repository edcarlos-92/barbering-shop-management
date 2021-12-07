import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../../@edcarlos/libs/@edcartech/mysql/db'
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'DELETE') {

    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {

        const { id } = req.query
        try {
          if (!id) {
            return res.status(400).json({ message: '`id` required' })
          }
          const results = await query(`DELETE FROM expenses_items WHERE id = ?`, id);
          res.status(200).send(helper.createResponse(200, 1, "Record Deleted", results));
          //res.json(results)
        } catch (e: any) {
          res.status(500).json({ message: e.message })
        }

      } else {
        res.status(403).send(helper.createResponse('Error', 0, 'Token Not Found', ""));
      }
    });

  } else {
    res.status(405).json({ message: 'This Should be a DELETE Method' });
  }

}

export default handler
