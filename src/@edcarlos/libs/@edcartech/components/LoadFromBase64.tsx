import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
//import {pdfBase64,requirementsBase64} from './pdfBase64'

export default function LoadFromBase64(props){
 
    const {base64} =props;
    //const base64 = requirementsBase64;//pdfBase64
    //'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
    const pdfContentType = 'application/pdf';

    const base64toBlob = (data: string) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr(`data:${pdfContentType};base64,`.length);

        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: pdfContentType });
    };

    const url = URL.createObjectURL(base64toBlob(base64));

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const style = {
      height: '750px',
      width: '900px',
      marginLeft: 'auto',
      marginRight: 'auto',
      //overflowY: 'scroll',
      //scrollbarWidth: 'thin'
    }

    const pdfjsDistV = "2.12.313"//current Version 2.12.313

    return (

      <>
      
      {/* For pdfjs-dist 2.7.570 */}
      {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsDistV}/es5/build/pdf.worker.js`}> */}

      {/* For pdfjs-dist 2.8.335 and later. You need to replace 2.8.335 with the version you are using */}
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsDistV}/legacy/build/pdf.worker.js`}>

        {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsDistV}/build/pdf.worker.js`}> */}
        <div style={style} className='pt-5' >
            <Viewer fileUrl={url} /*httpHeaders={{ key:'1234',}} withCredentials={true}*/ />
        </div>
      </Worker>
      
      </>
       
    );
};