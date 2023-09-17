import "./Profile.css";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../store/userCredentials/userCredentialsSelectors";

export default function Profile() {
    const userEmail = useSelector((state) => selectUserEmail(state));

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="profile-card mt-5">
                <Card>
                    <Card.Img
                        variant="top"
                        src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                    />
                    <Card.Body className="text-center">
                        <Card.Title className="m-0">{userEmail}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
