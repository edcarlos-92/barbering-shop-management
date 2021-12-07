import dynamic from 'next/dist/shared/lib/dynamic';
import React from 'react'

const QrCodeVerification = dynamic(() => import('../modules/macTech/Administration/Settings/QrCode/QrCodeVerification'), { ssr: false });
//QrCode/QrCodeVerification


export default function ApplicantChecker() {
    return (
        <div>
            <QrCodeVerification />
        </div>
    )
}
