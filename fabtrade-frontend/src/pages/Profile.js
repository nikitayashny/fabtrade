import { Container, Form, Modal } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import {Button} from "antd";
import { Context } from "../index";
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import TenderCard from "../components/TenderCard";
import RequestCard from "../components/RequestCard";
import { check, verify  } from "../http/userAPI";
import { addTender, fetchTenders } from "../http/tenderAPI";

const Home = observer(() => {
    const { user } = useContext(Context) 
    const { tender } = useContext(Context)
    const { request } = useContext(Context)

    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [unp, setUnp] = useState('');
    const [name, setName] = useState('');
    const [descriptionUser, setDescriptionUser] = useState('')
    const [documentFile, setDocumentFile] = useState(null);

    const [showTenderModal, setShowTenderModal] = useState(false);
    const [category_id, setCategoryId] = useState('');
    const [count, setCount] = useState('');
    const [tenderName, setTenderName] = useState('');
    const [description, setDescription] = useState('');
    const [term, setTerm] = useState('');

    const [activeCategory, setActiveCategory] = useState(1);
    
    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleSubmitTender = async () => {
        try {
            const response = await addTender(category_id, count, tenderName, description, term);
            setShowTenderModal(false); 
            fetchTenders().then(data => {
                            if (data) {
                                tender.setTender(data)
                            }
                        })
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };

    const handleSubmitVerify = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append('unp', unp)
            formData.append('name', name);
            formData.append('description', descriptionUser)
            formData.append('document', documentFile);
            
            const response = await verify(formData);
            setShowVerifyModal(false);
            check().then(data => {
                user.setUser(data)
            })                  
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };


    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="pb-3">
            <Container>
                <Header />
                <hr/>
                <div className="d-flex justify-content-between align-items-center mt-5">
                    <h4 className="mb-4">Личный кабинет</h4>
                
                    {user.user.verified
                    ?
                    <div className="ms-2">
                        <Button 
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    borderRadius: "11px",
                                    borderWidth: "1px",
                                    borderColor: "#3160D0",
                                    height: "44px"
                                }}    
                                onClick={() => setShowTenderModal(true)}
                            >
                            Создать тендер
                        </Button>
                    </div>
                    :
                    <div className="ms-2">
                        <Button onClick={() => setShowVerifyModal(true)}
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    borderRadius: "11px",
                                    borderWidth: "1px",
                                    borderColor: "#3160D0",
                                    height: "44px"
                                }}    
                                
                            >
                            Верификация аккаунта
                        </Button>
                    </div>                      
                    }
                    
                </div>
                <div style={{
                    color: "#223567",
                    fontSize: "16px",
                    fontWeight: "400",
                }}
                    className="mb-1"
                >
                    Наименование компании: {user.user.name}
                </div>
                <div style={{
                    color: "#223567",
                    fontSize: "16px",
                    fontWeight: "400",
                }}
                    className="mb-1"
                >
                    УНП: {user.user.unp}
                </div>
                <div style={{
                    color: "#223567",
                    fontSize: "16px",
                    fontWeight: "400",
                }}
                    className="mb-1"
                >
                    Описание деятельности: {user.user.description}
                </div>
                <div style={{
                    color: "#223567",
                    fontSize: "16px",
                    fontWeight: "400",
                }}
                    className="mb-4"
                >
                    Адрес электронной почты: {user.user.email}
                </div>
                <div className="mb-4">
                                    <Button 
                                        variant={activeCategory === 1 ? "primary" : "light"} 
                                        className={activeCategory === 1 ? "border border-primary" : ""}
                                        onClick={() => handleCategoryClick(1)}
                                    >
                                        Активные
                                    </Button>
                                    <Button 
                                        variant={activeCategory === 2 ? "primary" : "light"} 
                                        className={activeCategory === 2 ? "border border-primary mx-2" : "mx-2"}
                                        onClick={() => handleCategoryClick(2)}
                                        
                                    >
                                        Завершённые
                                    </Button>
                                    <Button 
                                        variant={activeCategory === 3 ? "primary" : "light"} 
                                        className={activeCategory === 3 ? "border border-primary" : ""}
                                        onClick={() => handleCategoryClick(3)}
                                        
                                    >
                                        Мои заявки
                                    </Button>
                    </div>
                <>
                {activeCategory === 3 ? (
                    request.request.map(request => (
                        <RequestCard key={request.id} requestItem={request} />
                    ))
                ) : (
                    tender.tender.map(tender => {
                        const isCreator = tender.creator.id === user.user.id;
                        const isActiveCategory1 = activeCategory === 1 && tender.winner === null;
                        const isActiveCategory2 = activeCategory === 2 && tender.winner !== null;

                        return (isCreator && (activeCategory === null || isActiveCategory1 || isActiveCategory2)) ? (
                            <TenderCard key={tender.id} tenderItem={tender} />
                        ) : null;
                    })
                )}
                </>

                
            </Container>
            <Modal show={showVerifyModal} onHide={() => setShowVerifyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUnp">
                            <Form.Label>UNP</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите UPN" 
                                value={unp} 
                                onChange={(e) => setUnp(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Наименование компании</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите наименования компании" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Описание деятельности</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите описание деятельности" 
                                value={descriptionUser} 
                                onChange={(e) => setDescriptionUser(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="documentPdf">
                                                    <Form.Label>Документ с информацией .pdf</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => setDocumentFile(e.target.files[0])}
                                                    />
                                                </Form.Group>                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowVerifyModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={(event) => handleSubmitVerify(event)}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTenderModal} onHide={() => setShowTenderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание тендера</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategoryId">
                            <Form.Label>Категория</Form.Label>
                            <Form.Control as="select" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                                <option value="">Выберите категорию</option>
                                <option value="1">Для женщин</option>
                                <option value="2">Для мужчин</option>
                                <option value="3">Для детей</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCount">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Введите количество" 
                                value={count} 
                                onChange={(e) => setCount(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите название" 
                                value={tenderName} 
                                onChange={(e) => setTenderName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Введите описание" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formTerm">
                            <Form.Label>Срок</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Введите срок" 
                                value={term} 
                                onChange={(e) => setTerm(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTenderModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleSubmitTender}>
                        Создать тендер
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>    
    );
});

export default Home;