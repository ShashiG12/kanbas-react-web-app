import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as client from "./client";
import "./quiz.css";
import { updateQuiz } from "./reducer";
import { RiErrorWarningLine } from "react-icons/ri";

export default function QuizTaker() {
  const { cid, id } = useParams();
  const [answers, setAnswers] = useState({});
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [viewingSubmissions, setViewingSubmissions] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz : any) => quiz._id === id);

  const saveQuiz = async (newQuiz:any) => {
    const status = await client.updateQuiz(newQuiz);
    dispatch(updateQuiz(newQuiz));
  };

  const handleChange = (questionId: any, value: any) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmitQuiz = async () => {
    const newAttempt = {
      answers: Object.entries(answers).map(([questionID, answer]) => ({
        questionID,
        tfAnswer: typeof answer === "boolean" ? answer : undefined,
        selectedAnswer: typeof answer === "string" ? answer : undefined,
      })),
    };
  
    let updatedUserAttempts = quiz.userAttempts ? [...quiz.userAttempts] : [];
    const userIndex = updatedUserAttempts.findIndex(
      (userAttempt) => userAttempt.userID === currentUser._id
    );
  
    if (userIndex !== -1) {
      updatedUserAttempts[userIndex] = {
        ...updatedUserAttempts[userIndex],
        attempts: [...updatedUserAttempts[userIndex].attempts, newAttempt],
      };
    } else {
      updatedUserAttempts.push({
        userID: currentUser._id,
        attempts: [newAttempt],
      });
    }
  
    saveQuiz({ ...quiz, userAttempts: updatedUserAttempts });
    setIsTakingQuiz(false);
  };

  const getPastSubmissions = () => {
    const userAttempts = quiz.userAttempts || [];
    const user = userAttempts.find(
      (userAttempt:any) => userAttempt.userID === currentUser._id
    );
    return user ? user.attempts : [];
  };

  const renderSubmission = (attempt: any, index: number) => (
    <div key={index} className="submission">
      <h3>Attempt {index + 1}</h3>
      {attempt.answers.map((answer: any) => {
        const question = quiz.questions.find(
          (q: any) => q._id === answer.questionID
        );
        if (!question) return null;
        return (
          <div key={question._id} className="question-card">
            <h4>{question.title}</h4>
            <p>{question.question}</p>
            {question.type === "CHOICE" && (
              <div>
                <p><b>Selected Answer:</b> {answer.selectedAnswer}</p>
                {quiz.showCorrectAnswers && (
                  <p><b>Correct Answer:</b> {question.correctAnswer}</p>
                )}
              </div>
            )}
            {question.type === "TF" && (
              <div>
                <p><b>True/False Answer:</b> {answer.tfAnswer ? "True" : "False"}</p>
                {quiz.showCorrectAnswers && (
                  <p><b>Correct Answer:</b> {question.correctAnswer ? "True" : "False"}</p>
                )}
              </div>
            )}
            {question.type === "BLANKS" && (
              <div>
                <p><b>Answer:</b> {answer.selectedAnswer}</p>
                {quiz.showCorrectAnswers && (
                  <p><b>Correct Answer:</b> {question.correctAnswer}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div id="quiz-taker" className="container">
        {currentUser.role === "FACULTY" && (
            <div className="alert alert-danger">
                <RiErrorWarningLine />
                This is a preview!
            </div>
        )}
      <h1>{quiz.title}</h1>
      <h2>{quiz.instructions}</h2>
      {!isTakingQuiz && !viewingSubmissions ? (
        <div className="text-center">
          <button className="btn btn-danger me-3" onClick={() => setIsTakingQuiz(true)}>
            Take Quiz
          </button>
          <button className="btn btn-secondary" onClick={() => setViewingSubmissions(true)}>
            View Past Submissions
          </button>
        </div>
      ) : isTakingQuiz ? (
        <>
          <h2>{quiz.title}</h2>
          {quiz.questions.map((question: any, index: any) => (
            <div key={question._id} className="question-card">
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
                <ul>
                  {question.choices.map((choice: any, choiceIndex: any) => (
                    <li key={choiceIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={choice.text}
                          onChange={() => handleChange(question._id, choice.text)}
                        />
                        {choice.text}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              {question.type === "TF" && (
                <ul>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="true"
                        onChange={() => handleChange(question._id, true)}
                      />
                      True
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="false"
                        onChange={() => handleChange(question._id, false)}
                      />
                      False
                    </label>
                  </li>
                </ul>
              )}
              {question.type === "BLANKS" && (
                <input
                  type="text"
                  onChange={(e) => handleChange(question._id, e.target.value)}
                />
              )}
            </div>
          ))}
          <div className="row mb-3 justify-content-center">
            <div className="col-6 text-center">
              <button className="btn btn-secondary me-5" onClick={handleSubmitQuiz}>
                Submit Quiz
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Past Submissions</h2>
          {getPastSubmissions().map((attempt:any, index:any) => renderSubmission(attempt, index))}
          <div className="text-center mt-3">
            <button className="btn btn-danger me-3" onClick={() => setIsTakingQuiz(true)}>
              Take Quiz
            </button>
            <button className="btn btn-secondary" onClick={() => setViewingSubmissions(false)}>
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
}
