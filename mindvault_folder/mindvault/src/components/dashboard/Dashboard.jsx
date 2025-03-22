import React from "react";
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
  const username = localStorage.getItem("username"); // Retrieve username from localStorage

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
            {["Machine Learning", "Neural Networks", "Deep Learning"].map(
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
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{subject}</Card.Title>
                      
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>

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
