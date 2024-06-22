import React, { useState } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
export default function QuizEditor() {
    const [activeTab, setActiveTab] = useState("details");
  return (
    <div id="wd-quizzes-editor" className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : "text-danger"}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : "text-danger"}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === "details" ? <QuizDetailsEditor/> :  <QuizDetailsEditor/>}
      </div>
    </div>
  );
}
