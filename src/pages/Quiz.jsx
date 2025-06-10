import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Question from '../components/Question';
import Progress from '../components/Progress';
import Footer from '../components/Footer';
import Timer from '../components/Timer';

function Quiz() {
  const { status, dispatch } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    // Start the quiz timer when the component mounts and status is not 'active'
    if (status !== 'active') {
      dispatch({ type: 'start' });
    }
  }, [dispatch, status]);

  // Navigate to score page when quiz is finished
  useEffect(() => {
    if (status === 'finished') {
      navigate('/score');
    }
  }, [status, navigate]);

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'active' && (
        <>
          <Progress />
          <Question />
          <Footer>
            <Timer />
          </Footer>
        </>
      )}
    </>
  );
}

export default Quiz;