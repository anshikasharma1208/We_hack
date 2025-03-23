import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./reviseNotes.css";

const RevisedNotes = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
        setUploadedFiles(storedFiles);
    }, []);

    const updateStatus = (index, status) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles[index].status = status;
        setUploadedFiles(updatedFiles);
        localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    };

    const deleteFile = (index) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedFiles);
        localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    };

    return (
        <div className="revised-notes">
            <Button className="back-btn" onClick={() => navigate("/uploadNotes")}>⬅️ Back to Upload</Button>
            <h2>📂 Previously Uploaded Notes</h2>
            {uploadedFiles.length > 0 ? (
                <ul className="file-list">
                    {uploadedFiles.map((file, index) => (
                        <li key={index} className="file-item">
                            📜 {file.name}
                            <span className={file.status === "Reviewed" ? "status-reviewed" : "status-pending"}>
                                {file.status === "Reviewed" ? "✅ Reviewed" : "⏳ To Review"}
                            </span>
                             <div className="button-group">
                                <Button 
                                    className="status-btn reviewed-btn"
                                    variant="success"
                                    onClick={() => updateStatus(index, "Reviewed")}
                                >
                                    ✅ Reviewed
                                </Button>
                                <Button 
                                    className="status-btn to-review-btn"
                                    variant="warning"
                                    onClick={() => updateStatus(index, "To Review")}
                                >
                                    ⏳ To Review
                                </Button>
                                <Button 
                                    className="status-btn delete-btn"
                                    variant="danger"
                                    onClick={() => deleteFile(index)}
                                >
                                    🗑️ Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notes uploaded yet.</p>
            )}
        </div>
    );
};

export default RevisedNotes;
