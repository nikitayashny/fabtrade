import React, { useContext, useState } from "react";
import { Context } from "../index";
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, TENDERS_ROUTE, USERS_ROUTE } from "../utils/consts";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import logo from '../img/FabTrade.svg';
import {useNavigate} from 'react-router-dom'
import { Form, Modal } from "react-bootstrap";
import { addTender, fetchTenders } from "../http/tenderAPI";

const Header = observer( () => {
    const {user} = useContext(Context)
    const {request} = useContext(Context)
    const {tender} = useContext(Context)
    const navigate = useNavigate()

    const [showTenderModal, setShowTenderModal] = useState(false);
    const [category_id, setCategoryId] = useState('');
    const [count, setCount] = useState('');
    const [tenderName, setTenderName] = useState('');
    const [description, setDescription] = useState('');
    const [term, setTerm] = useState('');

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

    const handleTenderClick = () => {
        if (user.user && user.user.verified) {
            setShowTenderModal(true)
        }
    }

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        request.setRequest({})
    };

    const handleClick = (e) => {
        if (!user.isAuth) {
            e.preventDefault(); 
            navigate(LOGIN_ROUTE)
        }
    };


    return (
        <Navbar bg="light" expand="md" className="pt-5 d-flex justify-content-around" >

                <NavLink
                    to={HOME_ROUTE}
                >
                    <img src={logo} alt='Logo' />
                </NavLink>
            
                <NavLink
                    to={TENDERS_ROUTE}
                    style={{
                        marginBottom:"-9px",
                        color: "black",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "500"
                    }}
                >
                    Тендеры
                </NavLink>

                <NavLink
                    to={USERS_ROUTE}
                    style={{
                        marginBottom:"-9px",
                        color: "black",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "500"
                    }}
                >
                    Участники
                </NavLink>

                <button
                    style={{
                        marginBottom:"-9px",
                        color: "black",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "500",
                        border: "none",
                        backgroundColor: "transparent"
                    }}
                    onClick={() => handleTenderClick()}
                >
                    Разместить заявку
                </button>

                <NavLink
                    to={PROFILE_ROUTE}
                    onClick={handleClick}
                    style={{
                        marginBottom:"-9px",
                        color: "black",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "500"
                    }}
                >
                    Личный кабинет
                </NavLink>

                <div style={{width: "1px", height: "21px", background: "black", marginBottom: "-9px"}}></div>

                {!user.isAuth ? (
                    <>
                        <NavLink
                            to={LOGIN_ROUTE}
                            style={{
                                marginBottom:"-9px",
                                color: "black",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "500"
                            }}
                        >
                            Войти
                        </NavLink>

                        <NavLink
                            to={REGISTRATION_ROUTE}
                        >
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
                                    height: "38px",
                                    width: "201px",
                                    blur: "8px"
                                }}    
                            >
                                Зарегистрироваться
                            </Button>
                        </NavLink>
                    </>
                    ) : (
                        <Button
                            type="outline"
                            style={{
                                marginBottom:"-9px",
                                color: "#3160D0",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "500",
                                borderRadius: "19px",
                                borderWidth: "1px",
                                borderColor: "#3160D0",
                                height: "38px",
                                width: "100px",
                                blur: "8px"
                            }}    
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    )}

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

        </Navbar>
    )
})

export default Header