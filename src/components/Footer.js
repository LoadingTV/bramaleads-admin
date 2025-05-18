import React from "react";
import Image from "next/image";
import "../styles/Footer.css";
import ScrollToTopButton from "./../modules/ScrollToTopButton";

const Footer = () => {
  return (
    <div className="footer-container-main dark:bg-blackBg">
      <div className="footer-blya">
       
        <div className="footer-content-wrapper">
          <div className="footer-img-container"></div>
          <div className="footer-text-content">
            
            
          </div>
        </div>
      </div>

      <div className="footer-container">
        
        <div className="footer-bottom">
          <div className="footer-bottom-text">
          <ScrollToTopButton />
            © 2005-2024 All rights reserved. | Address, San Francisco, CA 94130
            | (628) 222-4891
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
