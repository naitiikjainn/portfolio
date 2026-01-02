import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";

function DSAStats() {
    const [leetcodeData, setLeetcodeData] = useState(null);
    const [cfData, setCfData] = useState(null);


    useEffect(() => {
        // LeetCode
        fetch("https://leetcode-stats-api.herokuapp.com/jnaitik291")
            .then((res) => res.json())
            .then((data) => setLeetcodeData(data))
            .catch((err) => console.error(err));

        // CodeForces
        fetch("https://codeforces.com/api/user.info?handles=naitikjainn")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "OK") {
                    setCfData(data.result[0]);
                }
            })
            .catch((err) => console.error(err));


    }, []);

    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
                <strong className="purple">Competitive Programming</strong> Stats
            </h1>

            {/* LeetCode */}
            <Col md={4} className="project-card">
                <Card className="project-card-view">
                    <Card.Body>
                        <div style={{ fontSize: "50px", marginBottom: "10px" }}>
                            <SiLeetcode />
                        </div>
                        <Card.Title>LeetCode</Card.Title>
                        <Card.Text style={{ textAlign: "center" }}>
                            Handle: <strong className="purple">jnaitik291</strong>
                        </Card.Text>
                        {leetcodeData && leetcodeData.status === "success" ? (
                            <div style={{ textAlign: "left", paddingLeft: "15px", fontSize: "1.1em" }}>
                                <p>🏆 Total Solved: <strong>{leetcodeData.totalSolved}</strong></p>
                                <p>🟢 Easy: <strong>{leetcodeData.easySolved}</strong></p>
                                <p>🟡 Medium: <strong>{leetcodeData.mediumSolved}</strong></p>
                                <p>🔴 Hard: <strong>{leetcodeData.hardSolved}</strong></p>
                            </div>
                        ) : (
                            <p>Loading stats...</p>
                        )}
                        <a href="https://leetcode.com/jnaitik291" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: "10px" }}>
                            View Profile
                        </a>
                    </Card.Body>
                </Card>
            </Col>

            {/* CodeForces */}
            <Col md={4} className="project-card">
                <Card className="project-card-view">
                    <Card.Body>
                        <div style={{ fontSize: "50px", marginBottom: "10px" }}>
                            <SiCodeforces />
                        </div>
                        <Card.Title>CodeForces</Card.Title>
                        <Card.Text style={{ textAlign: "center" }}>
                            Handle: <strong className="purple">naitikjainn</strong>
                        </Card.Text>
                        {cfData ? (
                            <div style={{ textAlign: "left", paddingLeft: "15px", fontSize: "1.1em" }}>
                                <p>⭐ Rank: <strong className="purple" style={{ textTransform: "capitalize" }}>{cfData.rank}</strong></p>
                                <p>📉 Rating: <strong>{cfData.rating}</strong></p>
                                <p>📈 Max Rating: <strong>{cfData.maxRating}</strong></p>
                                <p>🏅 Max Rank: <strong className="purple" style={{ textTransform: "capitalize" }}>{cfData.maxRank}</strong></p>
                            </div>
                        ) : (
                            <p>Loading stats...</p>
                        )}

                        <a href="https://codeforces.com/profile/naitikjainn" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: "10px" }}>
                            View Profile
                        </a>
                    </Card.Body>
                </Card>
            </Col>

            {/* CodeChef */}
            <Col md={4} className="project-card">
                <Card className="project-card-view">
                    <Card.Body>
                        <div style={{ fontSize: "50px", marginBottom: "10px" }}>
                            <SiCodechef />
                        </div>
                        <Card.Title>CodeChef</Card.Title>
                        <Card.Text style={{ textAlign: "center" }}>
                            Handle: <strong className="purple">naitikjain10</strong>
                        </Card.Text>
                        <div style={{ textAlign: "left", paddingLeft: "15px", fontSize: "1.1em" }}>
                            <p>⭐ Stars: <strong className="purple">4★</strong></p>
                            <p>📉 Rating: <strong>1846</strong></p>
                            <p>📈 Highest Rating: <strong>1871</strong></p>
                        </div>
                        <a href="https://www.codechef.com/users/naitikjain10" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: "10px" }}>
                            View Profile
                        </a>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default DSAStats;
