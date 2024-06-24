import React, { useState } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import QuizTaker from "./QuizTaker";
export default function QuizViewer() {
    const { cid, id } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const existingQuiz = quizzes.find((quiz : any) => quiz._id === id);

    const formatDate = (dateString: any) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };

  return (
    <div id="wd-quiz-viewer" className="container">
        <div className="ms-auto d-flex">
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${id}`}>
              <button className="btn btn-secondary d-flex align-items-center me-5">
                  Preview
              </button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${id}/edit`}>
                <button className="btn btn-secondary d-flex align-items-center me-5">
                    <FaPencil/>
                    Edit
                </button>
            </Link>
        </div>
        <hr className="my-2" style={{ borderColor: "#ccc" }} />
      <h1>
        {existingQuiz.title}
      </h1>
      <p>{existingQuiz.instructions}</p>
      <ul style={{ listStyleType: "none" }}>
        <li><b>Quiz Type</b> {existingQuiz.quizType}</li>
        <li><b>Points:</b> {existingQuiz.points}</li>
        <li><b>Due Date:</b> {formatDate(existingQuiz.dueDate)}</li>
        <li><b>Available Date:</b> {formatDate(existingQuiz.availableDate)}</li>
        <li><b>Until Date:</b> {formatDate(existingQuiz.untilDate)}</li>
        <li><b>Number of Questions:</b> {existingQuiz.numQuestions}</li>
        <li><b>Assignment Group:</b> {existingQuiz.assignmentGroup}</li>
        <li><b>Shuffle Answers:</b> {existingQuiz.shuffleAnswers ? "Yes" : "No"}</li>
        <li><b>Time Limit:</b> {existingQuiz.timeLimit} minutes</li>
        <li><b>Multiple Attempts:</b> {existingQuiz.multipleAttempts ? "Allowed" : "Not Allowed"}</li>
        <li><b>How Many Attempts:</b> {existingQuiz.howManyAttempts}</li>
        <li><b>Show Correct Answers:</b> {existingQuiz.showCorrectAnswers ? "Yes" : "No"}</li>
        <li><b>Access Code:</b> {existingQuiz.accessCode}</li>
        <li><b>One At A Time:</b> {existingQuiz.oneAtATime ? "Yes" : "No"}</li>
        <li><b>Webcam Required:</b> {existingQuiz.webcamRequired ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
}