import React from 'react';
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import GreenCheckmark from "../Modules/GreenCheckmark";
import AssignmentControls from "./AssignmentsControls";
import AssignmentOuterControls from "./AssignmentOuterControls";
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div id="wd-assignments">
      <div className="row">
        <AssignmentOuterControls />
      </div>
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignmentControls />
          </div>
          <ul className="wd-lessons list-group rounded-0">
          {assignments
            .filter((assignment: any) => assignment.course === cid)
            .map((assignment: any) => (
            <li id="wd-assignment-list-item" className="wd-lesson list-group-item p-3 ps-1" style={{borderLeftColor:"green", borderLeftWidth:"5px"}}>
              <div className="row">
                <div className="col ps-2">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="text-success me-2"/>
                    <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-dark" style={{textDecoration: "none"}}>
                      <b>{assignment.title}</b>
                    </Link>
                  <br />
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> {assignment.available_date} |
                  <br />
                  <b>Due</b> {assignment.due_date} | {assignment.points} pts
                  <AssignmentsControlButtons />
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
