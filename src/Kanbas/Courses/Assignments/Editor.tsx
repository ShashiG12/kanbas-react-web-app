import React, { useState } from "react";
import { useParams } from "react-router";
import * as db from "../../Database";
import { addAssignment, editAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "./client";

export default function AssignmentEditor() {
  const { cid, id } = useParams();

  // const [assignmentID, setID] = useState("A606");
  // const [title, setTitle] = useState(existingAssignment.title);
  // const [description, setDescription] = useState(existingAssignment.description);
  // const [points, setPoints] = useState(existingAssignment.points);
  // const [due_date, setDueDate] = useState(existingAssignment.due_date);
  // const [available_date, setAvailableDate] = useState(existingAssignment.available_date);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const existingAssignment = assignments.find((assignment : any) => assignment._id === id);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(existingAssignment ? existingAssignment.title : "");
  const [description, setDescription] = useState(existingAssignment ? existingAssignment.description : "");
  const [points, setPoints] = useState(existingAssignment ? existingAssignment.points : "");
  const [due_date, setDueDate] = useState(existingAssignment ? existingAssignment.due_date : "");
  const [available_date, setAvailableDate] = useState(existingAssignment ? existingAssignment.available_date : "");

  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(cid as string, assignment);
    dispatch(addAssignment(newAssignment));
  };
  const saveAssignment = async (assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  
  return (
    <div id="wd-assignments-editor" className="container">
      <div>
      <div className="row mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <div className="col-9">
          <input id="wd-name" className="form-control" value={title} 
          onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-9">
          <textarea id="wd-description" className="form-control"
          onChange={(e) => setDescription(e.target.value)}>
            {description}
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
          <input type="date" id="wd-due-date" className="form-control" value={due_date}
          onChange={(e) => setDueDate(e.target.value)}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
        </div>
        <div className="col-3">
        <label htmlFor="wd-available-from">Available from</label>
          <input type="date" id="wd-available-from" className="form-control" value={available_date}
          onChange={(e) => setAvailableDate(e.target.value)}/>
        </div>

        <div className="col-3">
        <label htmlFor="wd-available-until">Until</label>
          <input type="date" id="wd-available-until" className="form-control" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
            <button className="btn btn-secondary me-2">Cancel</button>
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
            <button className="btn btn-danger"
            onClick={() => {
              if (existingAssignment) {
                saveAssignment({ _id:id, title, course: cid, description, points, due_date, available_date });
              } else {
                console.log("added")
                createAssignment({ _id:id, title, course: cid, description, points, due_date, available_date });
              }
              console.log(assignments);
            }}
            >Save</button>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}