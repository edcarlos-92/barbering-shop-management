import React, { useState } from 'react'
import { Fab, TextareaAutosize } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Link } from "react-router-dom";
import QrReader from 'react-qr-reader'
//import * as QrReader from "react-qr-reader";

function QRscanner() {

    const [qrscan, setQrscan] = useState('No result');
    const handleScan = data => {
        if (data) {
            setQrscan(data)
        }
    }
    const handleError = err => {
        console.error(err)
    }

    return (
        <div>

            <span>QR Scanner</span>
            <div style={{ marginTop: 30 }}>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 240, width: 320 }}
                />
            </div>

            <TextareaAutosize
                style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
                maxRows={4}
                defaultValue={qrscan}
                value={qrscan}
            />

        </div>
    );
}

export default QRscanner;
