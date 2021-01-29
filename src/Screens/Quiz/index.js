/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import QuizBackground from '../../Components/QuizBackground';
import QuizContainer from '../../Components/QuizContainer';
import QuizLogo from '../../Components/QuizLogo';
import Widget from '../../Components/Widget';
import GitHubCorner from '../../Components/GithubCorner';
import Button from '../../Components/Button';
import AlternativesForm from '../../Components/AlternativesForm';
import BackLinkArrow from '../../Components/BackLinkArrow';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultados:
      </Widget.Header>

      <Widget.Content>
        <p>
          Voce acertou
          {' '}
          { results.filter((x) => x).length }
          {' '}
          de
          {' '}
          {results.length}
          {' '}
          perguntas.
        </p>
        <ul>
          {results.map((question, index) => (
            <li key={`result__${question}${index + 1}`}>
              Questao
              {' '}
              {index + 1}
              :
              {' '}
              {question ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, 2000);
        }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === index;
            return (
              <Widget.Topic
                htmlFor={alternativeId}
                as="label"
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(index)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={selectedAlternative === undefined}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Voce acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Voce errou!</p>}
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.LOADING && <LoadingWidget /> }

        { screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        { screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/thiagocdn" />
    </QuizBackground>
  );
}
