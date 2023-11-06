import React from "react";
import './nourRounded.css'

function RoundedBackgroundMain({ children }) {
    return (
      <div className="rounded-background-nour">
        {children}
      </div>
    );
  }

export default RoundedBackgroundMain;