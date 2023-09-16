import "./Navigation.css";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import appLogo from "../../assets/app-logo.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from 'react-redux'
import {selectUserId} from "../../store/userCredentials/userCredentialsSelectors";
import {signOut} from "firebase/auth"
import {auth} from "../../firebase";
import store from "../../store/store";

export default function Navigation() {
    const userId = useSelector((state) => selectUserId(state))
    const handleSignOut = async () => {
        store.dispatch({ type: 'userCredentials/setUserCredentials', payload: {userId: null} })
        await signOut(auth)
    }

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
                            src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                            alt="Profile Picture"
                            roundedCircle
                            className="navbar-profile"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {userId ? <div><Dropdown.Item
                            as={Link}
                            to={`/profile`}
                        >
                            Your Profile
                        </Dropdown.Item>
                            <Dropdown.Item onClick={handleSignOut}>
                            Sign Out
                        </Dropdown.Item>
                            <Dropdown.Item
                            as={Link}
                        to={`/joblistings`}
                    >
                        Job Listings
                    </Dropdown.Item></div>: <div>
                        <Dropdown.Item
                            as={Link}
                            to={`/login`}
                        >
                            Log In
                        </Dropdown.Item>
                            <Dropdown.Item
                            as={Link}
                        to={`/register`}
                    >
                        Register
                    </Dropdown.Item></div>}
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    )
}
