import "./Profile.css";
import Card from "react-bootstrap/Card";
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
                <h1 className="profile-header mb-2">My Profile</h1>
                {user ? <Card className="custom-card">
                    <Card.Img
                        variant="top"
                        src="https://i.etsystatic.com/5215360/r/il/03b263/1284577071/il_1080xN.1284577071_iv53.jpg"
                    />
                    <Card.Body className="text-center">
                    </Card.Body>
                </Card> : <div></div>}
            </div>
            <div className="firstName mt-2">Name: {user.firstName + " " + user.lastName}</div>
            <div className="email">Email: {user.email}</div>
        </div>
    );
}

