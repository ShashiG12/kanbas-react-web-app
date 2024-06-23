import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "./client";
import { addQuiz, updateQuiz } from "./reducer";
import { FaPlus } from "react-icons/fa";
import "./quiz.css";

export default function QuizDetailsEditor({
  quiz,
  setQuiz,
}: {
  quiz: any;
  setQuiz: (quiz: any) => void;
}) {
  const { cid, id } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const navigate = useNavigate();
  const existingQuiz = quizzes.find((quiz: any) => quiz._id === id);
  const dispatch = useDispatch();

  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const initialQuestion: {
    title: string;
    type: string;
    points: number;
    question: string;
    choices: { text: string; correct: boolean }[];
    correctAnswer: boolean;
    blankAnswers: string[];
  } = {
    title: "New Question",
    type: "CHOICE",
    points: 0,
    question: "",
    choices: [],
    correctAnswer: true,
    blankAnswers: [],
  };
  const [newQuestion, setNewQuestion] = useState(initialQuestion);
  const saveQuestion = () => {
    setShowAddQuestion(false);
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };
  const cancelQuestion = () => {
    setShowAddQuestion(false);
    setNewQuestion(initialQuestion);
  };
  const addAnswer = () => {
    setNewQuestion({
      ...newQuestion,
      choices: [...newQuestion.choices, { text: "", correct: false }],
    });
  };
  const addBlankAnswer = () => {
    setNewQuestion({
      ...newQuestion,
      blankAnswers: [...newQuestion.blankAnswers, ""],
    });
  };
  

  return (
    <div id="wd-quizzes-question-editor" className="container">
      {quiz.questions.map((question: any) => (
        <div className="container question-card">
          <h3>{question.title}</h3>
          <p>
            <b>Type: </b>
            {(() => {
              switch (question.type) {
                case "CHOICE":
                  return "Multiple Choice";
                case "TF":
                  return "True/False";
                case "BLANKS":
                  return "Fill in the Blanks";
                default:
                  return question.type;
              }
            })()}
          </p>
          <b>Question:</b>
          <p>{question.question}</p>
          {question.type === "CHOICE" && (
            <>
              <b>Answers:</b>
              <ul>
                {question.choices.map((choice: any, index: number) => (
                  <li
                    key={index}
                    style={{ color: choice.correct ? "green" : "black" }}
                  >
                    {choice.text}
                  </li>
                ))}
              </ul>
            </>
          )}
          {question.type === "TF" && (
            <>
              <b>Answers:</b>
              <ul>
                <li
                  style={{ color: question.correctAnswer ? "green" : "black" }}
                >
                  True
                </li>
                <li
                  style={{ color: !question.correctAnswer ? "green" : "black" }}
                >
                  False
                </li>
              </ul>
            </>
          )}
          {question.type === "BLANKS" && (
            <>
              <b>Possible Answers:</b>
              <ul>
                {question.blankAnswers.map((possibleAnswer: any) => (
                  <li>{possibleAnswer}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
      <div className="row mb-3 justify-content-center">
        {showAddQuestion && (
          <div className="container question-card">
            <div className="d-flex">
              <input
                className="form-control me-2"
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, title: e.target.value })
                }
              />
              <select
                className="form-control me-2"
                value={newQuestion.type}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, type: e.target.value })
                }
              >
                <option value="CHOICE">Multiple Choice</option>
                <option value="TF">True/False</option>
                <option value="BLANKS">Fill in the Blanks</option>
              </select>
              <label>pts:</label>
              <input
                className="form-control"
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    points: Number(e.target.value),
                  })
                }
              ></input>
            </div>
            <div className="d-flex">
              <label>Question:</label>
              <textarea
                className="form-control"
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
              >
                {newQuestion.question}
              </textarea>
            </div>
            {newQuestion.type === "CHOICE" && (
              <>
                <div className="d-flex">
                  <button className="btn btn-secondary" onClick={addAnswer}>
                    <FaPlus />
                    Add Answer
                  </button>
                </div>
                {newQuestion.choices.map((choice: any, index) => (
                  <div className="d-flex">
                    Possible Answer:
                    <input
                      className="form-control"
                      value={choice.text}
                      onChange={(e) =>
                        setNewQuestion((prevQuestion) => ({
                          ...prevQuestion,
                          choices: prevQuestion.choices.map((prevChoice, idx) =>
                            idx === index
                              ? { ...prevChoice, text: e.target.value }
                              : prevChoice
                          ),
                        }))
                      }
                    />
                    <label>
                      Correct Answer:
                      <input
                        type="checkbox"
                        checked={choice.correct}
                        onChange={(e) =>
                          setNewQuestion((prevQuestion) => ({
                            ...prevQuestion,
                            choices: prevQuestion.choices.map(
                              (prevChoice, idx) =>
                                idx === index
                                  ? { ...prevChoice, correct: e.target.checked }
                                  : { ...prevChoice, correct: false }
                            ),
                          }))
                        }
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
            {newQuestion.type === "TF" && (
              <div className="d-flex">
                <div className="d-flex">
                  Correct Answer:
                  <select
                    className="form-control me-2"
                    value={String(newQuestion.correctAnswer)}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        correctAnswer: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
            )}
            {newQuestion.type === "BLANKS" && (
              <div>
                <div className="d-flex">
                  <button
                    className="btn btn-secondary"
                    onClick={addBlankAnswer}
                  >
                    <FaPlus />
                    Add Answer
                  </button>
                </div>
                {newQuestion.blankAnswers.map(
                  (answer: string, index: number) => (
                    <div key={index}>
                      Possible Answer:
                      <input
                        className="form-control"
                        value={answer}
                        onChange={(e) =>
                          setNewQuestion((prevQuestion) => ({
                            ...prevQuestion,
                            blankAnswers: prevQuestion.blankAnswers.map(
                              (prevAnswer, idx) =>
                                idx === index ? e.target.value : prevAnswer
                            ),
                          }))
                        }
                      />
                    </div>
                  )
                )}
              </div>
            )}
            <div className="d-flex">
              <button
                className="btn btn-secondary me-2"
                onClick={cancelQuestion}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={saveQuestion}>
                Save
              </button>
            </div>
          </div>
        )}
        <div className="col-6 text-center">
          <button
            className="btn btn-secondary me-5"
            onClick={() => setShowAddQuestion(true)}
          >
            <FaPlus />
            New Question
          </button>
        </div>
      </div>
    </div>
  );
}
