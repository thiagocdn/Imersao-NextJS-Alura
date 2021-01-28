import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import db from '../db.json';
import Footer from '../src/Components/Footer';
import QuizBackground from '../src/Components/QuizBackground';
import QuizContainer from '../src/Components/QuizContainer';
import Widget from '../src/Components/Widget';
import GitHubCorner from '../src/Components/GithubCorner';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

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
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                placeholder="Diz ai seu nome..."
                onChange={(event) => setName(event.target.value)}
                name="nomeDoUsuario"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar
                {' '}
                {name}
              </Button>
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
