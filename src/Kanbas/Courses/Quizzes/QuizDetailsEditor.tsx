import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "./client";
import { addQuiz, updateQuiz } from "./reducer";

export default function QuizDetailsEditor({quiz, setQuiz} : {quiz:any, setQuiz: (quiz:any) => void}) {
  const { cid, id } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const navigate = useNavigate();
  const existingQuiz = quizzes.find((quiz: any) => quiz._id === id);
  const dispatch = useDispatch();

  return (
    <div id="wd-quizzes-editor" className="container">
      <div className="row mb-3">
        <div className="col-9">
          <input
            id="wd-name"
            className="form-control"
            value={quiz.title}
            placeholder="New Quiz"
            onChange={(e) => setQuiz({...quiz, title: e.target.value})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-9">
          <textarea
            id="wd-description"
            className="form-control"
            value={quiz.instructions}
            onChange={(e) => setQuiz({...quiz, instructions: e.target.value})}
            placeholder="Instructions"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-points">Points</label>
        </div>
        <div className="col-9">
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={quiz.points}
            onChange={(e) => setQuiz({...quiz, points: e.target.value})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-group">Assignment Group</label>
        </div>
        <div className="col-9">
          <select
            id="wd-group"
            className="form-select"
            value={quiz.assignmentGroup}
            onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value})}
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-quiz-type">Quiz Type</label>
        </div>
        <div className="col-9">
          <select
            id="wd-quiz-type"
            className="form-select"
            value={quiz.quizType}
            onChange={(e) => setQuiz({...quiz, quizType: e.target.value})}
          >
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-shuffle-answers">Shuffle Answers</label>
        </div>
        <div className="col-9">
          <input
            id="wd-shuffle-answers"
            type="checkbox"
            className="form-check-input"
            checked={quiz.shuffleAnswers}
            onChange={(e) => setQuiz({...quiz, shuffleAnswers: e.target.checked})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-time-limit">Time Limit (minutes)</label>
        </div>
        <div className="col-9">
          <input
            id="wd-time-limit"
            type="number"
            className="form-control"
            value={quiz.timeLimit}
            onChange={(e) => setQuiz({...quiz, timeLimit: Number(e.target.value)})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-multiple-attempts">Multiple Attempts</label>
        </div>
        <div className="col-9">
          <input
            id="wd-multiple-attempts"
            type="checkbox"
            className="form-check-input"
            checked={quiz.multipleAttempts}
            onChange={(e) => setQuiz({...quiz, multipleAttempts: e.target.checked})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-show-correct-answers">Show Correct Answers</label>
        </div>
        <div className="col-9">
          <input
            id="wd-show-correct-answers"
            type="checkbox"
            className="form-check-input"
            checked={quiz.showCorrectAnswers}
            onChange={(e) => setQuiz({...quiz, showCorrectAnswers: e.target.checked})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-access-code">Access Code</label>
        </div>
        <div className="col-9">
          <input
            id="wd-access-code"
            type="text"
            className="form-control"
            value={quiz.accessCode}
            onChange={(e) => setQuiz({...quiz, accessCode: e.target.value})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-one-at-a-time">One Question at a Time</label>
        </div>
        <div className="col-9">
          <input
            id="wd-one-at-a-time"
            type="checkbox"
            className="form-check-input"
            checked={quiz.oneAtATime}
            onChange={(e) => setQuiz({...quiz, oneAtATime: e.target.checked})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-webcam-required">Lock Questions After Answering</label>
        </div>
        <div className="col-9">
          <input
            id="wd-lock-questions"
            type="checkbox"
            className="form-check-input"
            checked={quiz.lockQuestions}
            onChange={(e) => setQuiz({...quiz, lockQuestions: e.target.checked})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-webcam-required">Webcam Required</label>
        </div>
        <div className="col-9">
          <input
            id="wd-webcam-required"
            type="checkbox"
            className="form-check-input"
            checked={quiz.webcamRequired}
            onChange={(e) => setQuiz({...quiz, webcamRequired: e.target.checked})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label>Assign</label>
        </div>
        <div className="col-9">
          <label htmlFor="wd-assign-to">Assign To</label>
          <input
            id="wd-assign-to"
            className="form-control"
            defaultValue="Everyone"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-due-date">Due Date</label>
        </div>
        <div className="col-9">
          <input
            type="date"
            id="wd-due-date"
            className="form-control"
            value={quiz.due_date}
            onChange={(e) => setQuiz({...quiz, dueDate: e.target.value})}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-available-from">Available From</label>
        </div>
        <div className="col-3">
          <input
            type="date"
            id="wd-available-from"
            className="form-control"
            value={quiz.availableDate}
            onChange={(e) => setQuiz({...quiz, availableDate: e.target.value})}
          />
        </div>

        <div className="col-3">
          <label htmlFor="wd-available-until">Until</label>
          <input
            type="date"
            id="wd-available-until"
            className="form-control"
            value={quiz.untilDate}
            onChange={(e) => setQuiz({...quiz, untilDate: e.target.value})}
          />
        </div>
      </div>
    </div>
  );
}
