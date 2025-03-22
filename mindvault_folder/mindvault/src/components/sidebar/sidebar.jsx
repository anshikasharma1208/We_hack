import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import "./sidebar.css";
const Sidebar = () => {
    return (
        <div className="misc">
        <Col md={2} className="bg-light sidebar p-3">
            <h4 className="mb-4">
            <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
            </h4>
            <ListGroup className="sideicons">
                <ListGroup.Item className="sideicon" action as={Link} to="../">💻 Home</ListGroup.Item>
                <ListGroup.Item className="sideicon" action as={Link} to="../uploadNotes">📚 Upload Notes</ListGroup.Item>
                <ListGroup.Item className="sideicon" action as={Link} to="../quiz">✅ Quiz</ListGroup.Item>
                <ListGroup.Item className="sideicon" action as={Link} to="../flashcardlist">🎴 Flashcards </ListGroup.Item>
                <ListGroup.Item className="sideicon" action as={Link} to="../progress">📊 Progress Analytics</ListGroup.Item>
                <ListGroup.Item className="sideicon" action as={Link} to="../pomodoroTimer">⏰ Pomodoro Timer</ListGroup.Item>
                {/* <ListGroup.Item action>🤖 AI Study Assistant</ListGroup.Item> */}
            </ListGroup>
        </Col>
        </div>
    );
};

export default Sidebar;