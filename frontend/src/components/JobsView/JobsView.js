import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";

export default function JobsView() {
    const [jobs, setJobs] = useState([]);
    const userId = useSelector((state) => selectUserId(state));

    useEffect(() => {
        const fetchJobs = async () => {

        }
        fetchJobs();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center">
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
        </div>
    )
}