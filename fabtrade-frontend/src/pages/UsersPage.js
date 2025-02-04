import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, {  useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchUsers} from "../http/userAPI";
import UserCard from "../components/UserCard";

const UsersPage = observer(() => {

    const [users, setUsers] = useState([{}])

    useEffect(() => {
        fetchUsers().then(data => setUsers(data))
    }, [])

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="pb-3">
            <Container>
                <Header />
                <hr />
                <h4 className="mb-4 mt-5">Участники</h4>
                <div style={{
                    color: "#223567",
                    fontSize: "16px",
                    fontWeight: "400",
                }}
                    className="mb-4"
                >
                    Итого участников: {users && users.length}
                </div>
                {users && users.map(user => (
                    <UserCard userItem={user}/>
                ))}
            </Container>
        </div>
    );
});

export default UsersPage;