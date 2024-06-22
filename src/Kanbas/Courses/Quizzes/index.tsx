import { useState, useEffect } from "react";
import QuizOuterControls from "./QuizOuterControls";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { useNavigate, useParams } from "react-router";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { Link } from "react-router-dom";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const dispatch = useDispatch();
  const [activeQuizId, setActiveQuizId] = useState("");
  const navigate = useNavigate();
  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const createQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  }

  const removeQuiz = async (quizID: string) => {
    await client.deleteQuiz(quizID);
    dispatch(deleteQuiz(quizID));
  };

  const saveQuiz = async (quiz: any) => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const toggleContextMenu = (quizId: any) => {
    setActiveQuizId(quizId === activeQuizId ? null : quizId);
  };

  return (
    <div id="wd-quizzes">
      <h1>Quizzes</h1>
      <QuizOuterControls addQuiz={() => createQuiz({title:"New Quiz", course:cid as String})}/>
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            Quizzes
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {quizzes
              .filter((quiz: any) => quiz.course === cid)
              .map((quiz: any) => (
                <li
                  id="wd-assignment-list-item"
                  className="wd-lesson list-group-item p-3 ps-1"
                  style={{ borderLeftColor: "green", borderLeftWidth: "5px" }}
                  key={quiz._id}
                >
                  <div className="row">
                    <div className="col ps-2">
                      <MdOutlineAssignment className="text-success me-2" />
                      <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                        className="wd-assignment-link text-dark"
                        style={{ textDecoration: "none" }}
                      >
                        <b>{quiz.title}</b>
                      </Link>
                      <br />
                      <b>Not available until</b>{" "}
                      {quiz.availableDate} |
                      <br />
                      <b>Due</b> {quiz.dueDate} | {quiz.points} pts
                      <div className="d-flex align-items-center float-end">
                            <GreenCheckmark />
                            <IoEllipsisVertical
                            className="fs-4 ms-3"
                            onClick={() => toggleContextMenu(quiz._id)}
                            style={{ cursor: "pointer" }}
                            id={`dropdown-menu-${quiz._id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded={activeQuizId === quiz._id}
                            />
                            <ul className={`dropdown-menu dropdown-menu-end ${activeQuizId === quiz._id ? "show" : ""}`} aria-labelledby={`dropdown-menu-${quiz._id}`}>
                            <li onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${activeQuizId}/edit`)} className="dropdown-item">Edit</li>
                            <li onClick={() => removeQuiz(activeQuizId)} className="dropdown-item">Delete</li>
                            <li onClick={() => saveQuiz({ ...quiz, published: !quiz.published })} className="dropdown-item">{quiz.published ? "Unpublish" : "Publish"}</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
