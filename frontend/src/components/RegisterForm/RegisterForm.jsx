import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import appLogo from "../../assets/app-logo.png";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password ).then
        (credentials =>
            console.log(credentials)
        ).catch(error =>
            console.log(error))
    }

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="col-md-6 col-sm-8 col-lg-4">
                <div className="d-flex justify-content-center align-items-center mb-3 h2 me-2">
                    <Image
                        src={appLogo}
                        alt="This is the logo of Career Link."
                        className="app-logo me-2 d-flex justify-content-center"
                    />
                    Career Link
                </div>
                <h2 className="mb-4 text-center fs-5">Create an account</h2>
                <form onSubmit={handleRegister}>
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
