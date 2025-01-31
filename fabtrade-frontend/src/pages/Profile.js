import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { Context } from "../index";
import React, { useContext } from "react";
import Header from "../components/Header";

const Home = observer(() => {
    const { user } = useContext(Context) 
    const { tender } = useContext(Context)

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Container>
                <Header />
                <hr/>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-4">Личный кабинет</h4>
                    <div className="ms-2">
                        <Button type="outline">
                            Создать тендер
                        </Button>
                    </div>
                </div>
                <>
                    {tender.tender.map(tender => (
                        (tender.creator.id === user.user.id) 
                        ?
                        <div>
                            {tender.id}
                        </div>
                        :
                        <></>
                    ))}
                </>
            </Container>
        </div>    
    );
});

export default Home;