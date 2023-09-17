import "./App.css";
import Home from "../Home/Home";
import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import JobListings from "../JobListings/JobListings";
import JobDetails from "../JobDetails/JobDetails";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/myjobs" element={<JobListings />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
