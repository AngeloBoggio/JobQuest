import "./Home.css";
import { useState } from "react";

export default function Home() {
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className="container mt-3">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    style={{ width: "200px" }}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                >
                    Search
                </button>
            </div>
            <h1>{searchInput}</h1>
        </div>
    );
}
