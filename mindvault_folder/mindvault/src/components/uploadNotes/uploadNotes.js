import React, { useState, useEffect } from "react"; 
import { Button, Modal, Toast, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import "./uploadNotes.css";
import Sidebar from "../sidebar/sidebar";

const UploadPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showYoutubeModal, setShowYoutubeModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState("");
    const [uploadedLinks, setUploadedLinks] = useState([]);
    const [tag, setTag] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
        const storedLinks = JSON.parse(localStorage.getItem("uploadedLinks")) || [];
        setUploadedFiles(storedFiles);
        setUploadedLinks(storedLinks);
    
        // Retrieve stored subjects from localStorage
        const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    
        // Extract only subject names (if objects are stored)
        const extractedSubjects = storedSubjects.map(subject =>
            typeof subject === "object" && subject.name ? subject.name : subject
        );
    
        // Default subjects that should always be shown
        const defaultSubjects = ["Machine Learning", "Neural Networks", "Deep Learning"];
    
        // Merge default subjects with stored subjects (avoiding duplicates)
        const mergedSubjects = [...new Set([...defaultSubjects, ...extractedSubjects])];
    
        setSubjects(mergedSubjects);
    }, []);
    

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile && tag.trim() !== "") {
            const newFile = { name: selectedFile.name, tag };
            const newFiles = [...uploadedFiles, newFile];
            setUploadedFiles(newFiles);
            localStorage.setItem("uploadedFiles", JSON.stringify(newFiles));
            
            // Store unique subjects
            const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
            if (!storedSubjects.includes(tag)) {
            const updatedSubjects = [...storedSubjects, tag];
            localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
            }

            setShowToast(true);
            setShowModal(false);
            setTag("");
        }
    };

    const handleYoutubeUpload = () => {
        if (youtubeLink.trim() !== "" && tag.trim() !== "") {
            const newLink = { link: youtubeLink, tag };
            const newLinks = [...uploadedLinks, newLink];
            setUploadedLinks(newLinks);
            localStorage.setItem("uploadedLinks", JSON.stringify(newLinks));
            
            // Store unique subjects
            const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
            if (!storedSubjects.includes(tag)) {
            const updatedSubjects = [...storedSubjects, tag];
            localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
            }
            
            setYoutubeLink(""); 
            setShowToast(true);
            setShowYoutubeModal(false);
            setTag("");
        }
    };

    const handleAddSubject = () => {
        if (newSubject && !subjects.includes(newSubject)) {
            const updatedSubjects = [...subjects, newSubject];
            setSubjects(updatedSubjects);
            localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
            setNewSubject("");
        }
    };

    return (
        <div className="upload-page">
            <Sidebar />
            <Button className="open-modal-btn" onClick={() => setShowModal(true)}>
                📤 Upload Notes
            </Button>

            <Button className="open-modal-btn" onClick={() => navigate("/reviseNotes")}>
                ✍🏻 Revise previous Notes
            </Button>

            <Button className="open-modal-btn" onClick={() => setShowYoutubeModal(true)}>
                🎥 Upload YouTube Lecture
            </Button>

            {/* Upload Notes */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body className="upload-modal">
                    <h4>Upload Your Notes</h4>
                    <p>Select and upload your notes for easy access.</p>
                    <input type="file" className="upload-input" onChange={handleFileChange} />

                    {/* Subject Dropdown */}
                    <Form.Select
                        className="mt-3"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    >
                        <option value="">-- Select a Subject --</option>
                        {subjects.map((subject, idx) => (
                            <option key={idx} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </Form.Select>

                    {/* Add New Subject */}
                    <Form.Control
                        type="text"
                        placeholder="Add new subject..."
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="mt-2"
                    />
                    <Button variant="success" className="mt-2" onClick={handleAddSubject}>
                        ➕ Add Subject
                    </Button>

                    <div className="modal-actions">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>Upload</Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showYoutubeModal} onHide={() => setShowYoutubeModal(false)} centered>
                <Modal.Body className="upload-modal">
                    <h4>Upload YouTube Lecture</h4>
                    <p>Paste a YouTube lecture link to generate flashcards & quizzes.</p>
                    <Form.Control 
                        type="text"
                        placeholder="Paste YouTube Link here"
                        value={youtubeLink}
                        onChange={(e) => setYoutubeLink(e.target.value)}
                    />
                    
                    {/* Subject Dropdown */}
                    <Form.Select
                        className="mt-3"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    >
                        <option value="">-- Select a Subject --</option>
                        {subjects.map((subject, idx) => (
                            <option key={idx} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </Form.Select>

                    {/* Add New Subject */}
                    <Form.Control
                        type="text"
                        placeholder="Add new subject..."
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="mt-2"
                    />
                    <Button variant="success" className="mt-2" onClick={handleAddSubject}>
                        ➕ Add Subject
                    </Button>

                    <div className="modal-actions mt-3">
                        <Button variant="secondary" onClick={() => setShowYoutubeModal(false)}>Cancel</Button>
                        <Button variant="success" onClick={handleYoutubeUpload} disabled={!youtubeLink.trim()}>
                            🎥 Upload YouTube Link
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide className="success-toast">
                <Toast.Body>🎉 Good work! Uploaded successfully.</Toast.Body>
            </Toast>
        </div>
    );
};

export default UploadPage;
