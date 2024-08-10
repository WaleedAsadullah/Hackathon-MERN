import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signUp";
import  Dashboard  from "../pages/dashboard";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/sign-up" element={<Signup/>} />
                <Route path="/dashboard/*" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    );
}