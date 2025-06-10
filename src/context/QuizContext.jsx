import React, { createContext, useReducer, useEffect } from 'react';
import { fetchQuizQuestions } from '../api/triviaAPI';

const QuizContext = createContext();

const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correct_answer
            ? state.points + 10 // Arbitrary points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return { ...state, status: 'finished' };
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    case 'setQuestions':
        return {
            ...state,
            questions: action.payload,
            status: 'ready'
        }
    default:
      throw new Error('Action unknown');
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = numQuestions * 10;

  // Initial fetch for default questions, or can be triggered by Home settings
  useEffect(() => {
    fetchQuizQuestions(10, '', 'medium') // Default settings
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };