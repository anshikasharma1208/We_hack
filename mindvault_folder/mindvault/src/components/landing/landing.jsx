import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
// import {LoginPage} from "../signup/login";
import "./landing.css"; 
// import {Dashboard} from "../dashboard/Dashboard";
import Feature from "./features";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar className="navbar" >
        <Container>
          <Navbar.Brand>
          <div className="element logo"></div>
            {/* <div className="element-logo"> MindVault</div> */}
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button href="/Dashboard" type="button" id="navbtn" className="btn btn-outline-secondary">
              Dashboard
            </Button>
            <Button href="/login" type="button" id="navbtn" className="btn btn-outline-secondary">
              Sign in
            </Button>
            <Button href="/login" type="button" id="navbtn" className="btn btn-outline-secondary">
              Sign up
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="hero-section text-center">
        <h1 className="hero-title">
          <span className="grad-text">Unlock</span> your Potential
        </h1>
        <p className="hero-subtext">
          Maximize your coding potential with AI-powered learning and
          interview prep.
        </p>
        <Button variant="light" className="cta-button" href="#feature">
          Unleash the Powers of your Mind
        </Button>
      </Container>
      <Feature />

      {/* Student Offer Section (New Section Below Features) */}
      <Container className="student-offer">
        <div>
        <h2 className="student-title">
          <div className="signtext">Boost grade.</div>
          <div className="signtext">Not stress.</div> 
          <div>Free for students.</div>
        </h2>
        <p className="student-subtext">
          <div>Start setting the curve with the most accurate AI.</div>
        </p>
        <Button className="student-btn" href="/login">
          <div>Use MindVault for free</div>
        </Button>
        </div>
      </Container>

    </div>
  );
}