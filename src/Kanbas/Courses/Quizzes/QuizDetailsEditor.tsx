import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "./client";
import { addQuiz, updateQuiz } from "./reducer";

export default function QuizDetailsEditor() {
  const { cid, id } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const navigate = useNavigate();
  const existingQuiz = quizzes.find((quiz: any) => quiz._id === id);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(existingQuiz ? existingQuiz.title : "New Quiz");
  const [course, setCourse] = useState(existingQuiz ? existingQuiz.course : cid);
  const [points, setPoints] = useState(existingQuiz ? existingQuiz.points : 0);
  const [dueDate, setDueDate] = useState(existingQuiz ? existingQuiz.dueDate : "");
  const [untilDate, setUntilDate] = useState(existingQuiz ? existingQuiz.untilDate : "");
  const [availableDate, setAvailableDate] = useState(existingQuiz ? existingQuiz.availableDate : "");
  const [numQuestions, setNumQuestions] = useState(existingQuiz ? existingQuiz.numQuestions : 0);
  const [instructions, setInstructions] = useState(existingQuiz ? existingQuiz.instructions : "");
  const [quizType, setQuizType] = useState(existingQuiz ? existingQuiz.quizType : "GRADED_QUIZ");
  const [assignmentGroup, setAssignmentGroup] = useState(existingQuiz ? existingQuiz.assignmentGroup : "QUIZZES");
  const [shuffleAnswers, setShuffleAnswers] = useState(existingQuiz ? existingQuiz.shuffleAnswers : false);
  const [timeLimit, setTimeLimit] = useState(existingQuiz ? existingQuiz.timeLimit : 0);
  const [multipleAttempts, setMultipleAttempts] = useState(existingQuiz ? existingQuiz.multipleAttempts : false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(existingQuiz ? existingQuiz.showCorrectAnswers : "");
  const [accessCode, setAccessCode] = useState(existingQuiz ? existingQuiz.accessCode : "");
  const [oneAtATime, setOneAtATime] = useState(existingQuiz ? existingQuiz.oneAtATime : true);
  const [webcamRequired, setWebcamRequired] = useState(existingQuiz ? existingQuiz.webcamRequired : false);
  const [lockQuestions, setLockQuestions] = useState(existingQuiz ? existingQuiz.lockQuestions : false);

  const createQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
    return newQuiz._id;
  };

  const saveQuiz = async (quiz: any) => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  return (
    <div id="wd-quizzes-editor" className="container">
      <div className="row mb-3">
        <div className="col-9">
          <input
            id="wd-name"
            className="form-control"
            value={title}
            placeholder="New Quiz"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-9">
          <textarea
            id="wd-description"
            className="form-control"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
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
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
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
            value={assignmentGroup}
            onChange={(e) => setAssignmentGroup(e.target.value)}
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
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
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
            checked={shuffleAnswers}
            onChange={(e) => setShuffleAnswers(e.target.checked)}
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
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
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
            checked={multipleAttempts}
            onChange={(e) => setMultipleAttempts(e.target.checked)}
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
            type="date"
            className="form-control"
            value={showCorrectAnswers}
            onChange={(e) => setShowCorrectAnswers(e.target.value)}
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
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
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
            checked={oneAtATime}
            onChange={(e) => setOneAtATime(e.target.checked)}
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
            checked={lockQuestions}
            onChange={(e) => setLockQuestions(e.target.checked)}
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
            checked={webcamRequired}
            onChange={(e) => setWebcamRequired(e.target.checked)}
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
          />
        </div>

        <div className="col-3">
          <label htmlFor="wd-available-until">Until</label>
          <input
            type="date"
            id="wd-available-until"
            className="form-control"
            value={untilDate}
            onChange={(e) => setUntilDate(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
            <button className="btn btn-secondary me-2">Cancel</button>
          </Link>
            <button
                className="btn btn-danger"
                onClick={async () => {
                const quiz = {
                    _id: id,
                    title,
                    course,
                    points,
                    dueDate,
                    untilDate,
                    availableDate,
                    numQuestions,
                    instructions,
                    quizType,
                    assignmentGroup,
                    shuffleAnswers,
                    timeLimit,
                    multipleAttempts,
                    showCorrectAnswers,
                    accessCode,
                    oneAtATime,
                    webcamRequired,
                    lockQuestions,
                    published:false
                };
                if (existingQuiz) {
                    saveQuiz(quiz);
                } else {
                    var newQuizID = await createQuiz(quiz);
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizID}`);
                }
                }}
            >
                Save
            </button>
        </div>
      </div>
    </div>
  );
}
