import React, { useState } from "react";
import "./CreateJobPost.css";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";
import Swal from "sweetalert2";
import { collections } from "../../enums/collections";
import { ref, uploadBytes, getStorage, getDownloadURL, listAll } from "firebase/storage"
import { v4 } from "uuid"


export default function CreateJobPost() {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [currentTag, setCurrentTag] = useState("");
    const userId = useSelector((state) => selectUserId(state));
    const [searchInput, setSearchInput] = useState("");
    const [videos, setVideos] = useState([]);
    const collectionRef = collection(firestore, collections.jobPostings);
    const [companyName, setCompanyName] = useState("");
    const [title, setTitle] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [selectedLogo, setSelectedLogo] = useState(null)
    const storage = getStorage()
    const logoListRef = ref(storage, "logos/")
    const addTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag]);
            setCurrentTag("");
        }
    };

    const removeTag = (removedTag) => {
        setTags(tags.filter((tag) => tag !== removedTag));
    };

    const createPost = async (event) => {
        event.preventDefault();

        if (!companyName || !title || !salary || !location || !description || !jobUrl) {
            Swal.fire({
                icon: "error",
                title: "Missing Fields",
                text: "Please make sure to fill in all required fields before creating a new job."
            });
            return;
        }

        try {
            if (selectedLogo) {
                const url = selectedLogo.name + v4();
                const logoRef = ref(storage, `logos/${url}`)
                uploadBytes(logoRef, selectedLogo).then(response =>
                    getDownloadURL(response.ref).then(async url => {
                        await addDoc(collectionRef, {
                            title: title,
                            tags: tags,
                            description: description,
                            userId: userId,
                            companyName: companyName,
                            salary: salary,
                            location: location,
                            videos: selectedVideos,
                            createdDate: serverTimestamp(),
                            logoUrl: url,
                            jobUrl: jobUrl
                        });
                        Swal.fire({
                            icon: "success",
                            title: "You have succesfully posted a new job!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        closeJobCreationModal();
                    }))
            } else {
                await addDoc(collectionRef, {
                    title: title,
                    tags: tags,
                    description: description,
                    userId: userId,
                    companyName: companyName,
                    salary: salary,
                    location: location,
                    videos: selectedVideos,
                    createdDate: serverTimestamp(),
                    logoUrl: null,
                    jobUrl: jobUrl
                });
                Swal.fire({
                    icon: "success",
                    title: "You have succesfully posted a new job!",
                    showConfirmButton: false,
                    timer: 1500
                });
                closeJobCreationModal();
            }
        } catch (e) {
            console.log(e);
        }
    };
    const closeJobCreationModal = () => {
        setDescription("");
        setLocation("");
        setSalary("");
        setTitle("");
        setCompanyName("");
        setSearchInput("");
        setShowCreatePost(false);
        setSelectedVideos([]);
        setTags([]);
        setVideos([]);
        setSelectedVideos([]);
        setSelectedLogo(null)
    };
    async function fetchYouTubeVideos(event) {
        event.preventDefault();
        if (searchInput) {

            const apiKey = "AIzaSyAS5kAv_0GoEWPNS8eEirVaJB-EyeS8PXU";
            const maxResults = 10;

            const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${searchInput}&maxResults=${maxResults}&key=${apiKey}`;

            const response = await axios.get(apiUrl);

            const videoLinks = response.data.items.map(
                (item) => `https://www.youtube.com/embed/${item.id.videoId}`
            );

            setVideos(videoLinks);

            setSearchInput("");
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <Button
                    className="create-post-button mt-3 mb-3"
                    variant="primary"
                    onClick={() => setShowCreatePost(true)}
                >
                    Create Job
                </Button>

                <Modal
                    show={showCreatePost}
                    onHide={closeJobCreationModal}
                    centered
                    dialogClassName="modal-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create Job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <div id="job-post-form">
                                <div className="mb-3">
                                    <label
                                        htmlFor="job-title"
                                        className="form-label"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="job-title"
                                        required
                                        value={companyName}
                                        onChange={(event) =>
                                            setCompanyName(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="job-title"
                                        className="form-label"
                                    >
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="job-title"
                                        required
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="job-title"
                                        className="form-label"
                                    >
                                        Salary
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="job-title"
                                        required
                                        value={salary.toString()}
                                        onChange={(event) =>
                                            setSalary(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="job-title"
                                        className="form-label"
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="job-title"
                                        required
                                        value={location}
                                        onChange={(event) =>
                                            setLocation(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="job-description"
                                        className="form-label"
                                    >
                                        Job Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="job-description"
                                        rows="3"
                                        required
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="job-url"
                                        className="form-label"
                                    >
                                        Job Application URL
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="job-url"
                                        required
                                        value={jobUrl}
                                        onChange={(event) =>
                                            setJobUrl(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="job-tags"
                                        className="form-label"
                                    >
                                        Job Tags
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="job-tags"
                                        placeholder="e.g., Full-Time, Sophomore, Python, JavaScript"
                                        value={currentTag}
                                        onChange={(event) =>
                                            setCurrentTag(event.target.value)
                                        }
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                addTag();
                                            }
                                        }}
                                        onBlur={addTag}
                                    />
                                    <div className="tags-container">
                                        {tags.map((tag, index) => (
                                            <div key={index} className="tag">
                                                {tag}
                                                <span
                                                    className="close-icon"
                                                    onClick={() =>
                                                        removeTag(tag)
                                                    }
                                                >
                                                    X
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="m-0 mt-3 mb-2">Upload Company Logo</p>
                                    <input className="mb-2" onChange={(event) =>
                                        setSelectedLogo(event.target.files[0])
                                    } type="file" accept="image/jpeg, image/png, image/jpg" />
                                </div>
                                <form
                                    onSubmit={(event) =>
                                        fetchYouTubeVideos(event)
                                    }
                                    className="input-group mb-3"
                                >
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search for specific videos..."
                                        aria-label="Search"
                                        aria-describedby="button-addon2"
                                        value={searchInput}
                                        onChange={(event) =>
                                            setSearchInput(event.target.value)
                                        }
                                        style={{ width: "200px" }}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="submit"
                                        id="button-addon2"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                            {videos.map((videoLink, index) => (
                                <div
                                    key={index}
                                    className="row video-container"
                                >
                                    <div>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src={videoLink}
                                            title={`YouTube Video ${index + 1}`}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button
                                            className="btn btn-primary me-0 ms-0 mt-3 mb-3"
                                            onClick={() =>
                                                selectedVideos.includes(
                                                    videoLink
                                                )
                                                    ? setSelectedVideos(
                                                        selectedVideos.filter(
                                                            (video) =>
                                                                video !==
                                                                videoLink
                                                        )
                                                    )
                                                    : setSelectedVideos([
                                                        ...selectedVideos,
                                                        videoLink
                                                    ])
                                            }
                                        >
                                            {selectedVideos.includes(videoLink)
                                                ? "Remove"
                                                : "Add"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={closeJobCreationModal}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={createPost}
                        >
                            Post
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

