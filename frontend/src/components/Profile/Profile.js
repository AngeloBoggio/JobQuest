import React, { useState } from "react";
import "./Profile.css";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../../firebase";
import {addDoc,collection} from "firebase/firestore"

export default function Profile() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const ref = collection(firestore, "jobpost");


  const createPost = async (event) => {
    event.preventDefault();
    try{
        await addDoc(ref, {title: title, tags: tags, description: description})
    }catch(e){
        console.log(e);
    }

  };

  return (
    <div>
      
    </div>
  );
}

