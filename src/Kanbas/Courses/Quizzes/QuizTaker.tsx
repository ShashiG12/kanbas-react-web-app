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
      score:calculateScore(answers)
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

  const renderSubmission = (attempt: any, index: number) => {
    const shouldShowAnswers = quiz.showCorrectAnswers && maxAttemptsReached;
  
    return (
      <div key={index} className="submission mb-3 p-3 border rounded">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="col-2">Attempt {index + 1}</h3>
          <h2 className="text-success">
            Score: {attempt.score ? attempt.score : 0}/{quiz.points}
          </h2>
        </div>
        {attempt.answers.map((answer: any) => {
          const question = quiz.questions.find(
            (q: any) => q._id === answer.questionID
          );
          if (!question) return null;
  
          const isCorrect = question.type === "CHOICE"
            ? question.choices.find((choice: any) => choice.correct)?.text === answer.selectedAnswer
            : question.type === "TF"
            ? question.correctAnswer === answer.tfAnswer
            : question.blankAnswers.includes(answer.selectedAnswer);
  
          const points = isCorrect ? question.points : 0;
  
          return (
            <div key={question._id} className={`question-card mb-3 p-3 border rounded ${isCorrect ? 'border-success' : 'border-danger'}`}>
              <div className="d-flex justify-content-between align-items-center">
                <h4>{question.title}</h4>
                {shouldShowAnswers && (
                  <p className={isCorrect ? "text-success" : "text-danger"}>
                    {isCorrect ? `+${points} points` : `0 points`}
                  </p>
                )}
              </div>
              <p>{question.question}</p>
              {question.type === "CHOICE" && (
                <div>
                  <ul>
                    {question.choices.map((choice: any, choiceIndex: any) => (
                       <li
                       key={choiceIndex}
                       className={
                         shouldShowAnswers && choice.text === answer.selectedAnswer
                           ? choice.correct
                             ? "text-success"
                             : "text-danger"
                           : ""
                       }
                     >
                        {choice.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {question.type === "TF" && (
                <div>
                  <p><b>Answer:</b> {answer.tfAnswer ? "True" : "False"}</p>
                  {shouldShowAnswers && (
                    <p><b>Correct Answer:</b> {question.correctAnswer ? "True" : "False"}</p>
                  )}
                </div>
              )}
              {question.type === "BLANKS" && (
                <div>
                  <p><b>Answer:</b> {answer.selectedAnswer}</p>
                  {shouldShowAnswers && (
                    <p><b>Correct Answers:</b> {question.blankAnswers.join(", ")}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const userAttempts = getPastSubmissions();
  const maxAttemptsReached = currentUser.role !== "FACULTY" && (
    quiz.multipleAttempts
      ? userAttempts.length >= quiz.howManyAttempts
      : userAttempts.length >= 1
  );

  const calculateScore = (answers: any) => {
    let score = 0;
    quiz.questions.forEach((question: any) => {
      const answer = answers[question._id];
      if (question.type === "CHOICE") {
        const correctChoice = question.choices.find((choice: any) => choice.correct);
        if (answer === correctChoice.text) {
          score += question.points;
        }
      } else if (question.type === "TF" && answer === question.correctAnswer) {
        score += question.points;
      } else if (question.type === "BLANKS") {
        const providedAnswer = Array.isArray(answer) ? answer[0] : answer;
        if (question.blankAnswers.includes(providedAnswer)) {
          score += question.points;
        }
      }
    });
    return score;
  };

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
      {currentUser.role === "STUDENT" && <p>Attempt: {userAttempts.length}/{quiz.howManyAttempts}</p>}
      {!isTakingQuiz && !viewingSubmissions ? (
         <div className="text-center">
         {!maxAttemptsReached ? (
           <button className="btn btn-danger me-3" onClick={() => setIsTakingQuiz(true)}>
             Take Quiz
           </button>
         ) : (
           <p>You have reached the maximum number of attempts for this quiz.</p>
         )}
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
            {!maxAttemptsReached && (
                <button className="btn btn-danger me-3" onClick={() => setIsTakingQuiz(true)}>
                  Take Quiz
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setViewingSubmissions(false)}>
                Back
              </button>
          </div>
        </>
      )}
    </div>
  );
}
