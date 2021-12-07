import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Filter from 'bad-words'
import { authQuery } from '../../@edcarlos/libs/@edcartech/mysql/db'
import helper from '../../@edcarlos/libs/@edcartech/helpers/appHelper'

const filter = new Filter()
const bcrypt = require('bcryptjs');



const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'PUT') {

    //Check Token if needed
    await helper.checkPermission(req, "v", async function (isPermited: any) {
      if (isPermited) {
        //console.log(`Token Found For Users Records`, helper.extractToken)
        const { id, password, oldpassword } = req.body
        try {
          if (!id || !password) {
            return res
              .status(400)
              .json({ message: '`password` is required' })
          }

          const result: any = await authQuery(`SELECT * FROM system_users WHERE id = ?`, id)
          bcrypt.compare(oldpassword, result[0]['user_pass'], (bcryptErr: any, bcryptResult: any) => {
            if (bcryptResult) {
              // If Successful then save new password
              var salt = bcrypt.genSaltSync(10);
              bcrypt.hash(password, salt, (err: any, hash: any) => {
                //Change Password Now
                //const results:any = authQuery(`UPDATE system_users SET user_pass = ? WHERE id = ? `,[filter.clean(hash), id])                        
                const results: any = authQuery(`UPDATE system_users SET user_pass = ? WHERE id = ? `, [hash, id])
                res.status(200).send(helper.createResponse(200, 1, "Record Updated", results[0]));
              });
            }
            else {
              //console.log("Sorry Cannot Update...."); 
              return res.status(500).send({ msg: `Password Mismatch ${bcryptErr}` });
            }

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