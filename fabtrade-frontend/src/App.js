import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";
import { fetchTenders } from "./http/tenderAPI";
import { fetchMyRequests} from "./http/requestAPI";

const App = observer(() => {
    const {user} = useContext(Context)
    const {tender} = useContext(Context)
    const {request} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {

            if (data) {
                user.setIsAuth(true)
                user.setUser(data)

                fetchMyRequests().then(data => {
                    if (data) {
                        request.setRequest(data)
                    }
                })
            }

            fetchTenders().then(data => {
                if (data) {
                    tender.setTender(data)
                }
            })

                      
            
        }).finally(() => setLoading(false))
        
    }, [tender, user])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (

        <BrowserRouter>

            <AppRouter />

        </BrowserRouter>
    )
})

export default App;