import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { CgInstagram } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/aryangupta_701";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dut5akeru/image/upload/v1657908013/My%20profile%20pics/WhatsApp_Image_2022-07-15_at_11.29.54_PM_vfnyvq.jpg"
              alt="Founder"
            />
            <Typography>Aryan Gupta</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This website is made by Aryan Gupta.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Follow Me Here</Typography>
            <a
              href="https://www.linkedin.com/in/aryan-gupta-78273a1b6/"
              target="blank"
            >
              <FaLinkedin className="linkedSvgIcon" />
            </a>

            <a href="https://instagram.com/aryangupta_701" target="blank">
              <CgInstagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;