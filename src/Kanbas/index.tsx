import Dashboard from "./Dashboard";
import CourseEnrollment from "./Dashboard/CourseEnrollment"
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import * as client from "./Courses/client";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoutes";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const [course, setCourse] = useState<any>({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    image:"images/NEU.png",
    faculty: []
  });
  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([
      ...courses,
      { ...course, _id: newCourse._id, image:"images/NEU.png"},
    ]);
  };
  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter(
      (c) => c._id !== courseId));
  };
  const updateCourse = async () => {
    console.log(course)
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  return (
    <Provider store={store}>
      <div id="wd-kanbas" className="h-100">
        <div className="d-flex h-100">
          <div className="d-none d-md-block bg-black">
            <KanbasNavigation />
          </div>
          <div className="flex-fill p-4">
            <Routes>
              <Route path="/Account/*" element={<Account />} />
              <Route path="/" element={<ProtectedRoute><Navigate to="Dashboard" /></ProtectedRoute>} />
              <Route
                path="Dashboard"
                element={
                  <ProtectedRoute><Dashboard
                    courses={courses}
                    outsideCourse={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  /></ProtectedRoute>
                }
              />
              <Route path="Dashboard/Enroll" element={<ProtectedRoute><CourseEnrollment courses = {courses} setCourses={setCourses}/></ProtectedRoute>}/>
              <Route
                path="Courses/:cid/*"
                element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>}
              />
              <Route path="Calendar" element={<h1>Calendar</h1>} />
              <Route path="Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Provider>
  );
}
