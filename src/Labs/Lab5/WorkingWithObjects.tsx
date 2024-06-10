import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
  return (
    <div id="wd-working-with-objects">
    <h4>Modifying Properties</h4>
        <a id="wd-update-assignment-title"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
        </a>
        <input className="form-control w-75" id="wd-assignment-title"
        value={assignment.title} onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })}/>
        <hr />
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr/>
      <input className="form-control w-75" id="wd-assignment-score"
        type="number" value={assignment.score} onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })}/>
        <a id="wd-submit-assignment-score" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/score/${assignment.score}`}>
        Update Score
      </a><hr/>
      <input className="w-75" id="wd-assignment-score"
        type="checkbox" checked={assignment.completed} onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })}/>
        <a id="wd-submit-assignment-completed" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/completed/${assignment.completed}`}>
        Update Completed
      </a><hr/>
    </div>
);}

