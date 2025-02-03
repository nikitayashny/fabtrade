import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import {Button} from "antd";
import { Context } from "../index";
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import TenderCard from "../components/TenderCard";

const TendersPage = observer(() => {
    const { user } = useContext(Context) 
    const { tender } = useContext(Context)

    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="pb-3">
            <Container>
                <Header />
                <hr />
                <h4 className="mb-4 mt-5">Тендеры</h4>
                <div style={{
                    color: "#223567",
                    fontSize: "16px",
                    fontWeight: "400",
                }}
                    className="mb-4"
                >
                    Итого тендеров: {tender.tender.filter(tender =>
                                        activeCategory === null || tender.category.id === activeCategory
                                        ).length
                                    }
                </div>
                <div className="mb-4">
                    <Button 
                        variant={activeCategory === 1 ? "primary" : "light"} 
                        className={activeCategory === 1 ? "border border-primary" : ""}
                        onClick={() => handleCategoryClick(1)}
                    >
                        Для женщин
                    </Button>
                    <Button 
                        variant={activeCategory === 2 ? "primary" : "light"} 
                        className={activeCategory === 2 ? "border border-primary mx-2" : "mx-2"}
                        onClick={() => handleCategoryClick(2)}
                        
                    >
                        Для мужчин
                    </Button>
                    <Button 
                        variant={activeCategory === 3 ? "primary" : "light"} 
                        className={activeCategory === 3 ? "border border-primary" : ""}
                        onClick={() => handleCategoryClick(3)}
                    >
                        Для детей
                    </Button>
                </div>
                <>
                {tender.tender.map(tender => (
                    activeCategory === null || tender.category.id === activeCategory ? (
                        <TenderCard key={tender.id} tenderItem={tender} />
                    ) : null
                ))}
                </>
            </Container>
        </div>
    );
});

export default TendersPage;