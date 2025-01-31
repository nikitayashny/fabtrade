import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Button, Container } from "react-bootstrap";
import Header from "../components/Header";

const Home = observer(() => {

    const { user } = useContext(Context)

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Container>
                <Header />
                <hr/>
            </Container>
        </div>
    )
})

export default Home;