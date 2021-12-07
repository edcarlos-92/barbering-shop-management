import React from 'react'
import Head from 'next/head'


export default function PageHeading(props:any) {

    const {PageTitle}=props

  return (
    <div>
        <Head>
        <title>{PageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>

    </div>
  )
}
