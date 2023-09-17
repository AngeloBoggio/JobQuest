import "./Navigation.css";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../../assets/app-logo.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import store from "../../store/store";
import Swal from "sweetalert2";

export default function Navigation() {
    const userId = useSelector((state) => selectUserId(state));
    const navigate = useNavigate();
    const handleSignOut = async () => {
        store.dispatch({
            type: "userCredentials/setUserCredentials",
            payload: { userId: null }
        });
        await signOut(auth);
        Swal.fire({
            icon: "success",
            title: "You have successfully signed out!",
            showConfirmButton: false,
            timer: 1500
        });
        localStorage.setItem("userId", JSON.stringify({}));
        navigate("/home");
    };

    return (
        <Navbar className="py-2 navbar">
            <Container>
                <Navbar.Brand
                    className="d-flex align-items-center fs-3 text-white me-3 h1 mb-0"
                    as={Link}
                    to="/home"
                >
                    <Image
                        src={appLogo}
                        alt="This is the logo of our website."
                        className="app-logo me-2"
                    />
                    Job Quest
                </Navbar.Brand>
                <Dropdown className="d-flex justify-content-end me-3">
                    <Dropdown.Toggle variant="link" bsPrefix="none">
                        <Image
                            src={userId ? "https://cdn.discordapp.com/attachments/1008571169580003338/1152822562619916378/jpgtheartist_image_of_a_capybara_in_a_detectors_outfit_12385ffe-1f9d-4303-b528-e95a14eab95d.png" : "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"}
                            alt="Profile Picture"
                            roundedCircle
                            className="navbar-profile"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {userId ? (
                            <div>
                                <Dropdown.Item as={Link} to={`/profile`}>
                                    Your Profile
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/myjobs`}>
                                    My Jobs
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleSignOut}>
                                    Sign Out
                                </Dropdown.Item>
                            </div>
                        ) : (
                            <div>
                                <Dropdown.Item as={Link} to={`/login`}>
                                    Login
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/register`}>
                                    Register
                                </Dropdown.Item>
                            </div>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
}
