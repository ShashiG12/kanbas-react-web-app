import { FaAlignJustify } from "react-icons/fa6";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Assignments/Grades";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes,  useParams, useLocation  } from "react-router";
import PeopleTable from "./People/Table";
import Details from "./People/Details";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizViewer from "./Quizzes/QuizViewer";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}  &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/New-Assignment" element={<AssignmentEditor/>} />
            <Route path="Assignments/:id" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes/>} />
            <Route path="Quizzes/New-Quiz" element={<QuizEditor/>} />
            <Route path="Quizzes/:id" element={<QuizViewer/>} />
            <Route path="Quizzes/:id/edit" element={<QuizEditor />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
