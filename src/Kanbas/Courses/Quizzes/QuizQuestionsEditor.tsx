import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "./client";
import { addQuiz, updateQuiz } from "./reducer";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./quiz.css";
import { FaPencil } from "react-icons/fa6";

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

    if (editQuestionIndex !== -1) {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[editQuestionIndex] = newQuestion;
      setQuiz({ ...quiz, questions: updatedQuestions});
    } else {
      setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion]});
    }

    setNewQuestion(initialQuestion);
    setEditMode(false);
    setEditQuestionIndex(-1);
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
  const removeAnswer = (index: number) => {
    setNewQuestion({
      ...newQuestion,
      choices: newQuestion.choices.filter((choice, idx) => idx !== index),
    });
  };

  const removeBlankAnswer = (index: number) => {
    setNewQuestion({
      ...newQuestion,
      blankAnswers: newQuestion.blankAnswers.filter((answer, idx) => idx !== index),
    });
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };
  const [editMode, setEditMode] = useState(false);
  const [editQuestionIndex, setEditQuestionIndex] = useState(-1);

  const toggleEditMode = (index: number) => {
    setEditMode(true);
    setEditQuestionIndex(index);
    setNewQuestion(quiz.questions[index]);
  };

  useEffect(() => {
    const totalQuizPoints = quiz.questions.reduce(
      (total: number, question: any) => total + question.points,
      0
    );
    setQuiz((prevQuiz: any) => ({ ...prevQuiz, points: totalQuizPoints }));
  }, [quiz.questions, setQuiz]);

  const totalQuizPoints = quiz.questions.reduce((total:any, question:any) => total + question.points, 0);

  return (
    <div id="wd-quizzes-question-editor" className="container">
      <h3>Total points: {totalQuizPoints}</h3>
      {quiz.questions.map((question: any, index: any) => (
        <div className="container question-card" key={index}>
          <div className="d-flex justify-content-end">
            <button
            className="btn btn-warning me-3"
            onClick={() => toggleEditMode(index)}
            >
              <FaPencil/> Edit</button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeQuestion(index)}
            >
              <FaTrash /> Remove
            </button>
          </div>
          {(editMode && editQuestionIndex === index) ? (
            <div>
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  value={newQuestion.title}
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
                  value={newQuestion.points}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      points: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="d-flex">
                <label>Question:</label>
                <textarea
                  className="form-control"
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                  value={newQuestion.question}
                />
              </div>
              {newQuestion.type === "CHOICE" && (
                <>
                  <div className="d-flex">
                    <button className="btn btn-secondary" onClick={addAnswer}>
                      <FaPlus /> Add Answer
                    </button>
                  </div>
                  {newQuestion.choices.map((choice: any, idx: number) => (
                    <div className="d-flex" key={idx}>
                      Possible Answer:
                      <input
                        className="form-control"
                        value={choice.text}
                        onChange={(e) =>
                          setNewQuestion((prevQuestion) => ({
                            ...prevQuestion,
                            choices: prevQuestion.choices.map((prevChoice, i) =>
                              i === idx
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
                                (prevChoice, i) =>
                                  i === idx
                                    ? {
                                        ...prevChoice,
                                        correct: e.target.checked,
                                      }
                                    : prevChoice
                              ),
                            }))
                          }
                        />
                      </label>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => removeAnswer(idx)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </>
              )}
              {newQuestion.type === "TF" && (
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
              )}
              {newQuestion.type === "BLANKS" && (
                <div>
                  <div className="d-flex">
                    <button
                      className="btn btn-secondary"
                      onClick={addBlankAnswer}
                    >
                      <FaPlus /> Add Answer
                    </button>
                  </div>
                  {newQuestion.blankAnswers.map(
                    (answer: string, idx: number) => (
                      <div key={idx}>
                        Possible Answer:
                        <input
                          className="form-control"
                          value={answer}
                          onChange={(e) =>
                            setNewQuestion((prevQuestion) => ({
                              ...prevQuestion,
                              blankAnswers: prevQuestion.blankAnswers.map(
                                (prevAnswer, i) =>
                                  i === idx ? e.target.value : prevAnswer
                              ),
                            }))
                          }
                        />
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => removeBlankAnswer(idx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
              <div className="d-flex">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {setEditMode(false);setEditQuestionIndex(-1);setNewQuestion(initialQuestion);}}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={saveQuestion}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
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
            
              <p><b>Points:</b>{question.points}</p>
              <b>Question:</b>
              <p>{question.question}</p>
              {question.type === "CHOICE" && (
                <>
                  <b>Answers:</b>
                  <ul>
                    {question.choices.map((choice: any, idx: number) => (
                      <li
                        key={idx}
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
                      style={{
                        color: question.correctAnswer ? "green" : "black",
                      }}
                    >
                      True
                    </li>
                    <li
                      style={{
                        color: !question.correctAnswer ? "green" : "black",
                      }}
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
                    {question.blankAnswers.map(
                      (possibleAnswer: any, idx: number) => (
                        <li key={idx}>{possibleAnswer}</li>
                      )
                    )}
                  </ul>
                </>
              )}
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
                    <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => removeAnswer(index)}
                      >
                        <FaTrash />
                      </button>
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
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => removeBlankAnswer(index)}
                        >
                          <FaTrash />
                        </button>
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
