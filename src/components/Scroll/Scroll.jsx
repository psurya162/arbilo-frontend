import React from 'react';
import ScrollToTop from "react-scroll-to-top";
import "./Scroll.css"; // Import CSS file

const Scroll = () => {
  return (
    <div>
      
     
      <ScrollToTop 
        smooth 
        className="scroll-to-top" // Add class for styling
      />
    </div>
  );
};

export default Scroll;
