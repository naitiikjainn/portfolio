import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import CPHeatmap from "../CP/CPHeatmap";
function Github() {
  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "10px",
        color: "white",
      }}
    >
      <h1
        className="project-heading pb-4"
        style={{ paddingBottom: "20px" }}
      >
        Days I <strong className="purple">Code</strong>
      </h1>

      {/* GitHub heatmap */}
      {/* <GitHubCalendar
        username="naitiikjainn"
        blockSize={30}
        blockMargin={10}
        color="#c084f5"
        fontSize={20}
      /> */}

      {/* Thoda gap */}
      <div style={{ height: "40px" }} />

      {/* Codeforces heatmap – SAME STYLE usage */}
      {/* <h1
        className="project-heading pb-4"
        style={{ paddingBottom: "20px" }}
      >
        Competitive <strong className="purple">Programming</strong> Activity
      </h1> */}

      <CPHeatmap username="naitikjainn" />
    </Row>
  );
}
export default Github;
