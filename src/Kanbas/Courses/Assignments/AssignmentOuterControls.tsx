import React from 'react';
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function AssignmentOuterControls() {
  const { cid } = useParams();
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="input-group input-group-sm form-outline me-2 mb-small w-25">
        <span className="input-group-text bg-white border-right-0" id="inputGroup-sizing-sm">
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
        <button className="btn btn-secondary me-2 d-flex align-items-center">
          <FaPlus className="me-1" />
          Group
        </button>
        <button className="btn btn-danger d-flex align-items-center">
          <Link
            to={`/Kanbas/Courses/${cid}/Assignments/New-Assignment`}
            style={{ color: "white", textDecoration: "none" }}
          >
            <FaPlus className='me-1'/>
            Assignment
          </Link>
        </button>
      </div>
    </div>
  );
}
