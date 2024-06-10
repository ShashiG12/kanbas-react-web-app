const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
const module = {
    id: 2, name: "NodeJS Module",
    description: "Create a NodeJS module",
    course: "RS101"
}
export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
      });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.get("/lab5/assignment/completed/:completedBool", (req, res) => {
        const { completedBool } = req.params;
        assignment.completed = completedBool;
        res.json(assignment);
      });
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
      });
    app.get("/lab5/module", (req, res) => {
        res.json(module);
      });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
      });
  };  