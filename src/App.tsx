import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// types
import { QuestionsState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const arr = ['Easy', 'Medium', 'Hard']

  const handleDifficulty = () => {
    setDifficulty(currentDifficulty => (currentDifficulty+1)%3)
  }

  const startTrivia = async (input: number) => {
    setLoading(true);
    setGameOver(false);
    let diff;
    if (input === 0) {
      diff = Difficulty.EASY
    } else if (input === 1) {
      diff = Difficulty.MEDIUM
    } else {
      diff = Difficulty.HARD
    }
    console.log(diff)
    console.log(arr[input])
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      diff
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  const Instruction = () => {
    return (
      <div className='instruction-card'>
        <h3>There are total of 10 questions.</h3>
        <h3>Read the Question.</h3>
        <h3>Then select a correct answer from the four choices.</h3>
        <h3>You gain 1 point for a correct answer.</h3>
        <h3>You will not lose any points for a wrong answer.</h3>
        <h3>Set Difficulty button will set difficulty of the questions.</h3>
        <h3>Click Start to play.</h3>
      </div>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Trivia</h1>
        <a href="https://www.linkedin.com/in/ziyuan-byron-han/">Visit my LinkedIn</a>
        <a href="https://www.linkedin.com/in/ziyuan-byron-han/">Visit my GitHub</a>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <button className='start' onClick={handleDifficulty}>
            Difficulty: {arr[difficulty]}
            </button>
            <button className='start' onClick={()=>startTrivia(difficulty)}>
              Start
            </button>
            <Instruction />
          </>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
