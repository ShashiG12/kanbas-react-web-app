export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="images/teslabot.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS1234
                </a>
                <p className="wd-dashboard-course-title">Robotics</p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  {" "}
                  Go{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="images/swe.jpg" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS4500
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Software Engineering
                </p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  {" "}
                  Go{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="images/language.png" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS6120
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Natural Language Processing
                </p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  {" "}
                  Go{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="images/data-mining.png" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS6220
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Data Mining
                </p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  {" "}
                  Go{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="images/machine-learning.png" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS6140
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Machine Learning
                </p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  {" "}
                  Go{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="images/web-dev.png" />
              <div className="card-body">
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS5610
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Web Development
                </p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  {" "}
                  Go{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card">
              <img src="images/game.png" />
              <div>
                <a
                  className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home"
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  CS5540
                </a>
                <p className="wd-dashboard-course-title card-text">
                  Game Programming
                </p>
                <a
                  href="#/Kanbas/Courses/1234/Home"
                  className="btn btn-primary"
                >
                  {" "}
                  Go{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
