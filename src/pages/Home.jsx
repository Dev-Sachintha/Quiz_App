import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { fetchCategories, fetchQuizQuestions } from '../api/triviaAPI';
import Loader from '../components/Loader';

function Home() {
  const { dispatch } = useQuiz();
  const navigate = useNavigate();

  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCategories();
  }, []);

  async function handleStartQuiz() {
    setIsLoading(true);
    try {
      const questions = await fetchQuizQuestions(numQuestions, category, difficulty);
      dispatch({ type: 'setQuestions', payload: questions });
      navigate('/quiz');
    } catch (error) {
      dispatch({ type: 'dataFailed' });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading && categories.length === 0) return <Loader />;

  return (
    <div className="home">
      <h2>Welcome to the general Quiz!</h2>
      <p>Test your knowledge by configuring your quiz below.</p>
      
      <div className="settings">
        <div className="settings-item">
          <label htmlFor="numQuestions">Number of Questions:</label>
          <input
            id="numQuestions"
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            min="5"
            max="20"
          />
        </div>
        <div className="settings-item">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Any Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="settings-item">
          <label htmlFor="difficulty">Difficulty:</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <button className="btn" onClick={handleStartQuiz} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Start Quiz'}
      </button>
    </div>
  );
}

export default Home;