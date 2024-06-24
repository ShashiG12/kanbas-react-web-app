import { useState, useEffect } from "react";
import QuizOuterControls from "./QuizOuterControls";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { useNavigate, useParams } from "react-router";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { MdDoNotDisturb, MdOutlineAssignment } from "react-icons/md";
import { Link } from "react-router-dom";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import moment from "moment";

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
  const { currentUser } = useSelector((state: any) => state.accountReducer);

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

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAvailabilityStatus = (quiz: any) => {
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.untilDate);
    const dueDate = new Date(quiz.dueDate);

    const currentDate = new Date();
    if (currentDate > availableUntilDate) {
      return "Closed";
    } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
      return "Available";
    } else if (currentDate < availableDate) {
      return `Not available until ${formatDateString(quiz.availableDate)}`;
    } else {
      return "Closed";
    }
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
              .filter((quiz: any) => quiz.course === cid && (currentUser.role === "STUDENT" ? quiz.published === true : true))
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
                      {currentUser.role === "FACULTY" && 
                      <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/view`}
                        className="wd-assignment-link text-dark"
                        style={{ textDecoration: "none" }}
                      >
                        <b>{quiz.title}</b>
                      </Link>
                      } 
                      {currentUser.role === "STUDENT" && 
                      <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                        className="wd-assignment-link text-dark"
                        style={{ textDecoration: "none" }}
                      >
                        <b>{quiz.title}</b>
                      </Link>
                      } 
                      <br />
                      <b>{getAvailabilityStatus(quiz)}</b>
                      <br />
                      <b>Due</b> {moment(quiz.dueDate).format("YYYY-MM-DD")} | {quiz.points} pts
                      {currentUser.role === "FACULTY" && 
                        <div className="d-flex align-items-center float-end">
                              {quiz.published ? <GreenCheckmark /> : <MdDoNotDisturb color="red"/>}
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
                      }
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
      {quizzes.length === 0 ? (
              <div className="alert alert-danger col-2 text-center mx-auto">
                  Add a quiz to get started!
              </div>
              ) : <></>}
    </div>
  );
}
