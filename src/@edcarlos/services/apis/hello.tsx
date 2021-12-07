// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' })
}



const incomingFileupload = async (acceptedFiles) => {

  const config = {
    headers: {
    "content-type": "multipart/form-data",
    },
  };
  await fetch("/api/incomingupload", {
    method: "POST",
    body:acceptedFiles,
    //headers: config.headers
  });

};

const newFileuploadToServer = async (acceptedFiles) => {

  const config = {
    headers: {
    "content-type": "multipart/form-data",
    },
  };
  await fetch("/api/newfile", {
    method: "POST",
    body:acceptedFiles,
    headers: config.headers
  });

};

const uploadToServer = async (acceptedFiles) => {
  const body = new FormData();
  body.append("avatar", acceptedFiles);
  const response = await fetch("/api/file", {
    method: "POST",
    body:body
  });
};

const uploadToServer_ = async (acceptedFiles) => {
  let currentFile = acceptedFiles;
  const formData = new FormData();
  formData.append("fileupload", currentFile);
  const response = await fetch("/api/fileupload", {
    method: "POST",
    body: formData
  });
};



                /*
                acceptedFiles.forEach((file) => {
                  ///
                  const reader = new FileReader()
                  reader.onabort = () => console.log('file reading was aborted')
                  reader.onerror = () => console.log('file reading has failed')
                  reader.onload = () => {
                    const binaryStr = reader.result
                    console.log("Converted File: ",binaryStr)
                  }
                  reader.readAsArrayBuffer(file)
                  console.log("Buffered File: ",file)
                  ///
                  //-----------------------Use Axios to Upload Now
                  let currentFile = acceptedFiles[0];
                  //let currentFile = file;
                  //uploadToServer(file); 
                  
                  const fdata = new FormData();
                  const name = values.id
                  const originalFilename = currentFile.name.replace(/[^\x00-\x7F]/g, "");
                  const fileExtension = originalFilename.split('.').pop();
                  const dbAvator = `${name}.${fileExtension}`;
                  fdata.append("avatar", currentFile);
                  fdata.append("filename",`${name}.${fileExtension}`);
                  //fdata.append("filename",`${name}-${currentFile.name.replace(/[^\x00-\x7F]/g, "")}`
                  console.log("The Full File Name: ",originalFilename)
                  console.log("The File Extension: ",fileExtension)
                  //jwtAxios.post(`/api/newfile`, fdata, config)
                    //.post(`${process.env.SERVER_URL}/api/newfile`, fdata, config)
                    //fetch(`/api/newfile`, fdata, config) fileupload
                    //newFileuploadToServer(fdata)
                    uploadPictureHandler(fdata)
                    ///
                    fetch("/api/newfile", {
                      method: "POST",
                      body:fdata,
                      headers: config.headers
                    });
                    ///
                  // CLIENT SIDE STUFF AFTER UPLOADING
                //-------------------------------Use Axios to Upload Now
                })

                */
