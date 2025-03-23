import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
  const username = localStorage.getItem("username"); // Retrieve username from localStorage

  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedLinks, setUploadedLinks] = useState([]);
  const [subjects, setSubjects] = useState([]);

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

  
  return (
    <Container fluid className="dashboard">
      {/* Sidebar */}
      <Row>
        <Col md={2} className="bg-light sidebar p-3">
          <h4 className="mb-4">Dashboard</h4>
          <ListGroup className="sideicons">
            <ListGroup.Item className="sideicon" action as={Link} to="../">💻 Home</ListGroup.Item>
            <ListGroup.Item className="sideicon" action as={Link} to="../uploadNotes">📚 Upload Notes</ListGroup.Item>
            <ListGroup.Item className="sideicon" action as={Link} to="../quiz">✅ Quiz</ListGroup.Item>
            <ListGroup.Item className="sideicon" action as={Link} to="../flashcardlist">🎴 Flashcards </ListGroup.Item>
            <ListGroup.Item className="sideicon" action as={Link} to="../progress">📊 Progress Analytics</ListGroup.Item>
            <ListGroup.Item className="sideicon" action as={Link} to="../pomodoroTimer">⏰ Pomodoro Timer</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Main Content */}
        <Col md={7} className="p-4">
          <Card className="p-4 shadow-sm">
            <h5>Welcome back, {username}!</h5> {/* Display the username here */}
            <p>Continue where you left off, explore new insights, or dive into your latest projects.</p>
            <Button id="buybtn" variant="primary">Ready to ace your game?🚀</Button>
          </Card>

          {/* Classes Section */}
          <Row className="mt-4">
            {subjects.map(
              (subject, idx) => (
                <Col md={4} key={idx}>
                  <Card
                    className="text-white mb-3"
                    style={{
                      backgroundColor:
                        idx === 0
                          ? "#007bff"
                          : idx === 1
                          ? "#6610f2"
                          : "#dc3545",
                        cursor: "pointer"
                    }}
                    onClick={() => setSelectedSubject(subject)} 
                  >
                    <Card.Body>
                      <Card.Title>{subject}</Card.Title>
                      
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>

          {/* Filtered Notes and Links Section */}
          {selectedSubject && (
            <Card className="p-3 shadow-sm mt-3">
              <h6>📂 Notes & Links for <strong>{selectedSubject}</strong></h6>
              <ListGroup>
                {uploadedFiles
                  .filter(file => file.tag === selectedSubject)
                  .map((file, idx) => (
                    <ListGroup.Item key={idx}>📄 {file.name}</ListGroup.Item>
                  ))}
                {uploadedLinks
                  .filter(link => link.tag === selectedSubject)
                  .map((link, idx) => (
                    <ListGroup.Item key={idx}>
                      🎥 <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
                    </ListGroup.Item>
                  ))}
                  
                {uploadedFiles.filter(f => f.tag === selectedSubject).length === 0 &&
                 uploadedLinks.filter(l => l.tag === selectedSubject).length === 0 && (
                  <ListGroup.Item>No notes or links uploaded for this subject yet.</ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          )}

          {/* Lessons Section */}
          <Card className="p-3 shadow-sm">
            <h6>Lessons</h6>
            <ListGroup>
              <ListGroup.Item>A1 - Machine Learning | ✅ Done</ListGroup.Item>
              <ListGroup.Item>A1 - Neural Network | ⏳ Pending</ListGroup.Item>
              <ListGroup.Item>A1 - DBMS | ⏳ Pending</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Right Sidebar */}
        <Col md={3} className=" p-4">
          <div className="profile-container text-center">
            <div className="profile-image">
              <img
                src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}
                alt="Profile"
              />
            </div>
            <h6>{username}</h6> {/* Display username here */}
            <Button variant="outline-primary" size="sm">
              Profile
            </Button>
          </div>

          {/* Calendar Section */}
          <Card className="mt-3 p-3 calendar-card">
            <h6>📅 Calendar</h6>
            <div className="calendar-container">
              <Calendar className="custom-calendar" />
            </div>
          </Card>

          {/* Reminders */}
          <Card className="mt-3 p-3">
            <h6>🔔 Reminders</h6>
            <ListGroup>
              <ListGroup.Item>Today's Quiz❓</ListGroup.Item>
              <ListGroup.Item>Revise Flashcards📒</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
