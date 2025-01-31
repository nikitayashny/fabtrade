import React, { useContext, useState } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Container} from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import { Button, Modal } from "antd";
import { observer } from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import logo from '../img/FabTrade.svg';

const Header = observer( () => {
    const {user} = useContext(Context)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
    };

    const handleClick = (e) => {
        if (!user.isAuth) {
            e.preventDefault(); 
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Navbar bg="light" expand="md" className="pt-5 d-flex justify-content-around" >

                <NavLink
                    to={HOME_ROUTE}
                >
                    <img src={logo} alt='Logo' />
                </NavLink>
            
                <NavLink
                    to={HOME_ROUTE}
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
                    to={HOME_ROUTE}
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

                <NavLink
                    to={HOME_ROUTE}
                    style={{
                        marginBottom:"-9px",
                        color: "black",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "500"
                    }}
                >
                    Разместить заявку
                </NavLink>

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
            <Modal
                title="Доступ запрещен"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="ok" onClick={handleOk}>
                        ОК
                    </Button>
                ]}
            >
                <p>Пожалуйста, войдите в систему, чтобы получить доступ к личному кабинету.</p>
            </Modal>
        </Navbar>
    )
})

export default Header