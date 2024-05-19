import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

export default function AssignmentOuterControls() {
    return (
        <div className="float-end">
            <div className="input-group input-group-sm mb-3 col form-outline">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-white border-right-0" id="inputGroup-sizing-sm">
                        <CiSearch />
                    </span>
                </div>
                <input type="text" className="form-control border-left-0" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." />
            </div>
            <button className="btn btn-secondary me-2">
                <FaPlus />
                Group
            </button>
            <button className="btn btn-danger me-2">
                <FaPlus />
                Assignment
            </button>
        </div>
    );
}