import React, { useState } from "react";
import "../Admin_view/styles/layer.css";
import topArrow from "../../assets/upload.png";
import bottomArrow from "../../assets/down.png";
const Layer = () => {
  const [dropdown, setdropdown] = useState(true);

  const DropdownHandler = () => {
    setdropdown(!dropdown);
  };
  return (
    <div className="adminlayer">
        <div className={dropdown ? "active": "inactive"}>
      <div className="displayTopSide"style={dropdown ?{}: { backgroundColor: "#c0e4a454"  }}>
          <div className="right_side_Arrow" onClick={DropdownHandler}>
            {dropdown ? (
              <img src={bottomArrow} alt="bottomArrow" style={{ width: "30px" }} />
            ) : (
              <img
                src={ topArrow}
                alt="topArrow"
                style={{ width: "20px" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layer;
