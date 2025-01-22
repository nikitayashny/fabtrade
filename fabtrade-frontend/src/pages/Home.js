import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const Home = observer(() => {

    const { user } = useContext(Context)

    return (
        <div>
            {user.isAuth 
            ?
            <>
                <div>{user.email}</div>
            </>
            : <></>
            }      
        </div>
    )
})

export default Home;