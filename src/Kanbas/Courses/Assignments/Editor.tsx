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
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label>Text Entry</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label>Website URL</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label>Media Recordings</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label>Student Annotation</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label>File Uploads</label>
      <br />

      <br />
      <label>Assign Assign to</label>
      <br />
      <input defaultValue="Everyone"></input>
      <br />

      <label>Due</label>
      <br />
      <input type="date"></input>
      <br />

      <label>Available From</label>
      <label>Until  </label>
      <br />
      <input type="date"></input>

      <input type="date"></input>

      <br />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
