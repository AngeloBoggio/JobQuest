import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";
import { Link } from "react-router-dom";
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
    limit,
} from 'firebase/firestore';
import {firestore} from "../../firebase";
export default function JobsView() {
    const collectionRef = collection(firestore, 'jobPosts');
    const [jobs, setJobs] = useState([]);
    const userId = useSelector((state) => selectUserId(state));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(
            collectionRef,
            //  where('owner', '==', currentUserId),
            where('userId', '==', userId) // does not need index
            //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
            // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
            // limit(1)
        );

        setLoading(true);
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setJobs(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(jobs)
    }, [jobs]);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Link className="nav-link" to="/joblistings/1">
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Job Title</Card.Title>
                        <Card.Text className="mb-0">
                            Company Name
                        </Card.Text>
                        <Card.Text>
                            Tags
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </Link>
        </div>
    )
}