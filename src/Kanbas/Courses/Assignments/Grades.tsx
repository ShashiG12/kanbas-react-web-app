import { FaFileImport } from "react-icons/fa";
import { BiSolidFileImport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiSearch, CiFilter } from "react-icons/ci";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Grades() {
    const { cid } = useParams();
    const users = db.users;
    const enrollments = db.enrollments;
    const grades = db.grades;
    const assignments = db.assignments;

    const enrolledUsers = enrollments
        .filter(enrollment => enrollment.course === cid)
        .map(enrollment => {
            return users.find(user => user._id === enrollment.user);
    });


    return (
        <div id="wd-grades" className="container">
            <div className="row justify-content-end">
                <button className="btn btn-lg btn-secondary me-1 col-2">
                    <FaFileImport className="me-2" />
                    Import
                </button>
                <button className="btn btn-lg btn-secondary dropdown-toggle me-1 col-2">
                    <BiSolidFileImport className="me-2" />
                    Export
                </button>
                <button className="btn btn-lg btn-secondary me-1 col-1">
                    <IoSettingsOutline className="me-2" />
                </button>
            </div>
            <div className="row">
                <div className="col">
                    <label>Student Names</label>
                    <br />
                    <div className="input-group input-group-sm mb-3 col form-outline">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-right-0" id="inputGroup-sizing-sm">
                                <CiSearch />
                            </span>
                        </div>
                        <input type="text" className="form-control border-left-0" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search for Students" />
                    </div>
                </div>
                <div className="col">
                    <label>Assignment Names</label>
                    <br />
                    <div className="input-group input-group-sm mb-3 col form-outline">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-right-0" id="inputGroup-sizing-sm">
                                <CiSearch />
                            </span>
                        </div>
                        <input type="text" className="form-control border-left-0" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search Assignments" />
                    </div>
                </div>
            </div>
            <div className="row">
                <button className="btn btn-lg btn-secondary me-1 col-2">
                    <CiFilter className="me-2" />
                    Apply Filters
                </button>
            </div>
            <br />
            <div className="row">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Student Name</th>
                            {assignments
                                .filter((assignment: any) => assignment.course === cid)
                                .map((assignment: any) => (
                                    <th scope="col">{assignment.title}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                    {enrolledUsers.map((user: any) => (
                        <tr key={user._id}>
                            <th scope="row" className="text-danger">{user.firstName} {user.lastName}</th>
                            {assignments
                                .filter((assignment: any) => assignment.course === cid)
                                .map((assignment) => {
                                    const grade = grades.find((grade) => grade.student === user._id && grade.assignment === assignment._id);
                                    return (
                                        <td key={assignment._id}>
                                            {grade ? `${grade.grade}` : 'N/A'}
                                        </td>
                                    );
                                })
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
