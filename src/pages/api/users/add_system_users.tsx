import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Filter from 'bad-words';
import { authQuery } from '../../../@edcarlos/libs/@edcartech/mysql/db';
import helper from '../../../@edcarlos/libs/@edcartech/helpers/appHelper';
const bcrypt = require('bcryptjs');
const filter = new Filter()

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        await helper.checkPermission(req, "v", async function (isPermited: any) {
            if (isPermited) {

                const { id, user_login, user_pass, user_email, user_registered, user_phone_number, display_name, user_role, updated_at } = req.body
                try {

                    if (!user_email || !user_login || !user_role) {
                        return res.status(400).json({ message: '`user_email`, `user_login` and `user_role` are all required' })
                    }

                    var salt = bcrypt.genSaltSync(10);
                    await bcrypt.hash(user_pass, salt, (err: any, hash: any) => {
                        //const results:any = authQuery(`UPDATE system_users SET user_pass = ? WHERE id = ? `,[hash, id])
                        //res.status(200).send(helper.createResponse(200,1,"Record Updated",results[0]));

                        const results = authQuery(
                            `INSERT INTO system_users
                                            (
                                            id,
                                            user_login,
                                            user_pass,
                                            user_email,
                                            user_registered,
                                            user_phone_number,
                                            display_name,
                                            user_role,
                                            updated_at
                                            ) VALUES (?,?,?,?,?,?,?,?,?)  
                                            `,
                            [
                                id,
                                user_login,
                                hash,
                                user_email,
                                user_registered,
                                user_phone_number,
                                display_name,
                                user_role,
                                updated_at,
                            ]
                        )
                        //console.log(`User Record Added Successfully `,results)
                        res.status(200).send(helper.createResponse(200, 1, "Record Inserted", results));
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
        res.status(405).json({ message: 'This Should be a POST Method' });
    }
}

export default handler
