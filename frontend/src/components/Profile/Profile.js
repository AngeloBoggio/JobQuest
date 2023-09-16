import React, { useState } from "react";
import "./Profile.css";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";


export default function Profile() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = (event) => {
    event.preventDefault();


    console.log("Post created with title: ", title, " and content: ", content);
  };

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
                <form id="job-post-form">
                <div className="mb-3">
                    <label htmlFor="job-title" className="form-label">Job Title</label>
                    <input type="text" className="form-control" id="job-title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="job-description" className="form-label">Job Description</label>
                    <textarea className="form-control" id="job-description" rows="3" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="job-tags" className="form-label">Technology Tags</label>
                    <input type="text" className="form-control" id="job-tags" placeholder="e.g., JavaScript, Python" required />
                </div>
                </form>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreatePost(false)}>
                Close
            </Button>
            <Button variant="primary" type="submit" onClick={(event) => createPost(event)}>
                Post
            </Button>
            </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

  