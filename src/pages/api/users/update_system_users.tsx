import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Filter from 'bad-words';
import { authQuery } from '@edcarlos/libs/@edcartech/mysql/db';
import helper from '@edcarlos/libs/@edcartech/helpers/appHelper';
const bcrypt = require('bcryptjs');

const filter = new Filter()

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {

    //Check Token if needed
    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {
        const { id, user_login, user_pass, user_email, user_registered, user_phone_number, display_name, user_role, updated_at } = req.body
        try {
          if (!id || !user_email || !user_login || !user_role) {
            return res
              .status(400)
              .json({ message: '`id`,`user_email`, `user_login`, `user_role` are all required' })
          }

          var salt = bcrypt.genSaltSync(10);
          await bcrypt.hash('password', salt, (err: any, hash: any) => {

            const results: any = authQuery(
              `UPDATE system_users SET 
                            user_login = ?,
                            user_pass = ?,
                            user_email = ?,
                            user_registered = ?,
                            user_phone_number = ?,
                            display_name = ?,
                            user_role = ?,
                            updated_at = ? WHERE id = ? `,
              [
                user_login,
                hash,
                user_email,
                user_registered,
                user_phone_number,
                display_name,
                user_role,
                updated_at,
                id
              ]
            )
            res.status(200).send(helper.createResponse(200, 1, "Record Updated", results[0]));
          });

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