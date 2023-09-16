import Card from "react-bootstrap/Card";

export default function JobDetails() {
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: "40rem" }}>
                <Card.Body>
                    <Card.Title>Job Title</Card.Title>
                    <Card.Text className="mb-2">Company Name</Card.Text>
                    <Card.Text className="mb-2">
                        Join us for a 12-14 week paid internship that offers
                        personal and professional development, an executive
                        speaker series, and community-building. The Software
                        Engineering Internship program will give you an
                        opportunity to work on complex computer science
                        solutions, develop scalable, distributed software
                        systems, and also collaborate on multitudes of smaller
                        projects that have universal appeal.We offer a range of
                        internships in either Software Engineering or
                        Site-Reliability Engineering across North America,
                        including the US and Canada. Our recruitment team will
                        determine where you fit best based on your resume.As a
                        Software Engineering intern, you will work on a specific
                        project critical to Google’s needs.
                    </Card.Text>
                    <Card.Text>Tags</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </div>
    );
}
