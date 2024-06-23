import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as db from "../Database";
import { useSelector } from "react-redux";
export default function Dashboard({
  courses,
  outsideCourse,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  outsideCourse: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const handleAddNewCourse = () => {
    const updatedCourse = {
      ...outsideCourse,
      faculty: [...outsideCourse.faculty, currentUser._id],
    };
    setCourse(updatedCourse);
    addNewCourse();
  };
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <hr />
          <br />
          <input
            value={outsideCourse.name}
            className="form-control mb-2"
            onChange={(e) =>
              setCourse({ ...outsideCourse, name: e.target.value })
            }
          />
          <textarea
            value={outsideCourse.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...outsideCourse, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses
        {currentUser.role === "STUDENT" && (
          <button
            className="btn btn-danger float-end me-2"
            onClick={() => navigate(`/Kanbas/Dashboard/Enroll`)}
          >
            Enroll
          </button>
        )}
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter(
              (course: any) =>
                (course.students || []).includes(currentUser._id) ||
                (course.faculty || []).includes(currentUser._id)
            )
            .map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="text-decoration-none"
                >
                  <div className="card rounded-3 overflow-hidden">
                    <img src={course.image} height="{160}" />
                    <div className="card-body">
                      <span
                        className="wd-dashboard-course-link"
                        style={{
                          textDecoration: "none",
                          color: "navy",
                          fontWeight: "bold",
                        }}
                      >
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text"
                        style={{ maxHeight: 53, overflow: "hidden" }}
                      >
                        {course.description}
                      </p>
                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      {currentUser.role === "FACULTY" && (
                        <>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>

                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
