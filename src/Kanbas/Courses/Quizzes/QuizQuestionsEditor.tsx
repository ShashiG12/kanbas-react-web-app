import React, { useState } from "react";
import { useParams } from "react-router";
import * as db from "../../Database";
import { addQuiz, editQuiz, updateQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "./client";

export default function QuizQuestionsEditor() {
  const { cid, id } = useParams();

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const existingQuiz = quizzes.find((quiz : any) => quiz._id === id);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(existingQuiz ? existingQuiz.title : "");
  const [course, setCourse] = useState(existingQuiz ? existingQuiz.course : "");
  const [points, setPoints] = useState(existingQuiz ? existingQuiz.points : 0);
  const [dueDate, setDueDate] = useState(existingQuiz ? existingQuiz.dueDate : "");
  const [untilDate, setUntilDate] = useState(existingQuiz ? existingQuiz.untilDate : "");
  const [availableDate, setAvailableDate] = useState(existingQuiz ? existingQuiz.availableDate : "");
  const [numQuestions, setNumQuestions] = useState(existingQuiz ? existingQuiz.numQuestions : 0);
  const [instructions, setInstructions] = useState(existingQuiz ? existingQuiz.instructions : 0);
  const [quizType, setQuizType] = useState(existingQuiz ? existingQuiz.quizType : "");
  const [assignmentGroup, setAssignmentGroup] = useState(existingQuiz ? existingQuiz.assignmentGroup : "");
  const [shuffleAnswers, setShuffleAnswers] = useState(existingQuiz ? existingQuiz.shuffleAnswers : "");
  const [timeLimit, setTimeLimit] = useState(existingQuiz ? existingQuiz.timeLimit : 0);
  const [multipleAttempts, setMultipleAttempts] = useState(existingQuiz ? existingQuiz.multipleAttempts : false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(existingQuiz ? existingQuiz.showCorrectAnswers : null);
  const [accessCode, setAccessCode] = useState(existingQuiz ? existingQuiz.accessCode : "");
  const [oneAtATime, setOneAtATime] = useState(existingQuiz ? existingQuiz.oneAtATime : true);
  const [webcamRequired, setWebcamRequired] = useState(existingQuiz ? existingQuiz.webcamRequired : false);

  const createQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  }
  const saveQuiz = async (quiz: any) => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  
  return (
    <div id="wd-quizzes-editor" className="container">
      <div>
      <div className="row mb-3">
        <div className="col-9">
          <input id="wd-name" className="form-control" value={title} placeholder="New Quiz"
          onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-9">
          <textarea id="wd-description" className="form-control"
          onChange={(e) => setInstructions(e.target.value)}>
            {instructions}
          </textarea>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-points">Points</label>
        </div>
        <div className="col-9">
          <input id="wd-points" className="form-control" value={points} 
          onChange={(e) => setPoints(e.target.value)}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-group">Assignment Group</label>
        </div>
        <div className="col-9">
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">Assignments</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-display-grade-as">Display Grade As</label>
        </div>
        <div className="col-9">
          <select id="wd-display-grade-as" className="form-select">
            <option value="PERCENTAGE">Percentage</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-submission-type">Submission Type</label>
        </div>
        <div className="col-9">
          <select id="wd-submission-type" className="form-select">
            <option value="ONLINE">Online</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
        </div>
        <div className="col-9">
          <label>Online Entry Options</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-text-entry" />
            <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-website-url" />
            <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
            <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
            <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-file-upload" />
            <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
        <label>Assign</label>
        </div>
        <div className="col-9">
        <label htmlFor="wd-assign-to">Assign To</label>
          <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
        </div>
        <div className="col-9">
        <label htmlFor="wd-due-date">Due</label>
          <input type="date" id="wd-due-date" className="form-control" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
        </div>
        <div className="col-3">
        <label htmlFor="wd-available-from">Available from</label>
          <input type="date" id="wd-available-from" className="form-control" value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}/>
        </div>

        <div className="col-3">
        <label htmlFor="wd-available-until">Until</label>
          <input type="date" id="wd-available-until" className="form-control" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
            <button className="btn btn-secondary me-2">Cancel</button>
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
            <button className="btn btn-danger"
            onClick={() => {
              if (existingQuiz) {
                saveQuiz({ _id:id, title, course: cid, instructions, points, dueDate, availableDate });
              } else {
                console.log("added")
                createQuiz({title:"New Quiz", course:cid as String});
              }
            }}
            >Save</button>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}