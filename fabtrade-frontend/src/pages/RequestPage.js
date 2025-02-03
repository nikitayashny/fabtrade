import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Card, Row, Col} from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Header from "../components/Header";
import { confirmTender, fetchTender, fetchTenders } from "../http/tenderAPI";
import { fetchRequests, addRequest, fetchMyRequests, fetchRequest } from "../http/requestAPI";
import RequestCard from "../components/RequestCard"
import { HOME_ROUTE, TENDER_ROUTE } from "../utils/consts";
import { Button } from "antd";

const RequestPage = observer(() => {
    const { id } = useParams();
    const {request} = useContext(Context)
    const {user} = useContext(Context)
    const {tender} = useContext(Context)
    const [req, setReq] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetchRequest(id)
            .then(data => {
                if (data.status === 403) {
                    throw new Error('403 Forbidden');
                }    
                setReq(data)
            })
            .catch(e => {
                navigate(HOME_ROUTE);
            });
    }, [id]);

    const downloadPdf = () => {
        const pdfUrl = req && req.document;
        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        } else {
            console.error('URL документа недоступен');
        }
    };

    const handleConfirm = async () => {
        const data = await confirmTender(req && req.tender.id)
        fetchTenders().then(data => {
                        if (data) {
                            tender.setTender(data)
                            let idd = req && req.tender.id
                            navigate(TENDER_ROUTE + "/" + idd)
                        }
                    })
        
    }

    const secondaryTextStyle = {
        color: "#223567",
        fontSize: "16px",
        fontWeight: "400",
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="pb-3">
            <Container>
                <Header />
                <hr/>
                <h4 className="mb-4 mt-5">Заявка от претендента {req && req.requester.name}</h4>
                <Card
                    style={{
                        position: 'relative', 
                        border: '2px solid #3160D0',
                        borderRadius: '5px', 
                        boxShadow: '0px 0px 2px #3160D0',
                        blur: '5px',
                        padding: '20px'
                    }}
                >
                    <Row>
                        <Col md={6}>
                            <img src={req && req.image}></img>
                        </Col>
                        <Col md={6}>
                            <div style={secondaryTextStyle}
                                className="mb-1"
                            >
                                Наименование тендера: {req && req.tender.name}
                            </div>
                            <div style={secondaryTextStyle}
                                className="mb-1"
                            >
                                Наименование компании: {req && req.requester.name}
                            </div>
                            <div style={secondaryTextStyle}
                                className="mb-1"
                            >
                                УНП: {req && req.requester.unp}
                            </div>
                            <div style={secondaryTextStyle}
                                className="mb-1"
                            >
                                email: {req && req.requester.email}
                            </div>
                            <div style={secondaryTextStyle}
                                className="mb-1"
                            >
                                Предлагаемая цена: {req && req.price}
                            </div>
                            <div style={secondaryTextStyle}
                                className="mb-1"
                            >
                                Допустимый период отсрочки платежа: {req && req.period} дней
                            </div>
                            <div style={secondaryTextStyle}
                                className="mb-1"
                            >
                                Минимальный срок поставки: {req && req.minSupplyDate} дней
                            </div>
                            <div style={secondaryTextStyle}
                                className="mb-3"
                            >
                                Максимальный срок поставки: {req && req.maxSupplyDate} дней
                            </div>
                            <Button 
                            style={{
                                color: "#3160D0",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "500",
                                borderRadius: "19px",
                                borderWidth: "1px",
                                borderColor: "#3160D0",
                                height: "38px",
                                width: "220px",
                                blur: "8px"
                            }} 
                            onClick={() => downloadPdf()}>Посмотреть сертификат</Button>
                        </Col>
                    </Row>
                    {req && tender.tender.find(tender => tender.id === req.tender.id).winner !== null
                    && tender.tender.find(tender => tender.id === req.tender.id).winner.id === req.requester.id
                    && tender.tender.find(tender => tender.id === req.tender.id).status.id === 2
                    && user.user.id !== req.requester.id
                    ?
                    <><Button
                    style={{
                        color: "black",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "500",
                        borderWidth: "1px",
                        borderColor: "#3160D0",
                        height: "38px",
                        width: "220px",
                        blur: "8px"
                    }}
                    onClick={() => handleConfirm()}>Подтвердить победителя</Button></>
                    :
                    <></>
                    }
                </Card>
            </Container>
        </div>
    );
});

export default RequestPage;