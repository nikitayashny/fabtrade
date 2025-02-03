import { Card, Col, Row} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { TENDER_ROUTE } from "../utils/consts";
import React from "react";
import { observer } from "mobx-react-lite";

const TenderCard = observer(({tenderItem}) => { 

    const navigate = useNavigate()

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
        <Col md={12} className="mt-3" onClick={() => navigate(TENDER_ROUTE + '/' + tenderItem.id)}>
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
                    <Col md={3}>
                        <div style={cardTextLight}>Лот</div>
                        <div style={cardTextDark}>{tenderItem.name}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Категория</div>
                        <div style={cardTextDark}>{tenderItem.category.name}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Количество</div>
                        <div style={{fontWeight: "500", fontSize: '24px', color: '#1F1F30'}}>{tenderItem.count}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Статус</div>
                        <div style={cardTextDark}>{tenderItem.status.name}</div>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <div style={cardTextLight}>Дата создания</div>
                        <div style={cardTextDark}>
                            {(() => {
                                const dateOfCreated = tenderItem.dateOfCreated;
                                const date = new Date(Date.UTC(
                                    dateOfCreated[0],    
                                    dateOfCreated[1] - 1, 
                                    dateOfCreated[2],       
                                    dateOfCreated[3],     
                                    dateOfCreated[4],    
                                    dateOfCreated[5]      
                                ));
                                const options = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour12: false,
                                    timeZone: 'UTC',
                                };
                                return date.toLocaleString('ru-RU', options);
                            })()}
                        </div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Дата завершения</div>
                        <div style={cardTextDark}>
                            {(() => {
                                const dateOfCreated = tenderItem.dateOfCreated;
                                const date = new Date(Date.UTC(
                                    dateOfCreated[0],    
                                    dateOfCreated[1] - 1, 
                                    dateOfCreated[2],       
                                    dateOfCreated[3],     
                                    dateOfCreated[4],    
                                    dateOfCreated[5]      
                                ));
                                
                                date.setDate(date.getDate() + tenderItem.term);
                                
                                const options = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour12: false,
                                    timeZone: 'UTC',
                                };
                                return date.toLocaleString('ru-RU', options);
                            })()}
                        </div>
                    </Col>
                    <Col md={3}></Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Победитель</div>
                        <div style={cardTextDark}>{tenderItem.winner ? tenderItem.winner.name : "Не определён"}</div>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
})

export default TenderCard