import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../index"; // Импортируйте ваш контекст

function ProtectedRoute({ component: Component, ...rest }) {
    const { store } = useContext(Context);

    if (!store.isAuth) {
        // Если пользователь не аутентифицирован, перенаправьте его на страницу входа
        console.log('ProtectedRoute worked');
        return <Navigate to="/login" state={{ from: rest.location }} />;
    }

    // Если пользователь аутентифицирован, позвольте ему просматривать маршрут
    return <Component {...rest} />;
}

export default ProtectedRoute;
