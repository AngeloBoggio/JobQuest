import { useState } from "react";
import axios from "axios";

export default function YouTube() {
    const [searchInput, setSearchInput] = useState("");
    const [videos, setVideos] = useState([]);

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

    return (
        <div className="container mt-3">
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
            <div className="row">
                {videos.map((videoLink, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <iframe
                            width="100%"
                            height="315"
                            src={videoLink}
                            title={`YouTube Video ${index + 1}`}
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}
