import "./Profile.css";
import { useSelector } from "react-redux";
import {
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    limit
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { collections } from "../../enums/collections";
import { useState, useEffect } from "react";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function Profile() {
    const collectionRef = collection(firestore, collections.users);
    const [user, setUser] = useState([]);
    const userId = useSelector((state) => selectUserId(state));
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const q = query(
            collectionRef,
            where("userId", "==", userId)
        );

        setLoading(true);
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ docId: doc.id, data: doc.data() });
            });

            setUser(items.find(user => user.data.userId === userId).data);
            setLoading(false);
        });
        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="profile-card mt-5">
                <Card>
                    <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/1008571169580003338/1152822562619916378/jpgtheartist_image_of_a_capybara_in_a_detectors_outfit_12385ffe-1f9d-4303-b528-e95a14eab95d.png" />
                    <Card.Body className="text-center">
                        <Card.Title className="m-0">
                            {user.firstName}{" "}{user.lastName}
                        </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush text-center">
                        <ListGroup.Item>{user.email}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </div>
    );
}

