import "./App.css";
import Home from "../Home/Home";
import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}