import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
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
import { firestore } from "../../firebase";
import { collections } from "../../enums/collections";
export default function JobsView() {
    const collectionRef = collection(firestore, collections.jobPostings);
    const [jobs, setJobs] = useState([]);
    const userId = useSelector((state) => selectUserId(state));
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const q = query(
            collectionRef,
            where('userId', '==', userId) // does not need index
        );

        setLoading(true);
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ docId: doc.id, data: doc.data() });
            });
            console.log(items);
            setJobs(items.filter(item => item.data.userId === userId));
            setLoading(false);
        });
        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center">
            {jobs.map((job, index) => <Link className="nav-link" to={`/joblistings/${job.docId}`}>
                <Card key={index} style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>{job.data.title}</Card.Title>
                        <Card.Text className="mb-0">
                            {job.data.description}
                        </Card.Text>
                        <Card.Text>
                            {job.data.tags}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card></Link>)
            }
        </div >
    );
}
