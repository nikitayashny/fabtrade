import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Card} from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Header from "../components/Header";
import { fetchTender, fetchTenders, signTender } from "../http/tenderAPI";
import { fetchRequests, addRequest, fetchMyRequests, getWinnerRequest } from "../http/requestAPI";
import RequestCard from "../components/RequestCard"
import { HOME_ROUTE } from "../utils/consts";
import { Button } from "antd";

const TenderPage = observer(() => {
    const { id } = useParams();
    const [tenderItem, setTenderItem] = useState({});
    const [tenderCreator, setTenderCreator] = useState({})
    const [requests, setRequests] = useState([{}])
    const {request} = useContext(Context)
    const {user} = useContext(Context)
    const {tender} = useContext(Context)
    const [winnerRequest, setWinnerRequest] = useState({})
    const navigate = useNavigate()

    const [price, setPrice] = useState('');
    const [period, setPeriod] = useState('');
    const [minSupplyDate, setMinSupplyDate] = useState('');
    const [maxSupplyDate, setMaxSupplyDate] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('tenderId', id)
        formData.append('price', price);
        formData.append('period', period);
        formData.append('minSupplyDate', minSupplyDate);
        formData.append('maxSupplyDate', maxSupplyDate);
        formData.append('image', imageFile);
        formData.append('document', documentFile);
        formData.append('sign', true);

        try {
            const response = await addRequest(formData);

            fetchMyRequests().then(data => {
                if (data) {
                    request.setRequest(data)
                }
            })
        } catch (error) {
            alert('Error submitting request:', error);
        }
    };

    const handleSign = async (event) => {
        event.preventDefault();

        try {
            const response = await signTender(tenderItem && tenderItem.id);
            
            fetchTenders().then(data => {
                            if (data) {
                                tender.setTender(data)
                                
                            }
                        })
                        const data = await fetchTender(id);
                const { creator } = data;
                setTenderItem(data);
                setTenderCreator(creator);
        } catch (error) {
            alert('Error submitting request:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTender(id);
                const { creator } = data;
                setTenderItem(data);
                setTenderCreator(creator);

            } catch (error) {
                navigate(HOME_ROUTE)
            }
        };

        fetchData();

    }, [id, tender]);

    useEffect(() => {
        if (user.isAuth && user.user.id === tenderCreator.id) {
             fetchRequests(id).then(data => {
                if (data) {
                    setRequests(data)
                }
            })
        }
    }, [id, tenderCreator.id])

    useEffect(() => {
        try {
            getWinnerRequest(id).then(data => {
                if (data.status === 500) {
                    throw new Error('403 Forbidden');
                }  
                if (data) {
                    setWinnerRequest(data)
                }
            })
        } catch (e) {console.log(e)}

    }, [id])

    const secondaryTextStyle = {
        color: "#223567",
        fontSize: "16px",
        fontWeight: "400",
    }

    const spanStyle = {
        backgroundColor: 'white',
        border: '2px solid #3160D0',
        height: '32px',
        display: 'inline-flex', 
        alignItems: 'center',
        padding: '0 8px', 
        borderRadius: '11px'
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="pb-3">
            <Container>
                <Header />
                <hr/>
                {tenderItem.status && tenderItem.status.id === 3 
                ?
                    <>
                        <h4 className="mb-4 mt-5">Итоговый протокол по тендеру {tenderItem.name}</h4>
                        <Card
                            style={{
                                position: 'relative', 
                                border: '2px solid #3160D0',
                                borderRadius: '20px', 
                                boxShadow: '0px 0px 2px #3160D0',
                                blur: '5px',
                                padding: '40px',
                                background: 'linear-gradient(to right, #627EC6, #223567, #1153FC)'
                            }}
                            >
                            <Card.Body>
                                <Card
                                    style={{
                                        background: '#D9E7FF',
                                        border: 'none',
                                        borderRadius: '20px', 
                                        padding: '40px' 
                                    }}
                                >
                                     <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Номер протокола: <span style={spanStyle}>
                                                            {tenderItem.id ? tenderItem.id : ''}
                                                        </span>
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Дата формирования протокола: <span style={spanStyle}>
                                                            {(() => {
                                                                const dateOfCreated = tenderItem.dateOfCreated ? tenderItem.dateOfCreated : "";
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
                                                        </span>
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Организатор тендера: <span style={spanStyle}>
                                                            {tenderItem.creator ? tenderItem.creator.name : ''}
                                                        </span>
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Предмет договора: <span style={spanStyle}>
                                                            {tenderItem.name ? tenderItem.name : ''}
                                                        </span>
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Сведения о начальной цене: <span style={spanStyle}>
                                                            {winnerRequest.price ? winnerRequest.price : ''} белорусских рублей
                                                        </span>
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Количество товара: <span style={spanStyle}>
                                                            {tenderItem.count ? tenderItem.count : ''}
                                                        </span>
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Дата начала тендера: <span style={spanStyle}>
                                                            {(() => {
                                                                const dateOfCreated = tenderItem.dateOfCreated ? tenderItem.dateOfCreated : "";
                                                                const date = new Date(Date.UTC(
                                                                    dateOfCreated[0],    
                                                                    dateOfCreated[1] - 1, 
                                                                    dateOfCreated[2],       
                                                                    dateOfCreated[3],     
                                                                    dateOfCreated[4],    
                                                                    dateOfCreated[5]      
                                                                ));
                                                                
                                                                date.setDate(date.getDate());
                                                                
                                                                const options = {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour12: false,
                                                                    timeZone: 'UTC',
                                                                };
                                                                return date.toLocaleString('ru-RU', options);
                                                            })()}
                                                        </span>
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-1"
                                    >
                                        Дата окончания тендера: <span style={spanStyle}>
                                                            {(() => {
                                                                const dateOfCreated = tenderItem.dateOfCreated ? tenderItem.dateOfCreated : "";
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
                                                        </span>
                                    </div>
                                    <div style={{ color: "#223567",
                                                    fontSize: "16px",
                                                    fontWeight: "500",}}
                                        className="mb-1 mt-3"
                                    >
                                        Решение комиссии по тендеру
                                    </div>
                                    <div style={secondaryTextStyle}
                                        className="mb-2 mt-3"
                                    >
                                        Победитель тендера
                                    </div>
                                    <Card
                                        style={{
                                            backgroundColor: '#D0EDFF7D', 
                                            border: '2px solid #3160D0', 
                                            borderRadius: '5px' 
                                        }}
                                    >
                                        <Card.Title style={{ color: "#223567",
                                                            fontSize: "16px",
                                                            fontWeight: "400",
                                                            padding: '20px' }}>
                                            Наименование участника
                                        </Card.Title>
                                        <Card.Body style={{ backgroundColor: '#FFFFFF', padding: "20px" }}>
                                        <div style={secondaryTextStyle}
                                            className="mb-1"
                                        >
                                            {tenderItem.winner && tenderItem.winner.name}
                                        </div>
                                    
                                        </Card.Body>
                                        
                                    </Card>
                                    {tenderItem.status && tenderItem.status.id === 3 && !tenderItem.sign
                                        ?
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
                                                    blur: "8px",
                                                    marginTop: "20px"
                                                }} 
                                                onClick={(e) => handleSign(e)}>Подписать ЭЦП
                                            </Button>                                                       
                                        :
                                        <></>
                                        }
                                </Card>
                            </Card.Body>
                        </Card>
                    </>
                :
                <>
                {user.isAuth 
                    ? 
                    (tenderCreator.id === user.user.id 
                    ? 
                        (<>
                            <h4 className="mb-4 mt-5">Журнал заявок от претендентов</h4>
                            <div style={secondaryTextStyle}
                                className="mb-4"
                            >
                                Итого претендентов: {requests.length}
                            </div>
                            {requests.map(request => (       
                                <RequestCard requestItem={request}/>
                            ))}
                        </>) 
                    : 
                        (
                        <>
                            <h4 className="mb-4 mt-5">Тендер {tenderItem.name}</h4>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Статус: {tenderItem.status ? tenderItem.status.name : ''}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Победитель: {tenderItem.winner ? tenderItem.winner.name : "Не определён"}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Категория: {tenderItem.category ? tenderItem.category.name: ""}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Создатель: {tenderItem.creator ? tenderItem.creator.name: ""}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Дата создания: {(() => {
                                    const dateOfCreated = tenderItem.dateOfCreated ? tenderItem.dateOfCreated : "";
                                    const date = new Date(Date.UTC(
                                        dateOfCreated[0],    
                                        dateOfCreated[1] - 1, 
                                        dateOfCreated[2],       
                                        dateOfCreated[3],     
                                        dateOfCreated[4],    
                                        dateOfCreated[5]      
                                    ));
                                    
                                    date.setDate(date.getDate());
                                    
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
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Дата окончания: {(() => {
                                    const dateOfCreated = tenderItem.dateOfCreated ? tenderItem.dateOfCreated : "";
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
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Количество: {tenderItem.count}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Описание: {tenderItem.description}
                                </div>
                                         
                                {request.request && request.request.find(req => req.tender.id === tenderItem.id) ? (
                                        <h3 className="mt-3">Заявка на участие отправлена</h3>
                                ) : (
                                    <>
                                        {
                                    tenderItem.status && tenderItem.status.id === 1 && user.user.verified
                                    ?
                                    <>
                                        <h4 className="mb-4 mt-5">Создание заявки</h4>
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
                                            <Card.Body>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="price">
                                                    <Form.Label>Цена</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        placeholder="Введите предлагаемую цену"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="period">
                                                    <Form.Label>Срок отсрочки платежа</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        placeholder="Введите допустимый срок отсрочки платежа"
                                                        value={period}
                                                        onChange={(e) => setPeriod(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="minSupplyDate">
                                                    <Form.Label>Минимальный период поставки</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        placeholder="Введите минимальный период поставки"
                                                        value={minSupplyDate}
                                                        onChange={(e) => setMinSupplyDate(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="maxSupplyDate">
                                                    <Form.Label>Максимальный период поставки</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="number"
                                                        placeholder="Введите максимальный период поставки"
                                                        value={maxSupplyDate}
                                                        onChange={(e) => setMaxSupplyDate(e.target.value)}
                                                    />
                                                </Form.Group>
                                                
                                                <Form.Group className="mb-3" controlId="documentPdf">
                                                    <Form.Label>Сертификат .pdf</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => setDocumentFile(e.target.files[0])}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="documentJpg">
                                                    <Form.Label>Изображение</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="file"
                                                        accept=".jpg,.jpeg"
                                                        onChange={(e) => setImageFile(e.target.files[0])}
                                                    />
                                                </Form.Group>

                                                <Button 
                                                style={{
                                                    marginBottom:"-9px",
                                                    color: "#3160D0",
                                                    textDecoration: "none",
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                    borderRadius: "19px",
                                                    borderWidth: "1px",
                                                    borderColor: "#3160D0",
                                                    blur: "8px"
                                                }}  
                                                type="submit" onClick={(e) => handleSubmit(e)}>
                                                    Подписать и отправить заявку
                                                </Button>
                                            </Form>
                                            </Card.Body>
                                        </Card>
                                    </>
                                    :  
                                    <></>
                                } 
                                    </>
                                )}                                        
                        </>
                        )) 
                    : 
                    (
                    <>
                    <h4 className="mb-4 mt-5">Тендер {tenderItem.name}</h4>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Статус: {tenderItem.status ? tenderItem.status.name : ''}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Победитель: {tenderItem.winner ? tenderItem.winner.name : "Не определён"}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Категория: {tenderItem.category ? tenderItem.category.name: ""}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Создатель: {tenderItem.creator ? tenderItem.creator.name: ""}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Дата создания: {(() => {
                                    const dateOfCreated = tenderItem.dateOfCreated ? tenderItem.dateOfCreated : "";
                                    const date = new Date(Date.UTC(
                                        dateOfCreated[0],    
                                        dateOfCreated[1] - 1, 
                                        dateOfCreated[2],       
                                        dateOfCreated[3],     
                                        dateOfCreated[4],    
                                        dateOfCreated[5]      
                                    ));
                                    
                                    date.setDate(date.getDate());
                                    
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
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Дата окончания: {(() => {
                                    const dateOfCreated = tenderItem.dateOfCreated ? tenderItem.dateOfCreated : "";
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
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Количество: {tenderItem.count}
                                </div>
                                <div style={secondaryTextStyle}
                                    className="mb-1"
                                >
                                    Описание: {tenderItem.description}
                                </div>
                    </>
                    )}</>
                }
            </Container>
        </div>
    );
});

export default TenderPage;