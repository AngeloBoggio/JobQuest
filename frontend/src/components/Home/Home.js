import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
        />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">
          Test
        </button>
      </div>
    </div>
  );
}
