import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import {collections} from "../../enums/collections";
import {useSelector} from "react-redux";
import {selectUserId} from "../../store/userCredentials/userCredentialsSelectors";

export default function JobDetails() {
    const collectionRef = collection(firestore, collections.jobPostings);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = useSelector((state) => selectUserId(state));


    const { id } = useParams(); //docId
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
            setJob(items.find(item => item.docId === id));
            setLoading(false);
        });
        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            {job ? <Card style={{width: "40rem"}}>
                <Card.Body>
                    <Card.Title>{job.data.title}</Card.Title>
                    <Card.Text className="mb-2">{job.data.companyName}</Card.Text>
                    <Card.Text className="mb-2">
                        job.data.description
                    </Card.Text>
                    <Card.Text>{job.data.tags}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card> : <div></div>}
        </div>
    );
}
