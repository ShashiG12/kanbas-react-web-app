import { useParams } from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, id } = useParams();
  const assignments = db.assignments;
  
  return (
    <div id="wd-assignments-editor" className="container">
      {assignments
      .filter((assignment: any) => assignment._id === id)
      .map((assignment: any) => (
      <div>
      <div className="row mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <div className="col-9">
          <input id="wd-name" className="form-control" value={assignment.title} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-9">
          <textarea id="wd-description" className="form-control">
            {assignment.description}
          </textarea>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="wd-points">Points</label>
        </div>
        <div className="col-9">
          <input id="wd-points" className="form-control" value={assignment.points} />
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
          <input type="date" id="wd-due-date" className="form-control" value={assignment.due_date}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center">
        </div>
        <div className="col-3">
        <label htmlFor="wd-available-from">Available from</label>
          <input type="date" id="wd-available-from" className="form-control" value={assignment.available_date}/>
        </div>

        <div className="col-3">
        <label htmlFor="wd-available-until">Until</label>
          <input type="date" id="wd-available-until" className="form-control" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <button className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-danger">Save</button>
        </div>
      </div>
      </div>
      ))}
    </div>
  );
}