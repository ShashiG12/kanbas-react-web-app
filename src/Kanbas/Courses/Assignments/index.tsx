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
            <MdOutlineAssignment />
            ASSIGNMENTS
            <AssignmentControls />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment />
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A1 - ENV + HTML
              </a>
              <br></br>
              Multiple Modules | <b>Not available until</b> May 6 at 12:00am |
              <br></br>
              <b>Due</b> May 13 at 11:59pm | 100 pts
              <AssignmentsControlButtons />
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment />
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A2 - CSS + BOOTSTRAP
              </a>
              <br></br>
              Multiple Modules | <b>Not available until</b> May 13 at 12:00am |
              <br></br>
              <b>Due</b> May 20 at 11:59pm | 100 pts
              <AssignmentsControlButtons />
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment />
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                A3 - JAVASCRIPT + REACT
              </a>
              <br></br>
              Multiple Modules | <b>Not available until</b> May 20 at 12:00am |
              <br></br>
              <b>Due</b> May 27 at 11:59pm | 100 pts
              <AssignmentsControlButtons />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
