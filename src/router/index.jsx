import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../shared/Layout";
import PublicRoute from "../guards/PublicRoute";
import PrivateRoute from "../guards/PrivateRoute";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
    {
        element: (
            <PrivateRoute>
                <Layout/>
            </PrivateRoute>
        ),
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/pagelain",
                element: <h2>Page Lain</h2>
            },
        ]
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                <RegisterPage/>
            </PublicRoute>
        )
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage/>
            </PublicRoute>
        )
    },
])

export default router