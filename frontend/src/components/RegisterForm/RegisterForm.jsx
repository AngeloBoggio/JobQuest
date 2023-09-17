import "./RegisterForm.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import appLogo from "../../assets/app-logo.png";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";
import store from "../../store/store";

export default function RegisterForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((credentials) => {
                        store.dispatch({
                            type: "userCredentials/setUserCredentials",
                            payload: { userId: credentials.user.uid }
                        });
                        navigate("/home");
                    })
                    .catch((error) => {
                        if (error.code === "auth/invalid-login-credentials") {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Invalid username or password."
                            });
                        }
                    });

                navigate("/home");
            })
            .catch((error) =>
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Username or email already exists."
                })
            );
    };

    return (
        <div
            className="container d-flex justify-content-center register-margin"
            style={{ minHeight: "100vh" }}
        >
            <div className="col-md-6 col-sm-8 col-lg-4">
                <div className="d-flex justify-content-center align-items-center mb-3 h2 me-2">
                    <Image
                        src={appLogo}
                        alt="This is the logo of Career Link."
                        className="app-logo me-2 d-flex justify-content-center"
                    />
                    Job Quest
                </div>
                <h2 className="mb-4 text-center fs-5">Create an account</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label w-100">
                            First Name
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label w-100">
                            Last Name
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label w-100">
                            Email
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label w-100">
                            Password
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary col-12">
                        Register
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <Link className="text-decoration-none" to="/login">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
