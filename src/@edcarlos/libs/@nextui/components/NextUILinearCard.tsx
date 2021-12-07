import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material';
//-------------------------Redux Store----------------------------------------
import { Card, Grid as NextGrid, Row, Text } from "@nextui-org/react";

export default function NextUILinearCard(props) {

    const { onClick, labelData, valueData, cardColor, labelStyle, valueStyle } = props

    return (
        <NextGrid.Container gap={3} justify="center">
            <Card isPressable css={{ backgroundColor: cardColor }} onClick={onClick}>
                <Card.Footer>
                    <Row wrap="wrap" justify="space-between" >
                        <Text b css={labelStyle}>{labelData}</Text>
                        <Text b css={valueStyle}>{valueData}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </NextGrid.Container>
    )
}