export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
      </table>
      <br />
      <label htmlFor="wd-group">Assignment Group</label>
      <select id="wd-group">
        <option value="ASSIGNMENTS">Assignments</option>
      </select>
      <br />
      <label htmlFor="wd-display-grade-as">Display Grade As</label>
      <select id="wd-display-grade-as">
        <option value="PERCENTAGE">Percentage</option>
      </select>
      <br />
      <label htmlFor="wd-submission-type">Submission Type</label>
      <select id="wd-submission-type">
        <option value="ONLINE">Online</option>
      </select>
      <br />
      <label>Online Entry Options</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-text-entry" />
      <label htmlFor="wd-text-entry">Text Entry</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-website-url" />
      <label htmlFor="wd-website-url">Website URL</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-media-recordings" />
      <label htmlFor="wd-media-recordings">Media Recordings</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-student-annotation" />
      <label htmlFor="wd-student-annotation">Student Annotation</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-file-upload" />
      <label htmlFor="wd-file-upload">File Uploads</label>
      <br />

      <br />
      <label htmlFor="wd-assign-to">Assign Assign to</label>
      <br />
      <input defaultValue="Everyone" id="wd-assign-to"></input>
      <br />

      <label htmlFor="wd-due-date">Due</label>
      <br />
      <input type="date" id="wd-due-date"></input>
      <br />

      <label htmlFor="wd-available-from">Available From</label>
      <label htmlFor="wd-available-until">Until  </label>
      <br />
      <input type="date" id="wd-available-from"></input>

      <input type="date" id="wd-available-until"></input>

      <br />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
