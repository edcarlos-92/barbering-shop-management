import React, { useState } from 'react'
import { Fab, TextField, TextareaAutosize, Grid } from '@mui/material'
import { ArrowBack, GetApp } from '@mui/icons-material'
import { Link } from "react-router-dom";
import QRcode from 'qrcode.react'

function QRgenerator() {
    const [qr, setQr] = useState('lintangwisesa');
    const handleChange = (event) => {
        setQr(event.target.value);
    };
    const downloadQR = () => {
        const canvas: any = document.getElementById("myqr");
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "myqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div>
            <Fab style={{ marginRight: 10 }} color="primary">
                <ArrowBack />
            </Fab>
            <span>QR Generator</span>

            <div style={{ marginTop: 30 }}>
                <TextField onChange={handleChange} style={{ width: 320 }}
                    value={qr} label="QR content" size="medium" variant="outlined" color="primary"
                />
            </div>

            <div>
                {
                    qr ?
                        <QRcode
                            id="myqr"
                            value={qr}
                            size={320}
                            includeMargin={true}
                        /> :
                        <p>No QR code preview</p>
                }
            </div>
            <div>
                {
                    qr ?
                        <Grid container>
                            <Grid item xs={10}>
                                <TextareaAutosize
                                    style={{ fontSize: 18, width: 250, height: 100 }}
                                    maxRows={4}
                                    defaultValue={qr}
                                    value={qr}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Fab onClick={downloadQR} style={{ marginLeft: 10 }} color="primary">
                                    <GetApp />
                                </Fab>
                            </Grid>
                        </Grid> :
                        ''
                }
            </div>
        </div>
    );
}

export default QRgenerator;
