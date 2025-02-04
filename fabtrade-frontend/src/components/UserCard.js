import { Card, Col, Row} from "react-bootstrap";
import React from "react";
import { observer } from "mobx-react-lite";
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from "antd";

const UserCard = observer(({userItem}) => { 

    const downloadPdf = () => {
        const pdfUrl = userItem.document;
        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        } else {
            console.error('URL документа недоступен');
        }
    };

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
        <Col md={12} className="mt-3">
            <Card
                style={{
                    position: 'relative', 
                    cursor: 'pointer', 
                    border: '2px solid #3160D0',
                    borderRadius: '5px', 
                    boxShadow: '0px 0px 2px #3160D0',
                    blur: '5px',
                    padding: '20px'
                }} 
                bg="light"
            >   
                <Row>    
                    <Col md={3}>
                        <div style={cardTextLight}>Компания</div>
                        <div style={cardTextDark}>{userItem.name}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>email</div>
                        <div style={cardTextDark}>{userItem.email}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>Сфера деятельности</div>
                        <div style={cardTextDark}>{userItem.description}</div>
                    </Col>
                    <Col md={3}>
                        <div style={cardTextLight}>О компании</div>
                        <div style={cardTextDark}>
                        <Button 
                            icon={<DownloadOutlined />}
                            onClick={() => downloadPdf()}>Открыть докумет</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
})

export default UserCard