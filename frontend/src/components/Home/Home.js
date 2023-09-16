import "./Home.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { collections } from "../../enums/collections";

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const collectionRef = collection(firestore, collections.jobPostings);
    const userId = useSelector((state) => selectUserId(state));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(
            collectionRef// does not need index
        );

        setLoading(true);
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ docId: doc.id, data: doc.data() });
            });
            setJobs(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };
    }, []);
    return (
        <div className="container mt-3" style={{ width: "800px" }}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                >
                    Search
                </button>
            </div>
            {jobs.map((job, index) => (
                <div className="mb-4">
                    <Link className="nav-link" to={`/joblistings/${job.docId}`}>
                        <Card key={index}>
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
                        </Card>
                    </Link>
                </div>))}
        </div >
    );
}
