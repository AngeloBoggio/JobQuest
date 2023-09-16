import "./JobListings.css";
import CreateJobPost from "../CreateJobPost/CreateJobPost";
import JobsView from "../JobsView/JobsView";

export default function JobListings() {
    return (
        <div>
            <CreateJobPost />
            <JobsView />
        </div>
    );
}
