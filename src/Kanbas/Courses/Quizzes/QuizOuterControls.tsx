import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, setQuizzes } from "./reducer";

export default function QuizOuterControls({
  addQuiz,
}: {
  addQuiz: () => void;
}) {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);

  return (
    <div className="d-flex align-items-center mb-3">
      <div className="input-group input-group-sm form-outline me-2 mb-small w-25">
        <span
          className="input-group-text bg-white border-right-0"
          id="inputGroup-sizing-sm"
        >
          <CiSearch />
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Search..."
        />
      </div>
      <div className="ms-auto d-flex">
        <button
          className="btn btn-danger d-flex align-items-center me-5"
        >
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes/New-Quiz`}
            style={{ color: "white", textDecoration: "none" }}
          >
            <FaPlus className="me-1" />
            Quiz
          </Link>
        </button>
      </div>
    </div>
  );
}
