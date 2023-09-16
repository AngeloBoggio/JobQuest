import React, { useState } from "react";
import "./CreateJobPost.css";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore"
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/userCredentials/userCredentialsSelectors";

export default function CreateJobPost() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const userId = useSelector((state) => selectUserId(state)); const [searchInput, setSearchInput] = useState("");
  const [videos, setVideos] = useState([]);

  const ref = collection(firestore, "jobpost");

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (removedTag) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  const createPost = async (event) => {
    event.preventDefault();
    try {
      await addDoc(ref, { title: title, tags: tags.join(', '), description: description });
    } catch (e) {
      console.log(e);
    }

  };

  async function fetchYouTubeVideos(event) {
    event.preventDefault();

    const apiKey = "AIzaSyAS5kAv_0GoEWPNS8eEirVaJB-EyeS8PXU";
    const maxResults = 10;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${searchInput}&maxResults=${maxResults}&key=${apiKey}`;

    const response = await axios.get(apiUrl);

    const videoLinks = response.data.items.map(item => `https://www.youtube.com/embed/${item.id.videoId}`);

    setVideos(videoLinks);

    setSearchInput("");

  }

  function handleAddVideo() {

  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button
          className="create-post-button mt-3 mb-3"
          variant="primary"
          onClick={() => setShowCreatePost(true)}
        >
          Create Job Post
        </Button>

        <Modal
          show={showCreatePost}
          onHide={() => setShowCreatePost(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <div id="job-post-form">
                <div className="mb-3">
                  <label htmlFor="job-title" className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="job-title"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />

                </div>
                <div className="mb-3">
                  <label htmlFor="job-description" className="form-label">Job Description</label>
                  <textarea
                    className="form-control"
                    id="job-description"
                    rows="3"
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="job-tags" className="form-label">Technology Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    id="job-tags"
                    placeholder="e.g., JavaScript, Python"
                    value={currentTag}
                    onChange={(event) => setCurrentTag(event.target.value)}
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
                        <span className="close-icon" onClick={() => removeTag(tag)}>X</span>
                      </div>
                    ))}
                  </div>
                </div>
                <form onSubmit={(event) => fetchYouTubeVideos(event)} className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    style={{ width: '200px' }}
                  />
                  <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                    Search
                  </button>
                </form>
              </div>
              {videos.map((videoLink, index) => (
                <div key={index} className="row video-container">
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
                      onClick={() => handleAddVideo(index)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreatePost(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={createPost}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
