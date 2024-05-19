export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container">
      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="wd-name">Assignment Name</label>
          <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="wd-description">Description</label>
          <textarea id="wd-description" className="form-control">
            The assignment is available online Submit a link to the landing page of
          </textarea>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-2 d-flex align-items-center justify-content-left">
          <label htmlFor="wd-points">Points</label>
        </div>
        <div className="col-2">
          <input id="wd-points" className="form-control justify-content-left" value={100} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="wd-group">Assignment Group</label>
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">Assignments</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="wd-display-grade-as">Display Grade As</label>
          <select id="wd-display-grade-as" className="form-select">
            <option value="PERCENTAGE">Percentage</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="wd-submission-type">Submission Type</label>
          <select id="wd-submission-type" className="form-select">
            <option value="ONLINE">Online</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <label>Online Entry Options</label>
          <br />
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
        <div className="col-12">
          <label htmlFor="wd-assign-to">Assign To</label>
          <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-due-date">Due</label>
          <input type="date" id="wd-due-date" className="form-control" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-available-from">Available From</label>
          <input type="date" id="wd-available-from" className="form-control" />
        </div>
        <div className="col-6">
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
  );
}