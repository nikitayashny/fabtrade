import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Button } from "react-bootstrap";

const Home = observer(() => {

    const { user } = useContext(Context)

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <div>
            {user.isAuth 
            ?
            <>
                <div>{user.user.email}</div>
                <div>{user.user.name}</div>
                <div>{user.user.id}</div>
                <Button variant="dark" onClick={logOut} className="ms-2">Выйти</Button>
            </>
            : <></>
            }      
        </div>

    )
})

export default Home;