import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { authQuery } from '../../../../@edcarlos/libs/@edcartech/mysql/db'
import helper from '../../../../@edcarlos/libs/@edcartech/helpers/appHelper'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'DELETE') {

    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {

        const { id } = req.query

        //console.log(`Gotten into id and checked permission for `,id)

        try {
          if (!id) {
            return res.status(400).json({ message: '`id` required' })
          }
          //   if (typeof parseInt(id.toString()) !== 'number') {
          //     return res.status(400).json({ message: '`id` must be a number' })
          //   }
          const results = await authQuery(`DELETE FROM shop_services WHERE id = ?`, id)

          //console.log(`ScoreBoard Record Deleted`,results)
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
