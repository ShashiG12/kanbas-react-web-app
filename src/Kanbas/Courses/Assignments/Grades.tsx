import { FaFileImport } from "react-icons/fa";
import { BiSolidFileImport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiSearch, CiFilter } from "react-icons/ci";

export default function Grades() {
    return (
        <div id="wd-grades" className="container">
            <div className="row justify-content-end">
                <button className="btn btn-lg btn-secondary me-1 col-2">
                    <FaFileImport className="me-2" />
                    Import
                </button>
                <button className="btn btn-lg btn-secondary me-1 col-2">
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
                            <th scope="col">A1 Setup</th>
                            <th scope="col">A2 HTML</th>
                            <th scope="col">A3 CSS</th>
                            <th scope="col">A4 Bootstrap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="text-danger">Shashi Gollamudi</th>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-danger">John Smith</th>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-danger">Jane Doe</th>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                            <td>
                                <input type="text" className="form-control" defaultValue="100%" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
