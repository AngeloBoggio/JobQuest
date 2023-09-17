import "./JobDetails.css";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { collections } from "../../enums/collections";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";
import Button from 'react-bootstrap/Button';
import EditJob from "../EditJob/EditJob";
import Swal from "sweetalert2";

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

    function deletePost() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove this Job.'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Job Removed',
                    'Your job has been deleted!',
                    'success'
                )
                // Do something with database here Cruz
            }
        })
    }

    return (
        job ? (
            <div className="d-flex justify-content-center mt-4 mb-4">
                <Card style={{ width: "1200px" }}>
                    <div className="d-flex">
                        <div className="line-container">
                            <img
                                src={job.data.logoUrl}
                                style={{ width: "200px", height: "200px" }}
                            />
                            <div className="d-flex flex-column">
                                <EditJob job={job} />
                                <Button variant="outline-danger" onClick={deletePost}>Delete</Button>
                            </div>
                        </div>
                        <Card.Body className="ps-0">
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
                                Description: {job.data.description}
                            </Card.Text>
                            <div className="d-flex">
                                {job.data.tags.map((tag) => (
                                    <Card.Text className="m-0 me-2">
                                        <p className="job-tag">{tag}</p>
                                    </Card.Text>
                                ))}
                            </div>
                            {job.data.videos.length > 0 ? <p className="mt-3 mb-3 m-0">Learn these skills to land the job!</p> : null}
                            <div className="row">
                                {job.data.videos.map((video, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <iframe
                                            className="iframe-border"
                                            width="100%"
                                            height="250"
                                            src={video}
                                            title={`YouTube Video ${index + 1}`}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </div>
                    <Card.Footer>
                        Posted on {formatDate(job.data.createdDate?.seconds)}
                    </Card.Footer>
                </Card >
            </div >) : null
    );
}
