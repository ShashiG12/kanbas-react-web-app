import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import "./index.css";
export default function CoursesNavigation() {
   const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
   const { cid } = useParams();
   const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
         <div className={`nav-link ${pathname.includes(link) ? "active" : ""}`}>
          <Link to={`/Kanbas/Courses/${cid}/${link}`} className="list-group-item text-danger border border-0">
            {link}
          </Link>
         </div>
      ))}
    </div>
  );
}
