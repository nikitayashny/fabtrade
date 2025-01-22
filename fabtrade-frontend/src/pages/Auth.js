import React, { useContext, useState } from "react"
import { Container, Form, Card, Button, ToastContainer, Modal } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "../utils/consts"
import { login, registration, confirmRegistration, oauth2Login } from "../http/userAPI"
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import Notification from "../components/Notification";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const click = async () => {
        try {
            if (!validateEmail(email)) {
                setNotificationMessage("Некорректный формат email");
                setShowNotification(true);
                return;
            }
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                await registration(password, email);
                setShowModal(true);
                return;
            }

            user.setIsAuth(true)
            user.setEmail(data.email)

            navigate(HOME_ROUTE);

        } catch (e) {
            setNotificationMessage('Неверные данные или нет доступа.');
            setShowNotification(true);
        }
    }

    const handleLoginSuccess = async (response) => {
        try {
            const { credential } = response;

            const data = await oauth2Login(credential)

            user.setIsAuth(true)
            user.setEmail(data.email)

            navigate(HOME_ROUTE);
            
        } catch (error) {
            setNotificationMessage('Ошибка аутентификации с Google');
            setShowNotification(true);
        }
    };

    const handleConfirmCode = async () => {
        try {
            const data = await confirmRegistration(confirmationCode, password, email);
            
            user.setIsAuth(true)
            user.setEmail(data.email)

            navigate(HOME_ROUTE);
            setShowModal(false); 
        } catch (e) {
            setNotificationMessage('Неверный код подтверждения.');
            setShowNotification(true);
        }
    };

    return (

        <Container className="d-flex justify-content-center align-items-center vh-100">

                <ToastContainer position="top-start" className="p-5">
                    <Notification
                        show={showNotification}
                        message={notificationMessage}
                        color='danger'
                        header='Ошибка'
                        onClose={() => setShowNotification(false)}
                    />
                </ToastContainer>

            <Card style={{ width: 500, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }} className="p-5">
                    <h2 className="m-auto mb-3">
                        {isLogin ? 'Авторизация' : 'Регистрация'}
                    </h2>
                    <Form className="d-flex flex-column">
                            {isLogin ?
                                <>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите email..."
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите пароль..."
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                    />
                                </>
                                :
                                <>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите email..."
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите пароль..."
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                    />
                                </>
                            }
                            <div className="d-flex justify-content-between mt-3 mb-3">
                                {isLogin ?
                                    <div>
                                        <NavLink to={REGISTRATION_ROUTE}>У меня нет аккаунта</NavLink>
                                    </div>
                                    :
                                    <div>
                                        <NavLink to={LOGIN_ROUTE}>У меня есть аккаунт</NavLink>
                                    </div>
                                }
                                <Button
                                    onClick={click}
                                    variant="dark"
                                >
                                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                                </Button>                             
                            </div>
                           
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                            />
                        </Form>
                    </Card>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Код подтверждения</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Control
                                type="text"
                                placeholder="Введите код подтверждения"
                                value={confirmationCode}
                                onChange={e => setConfirmationCode(e.target.value)}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Закрыть
                            </Button>
                            <Button variant="primary" onClick={handleConfirmCode}>
                                Подтвердить
                            </Button>
                        </Modal.Footer>
                    </Modal>
        </Container>
    )
})

export default Auth;