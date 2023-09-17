import "./JobsView.css";
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
    limit
} from "firebase/firestore";
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
            where("userId", "==", userId)
        );

        setLoading(true);
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ docId: doc.id, data: doc.data() });
            });
            items.sort((a, b) => b.data.createdDate?.seconds - a.data.createdDate?.seconds);
            setJobs(items.filter((item) => item.data.userId === userId));
            setLoading(false);
        });
        return () => {
            unsub();
        };
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

        // Get the day of the month
        const day = date.getDate();

        // Function to determine the day suffix
        function getDaySuffix(day) {
            if (day >= 11 && day <= 13) {
                return "th";
            }
            switch (day % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        }

        // Format the date
        const options = { month: "long" };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const daySuffix = getDaySuffix(day);
        return `${formattedDate} ${day}${daySuffix}`;
    }

    function truncateTextWithEllipses(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 3) + "…"; // Append ellipses
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {jobs?.map((job, index) => (
                <div className="mb-4">
                    <Link
                        key={index}
                        className="nav-link"
                        to={`/jobs/${job.docId}`}
                    >
                        <Card key={index} style={{ width: "1000px" }}>
                            <div className="d-flex">
                                <img
                                    src={job.data.logoUrl}
                                    style={{ width: "200px", height: "200px" }}
                                />
                                <Card.Body>
                                    <Card.Title>
                                        <div className="d-flex justify-content-between">
                                            <p className="m-0">
                                                {job.data.title} (
                                                {job.data.companyName})
                                            </p>
                                            <p className="m-0">
                                                Salary: {Number(job.data.salary).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </Card.Title>
                                    <Card.Text className="mb-2">
                                        Location: {job.data.location}
                                    </Card.Text>
                                    <Card.Text className="mb-2">
                                        Description: {truncateTextWithEllipses(job.data.description, 300)}
                                    </Card.Text>
                                    <div className="d-flex">
                                        {job.data.tags.map((tag) => (
                                            <Card.Text className="m-0 me-2">
                                                <p className="job-tag">{tag}</p>
                                            </Card.Text>
                                        ))}
                                    </div>
                                </Card.Body>
                            </div>
                            <Card.Footer>
                                Posted on {formatDate(job.data.createdDate?.seconds)}
                            </Card.Footer>
                        </Card>
                    </Link>
                </div>
            ))}
        </div>
    );
}
