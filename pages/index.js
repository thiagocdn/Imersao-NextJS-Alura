import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import Footer from '../Components/Footer';
import QuizBackground from '../Components/QuizBackground';
import Widget from '../Components/Widget';
import GitHubCorner from '../Components/GithubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('a');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit="">
              <input
                placeholder="Diz ai seu nome..."
                onChange={event => setName(event.target.value)}
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar
                {' '}
                {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Demais Quizzes...</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum blablabla...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/thiagocdn" />
    </QuizBackground>
  );
}
