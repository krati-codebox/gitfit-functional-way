import React from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images";

export const OfflinePage = () => (
  <div>
    <div className="offlineimg">
      <img
        src={images.logo_img}
        alt="logo_img"
        style={{
          width: 100,
          height: 50,
          display: "block",
          margin: "auto",
          position: "relative",
        }}
      />
    </div>
    <br />
    <br />
    <div>
      <img
        src={images.offline}
        alt="offline"
        style={{
          width: 100,
          height: 100,
          display: "block",
          margin: "auto",
          position: "relative",
        }}
      />
    </div>
    <center>
      <b style={{ fontSize: "20px" }}> Connect to the Internet </b>
      <h4 style={{ fontSize: "16px" }}>
        You're offline. Check your connection.
      </h4>
    </center>
  </div>
);
