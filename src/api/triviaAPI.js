import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuizQuestions = async (amount, category, difficulty) => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        amount,
        category,
        difficulty,
        type: 'multiple', // We'll stick to multiple choice for simplicity
      },
    });
    // The API returns HTML-encoded strings, so we need to decode them
    return data.results.map((question) => ({
      ...question,
      question: decodeHTMLEntities(question.question),
      correct_answer: decodeHTMLEntities(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(decodeHTMLEntities),
    }));
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw new Error("Could not fetch quiz questions.");
  }
};

// Helper function to decode HTML entities like "
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get('https://opentdb.com/api_category.php');
    return data.trivia_categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Could not fetch categories.");
  }
};