import nextConnect from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable';
import { query } from '@edcarlos/libs/@edcartech/mysql/db';

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET, 
});

export const config = {
  api: {
    bodyParser: false,
  },
};

function onError(err, req, res, next) {
  console.error(`err`,err);
  res.status(500).end(err.toString());
  // OR: you may want to continue
  next();
}
const handler = nextConnect<NextApiRequest, NextApiResponse>({onError});
const upload = multer();

handler.use(upload.single('file')).post(async (req, res) => {

    const check_for_old_file_name:any = await query(`SELECT avatar FROM system_users WHERE id = ?`, req.body.id )
    
    //yhe8DO
    console.log(`check_for_old_file_name`, check_for_old_file_name)

    if(check_for_old_file_name.length !=0 || check_for_old_file_name != null || check_for_old_file_name !=''){
    const filepublicID = check_for_old_file_name[0]?.avatar?.split(`mac-erecruit/`).pop().split(`.png`)[0];
    cloudinary.uploader.destroy(`mac-erecruit/${filepublicID}`, {resource_type: 'image'}, (error, result) => {console.log(result, error)});
    }

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream( {
        folder: 'mac-erecruit' ,
        width: 300,//200
        height: 350,//250
        //crop: "fill",
        //crop: "scale",
        //fetch_format: "auto"
        fetch_format: "png"
      },(error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);       
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  const result:any = await streamUpload(req);

  if(result.url.length){
    console.log(`result`,result.url.length);
    console.log(`Go Ahead with Updating req.body.id ...`,req.body.id, `With `,result.url);
    const results:any = query(`UPDATE system_users SET avatar = ? WHERE id= ? `,[result.url, req.body.id])
  }

  res.send(result);
});
export default handler;