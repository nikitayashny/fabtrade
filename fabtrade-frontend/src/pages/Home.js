import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import lightDesk from '../img/LightDesk.png';
import logo from '../img/FabTrade.svg';
import lineStart from '../img/lineStart.svg'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { TENDERS_ROUTE } from "../utils/consts";

const Home = observer(() => {

    const navigate = useNavigate()

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Container>
                <Header />
                <hr/>
                <div className="d-flex">
                    <div style={{width: '50%', fontSize: "64px", fontWeight: "700", lineHeight: "1.1"}} className="pt-5">
                        <img src={logo} alt='Logo' height={"64px"}/> - 
                        электронная торговая площадка сферы легкой промышленности
                        <div className="d-flex mt-4">
                            <div>
                                <img src={lineStart} alt='Logo'/>
                            </div>
                            <div>
                                <div style={{fontSize: "16px", fontWeight: "500"}} className="mt-3 ms-3">
                                    Мы собрали предприятия легкой
                                </div>
                                <div style={{fontSize: "16px", fontWeight: "500"}} className="ms-3">
                                    промышленности в одном месте  
                                </div>
                                <Button className="ms-3 " 
                                    onClick={() => navigate(TENDERS_ROUTE)}
                                    style={{top: "-10px",  background: 'linear-gradient(to right, #44BCFF, #3160D0)', width: "135px", height: "43px", borderRadius: "7px", color: "white", fontSize: "16px", fontWeight: "600"}}>
                                    Начать!
                                </Button>
                            </div>            
                        </div>
                    </div>

                    <div style={{backgroundColor: "#E7E7E7", width: '50%'}}>
                        <img src={lightDesk} alt='lightDesk' width={"100%"}/>
                    </div>
                </div>
        
            </Container>
        </div>
    )
})

export default Home;