import { Card, Col, Row} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { HOME_ROUTE, REQUEST_ROUTE } from "../utils/consts";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const RequestCard = observer(({requestItem}) => { 

    const navigate = useNavigate()
    const {tender} = useContext(Context)

    const cardTextLight = {
        fontWeight: "400",
        fontSize: '14px',
        color: '#BEBDBD'
    }

    const cardTextDark = {
        fontWeight: "400",
        fontSize: '16px',
        color: '#223567'
    }
    
    return (
        <Col md={12} className="mt-3" onClick={() => navigate(REQUEST_ROUTE + '/' + requestItem.id)}>
            <Card
                style={{
                    position: 'relative', 
                    cursor: 'pointer', 
                    border: '2px solid #3160D0',
                    borderRadius: '5px', 
                    transition: 'border-color 0.3s',
                    boxShadow: '0px 0px 2px #3160D0',
                    blur: '5px',
                    padding: '20px'
                }} 
                bg="light"
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0px 0px 10px #3160D0'; 
                }} 
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0px 0px 2px #3160D0';
                }}
            >   
                <Row>
                {requestItem.tender && tender.tender.find(tender => tender.id === requestItem.tender.id).winner !== null
                    && tender.tender.find(tender => tender.id === requestItem.tender.id).winner.id === requestItem.requester.id
                    ?
                    <div
                        style={{
                            fontWeight: "400",
                            fontSize: '16px',
                            color: '#28a745',
                            marginTop: '-15px'
                        }}
                        className="mb-3"
                    >Лучшее предложение</div>
                    :
                    <></>
                    }
                </Row>
                <Row>    
                    <Col md={3}>
                        <div style={cardTextLight}>Компания</div>
                        <div style={cardTextDark}>{requestItem.requester && requestItem.requester.name ? requestItem.requester.name : ''}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Лот</div>
                        <div style={cardTextDark}>{requestItem.tender && requestItem.tender.name ? requestItem.tender.name : ''}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Предложенная цена</div>
                        <div style={{fontWeight: "500", fontSize: '24px', color: '#1F1F30'}}>{requestItem.price}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Подпись</div>
                        <div style={cardTextDark}>{requestItem.sign ? "Есть" : "Нет"}</div>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
})

export default RequestCard