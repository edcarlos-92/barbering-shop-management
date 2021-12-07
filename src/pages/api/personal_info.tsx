import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Filter from 'bad-words'
import { authQuery } from '../../@edcarlos/libs/@edcartech/mysql/db'
import helper from '../../@edcarlos/libs/@edcartech/helpers/appHelper'


const filter = new Filter()

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'PUT') {

    //Check Token if needed
    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {
        //console.log(`Token Found For Users Records`, helper.extractToken)
        const { id, display_name, user_email } = req.body
        try {
          if (!id || !display_name || !user_email) {
            return res
              .status(400)
              .json({ message: '`id`,`display_name`, and `user_email` are all required' })
          }
          //mysqlAuthConnection.query("UPDATE system_users SET user_login = ?,user_nicename = ?,user_phone_number = ?,user_email = ?,user_url = ?,user_registered = ?,user_activation_key = ?,user_status = ?,user_role = ?,display_name = ?,avatar = ?,updated_at = ?,user_section = ? WHERE id= ?",[ system_users.user_login, system_users.user_nicename, system_users.user_phone_number, system_users.user_email, system_users.user_url, system_users.user_registered, system_users.user_activation_key, system_users.user_status, system_users.user_role, system_users.display_name, system_users.avatar, system_users.updated_at, system_users.user_section,id], function (err:any, res:any) {

          const results: any = await authQuery(`UPDATE system_users SET display_name = ?, user_email = ? WHERE id = ? `, [filter.clean(display_name), filter.clean(user_email), id])
          res.status(200).send(helper.createResponse(200, 1, "Record found", results[0]));

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







/*
export const personalInfoHandler = async (acceptedFiles,target) => {
    
  try {
      const response = await fetch(`/api/${target}`, {
          method: 'POST',
          body: acceptedFiles,
      });
      const data = await response.json();
      if (!response.ok) {
          throw data;
      }
  } catch (error:any) {
      console.log(error.message);
  }
};
*/