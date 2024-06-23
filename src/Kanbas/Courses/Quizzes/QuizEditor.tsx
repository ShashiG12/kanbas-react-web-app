import React, { useState } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { addQuiz, updateQuiz } from "./reducer";
import { Link } from "react-router-dom";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
export default function QuizEditor() {
    const { cid, id } = useParams();
    const [activeTab, setActiveTab] = useState("details");
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const existingQuiz = quizzes.find((quiz: any) => quiz._id === id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialQuizState = {
      title: existingQuiz ? existingQuiz.title : "",
      course: existingQuiz ? existingQuiz.course : "",
      points: existingQuiz ? existingQuiz.points : 0,
      dueDate: existingQuiz ? existingQuiz.dueDate : "",
      availableDate: existingQuiz ? existingQuiz.availableDate : "",
      instructions: existingQuiz ? existingQuiz.instructions : "",
      quizType: existingQuiz ? existingQuiz.quizType : "GRADED_QUIZ",
      assignmentGroup: existingQuiz ? existingQuiz.assignmentGroup : "QUIZZES",
      shuffleAnswers: existingQuiz ? existingQuiz.shuffleAnswers : true,
      timeLimit: existingQuiz ? existingQuiz.timeLimit : 0,
      multipleAttempts: existingQuiz ? existingQuiz.multipleAttempts : false,
      showCorrectAnswers: existingQuiz ? existingQuiz.showCorrectAnswers : true,
      accessCode: existingQuiz ? existingQuiz.accessCode : "",
      oneAtATime: existingQuiz ? existingQuiz.oneAtATime : true,
      webcamRequired: existingQuiz ? existingQuiz.webcamRequired : false,
      questions: existingQuiz ? existingQuiz.questions : [],
      userAttempts: existingQuiz ? existingQuiz.userAttempts: []
    };
    const [newQuiz, setNewQuiz] = useState(initialQuizState);

    const createQuiz = async () => {
      const tempQuiz = await client.createQuiz(cid as string, {...newQuiz, course:cid});
      dispatch(addQuiz(tempQuiz));
      return tempQuiz._id;
    };
  
    const saveQuiz = async () => {
      const status = await client.updateQuiz({...newQuiz, _id:id, course:cid});
      dispatch(updateQuiz({...newQuiz, _id:id, course:cid}));
    };

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
        {activeTab === "details" ? <QuizDetailsEditor quiz={newQuiz} setQuiz={setNewQuiz}/> :  <QuizQuestionsEditor quiz={newQuiz} setQuiz={setNewQuiz}/>}
      </div>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${id}/view`}>
            <button className="btn btn-secondary me-2">Cancel</button>
          </Link>
            <button
                className="btn btn-danger"
                onClick={async () => {
                  if (existingQuiz) {
                      saveQuiz();
                      navigate(`/Kanbas/Courses/${cid}/Quizzes/${id}`);
                  } else {
                      var newQuizID = await createQuiz();
                      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizID}`);
                  }
                }}
            >
                Save
            </button>
    </div>
  );
}
