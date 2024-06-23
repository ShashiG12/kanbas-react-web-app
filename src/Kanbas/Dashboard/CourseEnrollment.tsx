import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "../Courses/client";
import './CourseEnrollment.css';

export default function CourseEnrollment({ courses, setCourses }: { courses: any[]; setCourses: (courses: any) => void }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

  const enrollInCourse = async (course: any) => {
    const updatedCourse = await client.updateCourse({ ...course, students: [...course.students, currentUser._id] });
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return { ...c, students: [...(c.students || []), currentUser._id] };
        } else {
          return c;
        }
      })
    );
  };

  const unenrollFromCourse = async (course: any) => {
    const updatedCourse = await client.updateCourse({
      ...course,
      students: course.students.filter((id: string) => id !== currentUser._id),
    });
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return {
            ...c,
            students: (c.students || []).filter((id: string) => id !== currentUser._id),
          };
        } else {
          return c;
        }
      })
    );
  };

  const toggleReadMore = (courseId: string) => {
    setExpandedCourses(prev => {
      const newExpandedCourses = new Set(prev);
      if (newExpandedCourses.has(courseId)) {
        newExpandedCourses.delete(courseId);
      } else {
        newExpandedCourses.add(courseId);
      }
      return newExpandedCourses;
    });
  };

  return (
    <div className="course-enrollment-container">
      {courses.map((course: any) => (
        <div key={course._id} className="course-card">
          <h3 className="course-title">{course.name}</h3>
          <p className="course-description">
            {expandedCourses.has(course._id) ? course.description : `${course.description.slice(0, 100)}...`}
            <span className="read-more" onClick={() => toggleReadMore(course._id)}>
              {expandedCourses.has(course._id) ? 'Read Less' : 'Read More'}
            </span>
          </p>
          {(course.students || []).includes(currentUser._id) ? (
            <>
              <p className="enrollment-status">You are already enrolled in this course.</p>
              <button onClick={() => unenrollFromCourse(course)} className="btn btn-danger me-2">Unenroll</button>
            </>
          ) : (
            <button onClick={() => enrollInCourse(course)} className="btn btn-primary me-2">Enroll</button>
          )}
        </div>
      ))}
    </div>
  );
}
