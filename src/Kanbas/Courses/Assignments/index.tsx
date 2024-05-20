import React from 'react';
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import GreenCheckmark from "../Modules/GreenCheckmark";
import AssignmentControls from "./AssignmentsControls";
import AssignmentOuterControls from "./AssignmentOuterControls";

export default function Assignments() {
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
            <li id="wd-assignment-list-item" className="wd-lesson list-group-item p-3 ps-1" style={{borderLeftColor:"green", borderLeftWidth:"5px"}}>
              <div className="row">
                <div className="col ps-2">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="text-success me-2"/>
                  <a
                    className="wd-assignment-link text-dark"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                    style={{textDecoration:"None"}}
                  >
                    <b>A1 - ENV + HTML</b>
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am |
                  <br />
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                  <AssignmentsControlButtons />
                </div>
              </div>
            </li>
            <li id="wd-assignment-list-item" className="wd-lesson list-group-item p-3 ps-1" style={{borderLeftColor:"green", borderLeftWidth:"5px"}}>
              <div className="row">
                <div className="col ps-2">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="text-success me-2"/>
                  <a
                    className="wd-assignment-link text-dark font-italic"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                    style={{textDecoration:"None"}}
                  >
                    <b>A2 - CSS + BOOTSTRAP</b>
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am |
                  <br />
                  <b>Due</b> May 20 at 11:59pm | 100 pts
                  <AssignmentsControlButtons />
                </div>
              </div>
            </li>
            <li id="wd-assignment-list-item" className="wd-lesson list-group-item p-3 ps-1" style={{borderLeftColor:"green", borderLeftWidth:"5px"}}>
              <div className="row">
                <div className="col ps-2">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="text-success me-2"/>
                  <a
                    className="wd-assignment-link text-dark font-italic"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                    style={{textDecoration:"None"}}
                  >
                    <b>A3 - JAVASCRIPT + REACT</b>
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am |
                  <br />
                  <b>Due</b> May 27 at 11:59pm | 100 pts
                  <AssignmentsControlButtons />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
