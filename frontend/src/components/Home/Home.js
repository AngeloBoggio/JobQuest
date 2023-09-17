import "./Home.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { collections } from "../../enums/collections";

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const collectionRef = collection(firestore, collections.jobPostings);
    const userId = useSelector((state) => selectUserId(state));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(collectionRef); // does not need index
        setLoading(true);
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ docId: doc.id, data: doc.data() });
            });
            items.sort((a, b) => b.data.createdDate.seconds - a.data.createdDate.seconds);
            setJobs(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };
    }, []);

    useEffect(() => {
        const results = jobs.filter((job) => {
            const lowercaseSearch = searchInput.toLowerCase();

            const titleMatch = job.data.title.toLowerCase().includes(lowercaseSearch);
            const companyNameMatch = job.data.companyName.toLowerCase().includes(lowercaseSearch);
            const descriptionMatch = job.data.description.toLowerCase().includes(lowercaseSearch);
            const tagMatch = job.data.tags.some((tag) =>
                tag.toLowerCase().includes(lowercaseSearch)
            );

            return titleMatch || companyNameMatch || descriptionMatch || tagMatch;
        });
        setFilteredJobs(results);
    }, [searchInput, jobs]);

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

        // Get the day of the month
        const day = date.getDate();
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
        <div className="container mt-3" style={{ width: "900px" }}>
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
            {filteredJobs.map((job, index) => (
                <div className="mb-4" key={index}>
                    <Link
                        className="nav-link"
                        to={`/jobs/${job.docId}`}
                    >
                        <Card style={{ width: "875px" }}>
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
                                        {job.data.tags.map((tag, index) => (
                                            <Card.Text className="m-0 me-2" key={index}>
                                                <p className="job-tag">{tag}</p>
                                            </Card.Text>
                                        ))}
                                    </div>
                                </Card.Body>
                            </div>
                            <Card.Footer>
                                Posted on{" "}
                                {formatDate(job.data.createdDate.seconds)}
                            </Card.Footer>
                        </Card>
                    </Link>
                </div>
            ))}
        </div>
    );
}
