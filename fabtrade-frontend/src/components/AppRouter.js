import React, { useContext } from "react";
import { Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer( () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
        </Routes>
  );
});

export default AppRouter;