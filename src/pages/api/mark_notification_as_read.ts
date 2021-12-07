import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Filter from 'bad-words'
import { authQuery } from '@edcarlos/libs/@edcartech/mysql/db'
import helper from '@edcarlos/libs/@edcartech/helpers/appHelper'


const filter = new Filter()

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'PUT') {

    //Check Token if needed
    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {
        //console.log(`Token Found For Users Records`, helper.extractToken)
        const  {id}:any  = req.query
        try {
          if (!id) {
            return res
              .status(400)
              .json({ message: '`id`,`display_name`, and `user_email` are all required' })
          }
          const results: any = await authQuery(`UPDATE system_users SET  user_notification = 0 WHERE id = ? `, [id])
          
          //query(`UPDATE system_users SET  user_notification = 1 WHERE id = ? `, [id])
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