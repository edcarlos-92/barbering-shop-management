import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { authQuery, query } from '@edcarlos/libs/@edcartech/mysql/db'
import helper from '@edcarlos/libs/@edcartech/helpers/appHelper'


const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {


  if (req.method === 'GET') {

    //Check Token if needed
    // await helper.checkPermission(req, "v", async function (isPermited: any) {
    //   if (isPermited) {
        //console.log(`Token Found For Users Records`, helper.extractToken)

        //const { id } = req.query
        //id: user.id,user_role:user.user_role 
        const { id,user_role }:any = req.query


        console.log(`req.query Group`,req.query);

        try {
          if (!id) {
            return res.status(400).json({ message: '`id` required' })
          }
          if (typeof parseInt(id.toString()) !== 'number') {
            return res.status(400).json({ message: '`id` must be a number' })
          }
          //const get_records = await query(`SELECT system_notifications.id,system_notifications.text_message as message FROM system_notifications,system_users where system_users.user_notification=1 and system_notifications.notification_type='Group' and system_notifications.role_or_user_id='Bank Manager' and  system_users.user_role = 'Bank Manager' and system_users.id = ? ORDER BY created_at DESC` ,[id,user_id] )  
          const get_records: any = await authQuery(`SELECT system_notifications.id,system_notifications.text_message as message FROM system_notifications,system_users where system_users.user_notification=1 and system_notifications.notification_type='Group' and system_notifications.role_or_user_id=? and  system_users.user_role = ? and system_users.id = ? ORDER BY created_at DESC`, [user_role,user_role,id])

          console.log(`get_records Group`,get_records);

          res.status(200).send(helper.createResponse(200, 1, "Record found", get_records[0]));

          //return res.json(system_users[0])
        } catch (e: any) {
          res.status(500).json({ message: e.message })
        }
    //   } else {
    //     res.status(403).send(helper.createResponse('Error', 0, 'Token Not Found', ""));
    //   }
    // });

  } else {
    res.status(405).json({ message: 'This Should be a GET Method' });
  }



}

export default handler