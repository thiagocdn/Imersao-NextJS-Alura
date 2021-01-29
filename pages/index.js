import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import db from '../db.json';
import Footer from '../src/Components/Footer';
import QuizBackground from '../src/Components/QuizBackground';
import QuizContainer from '../src/Components/QuizContainer';
import Widget from '../src/Components/Widget';
import GitHubCorner from '../src/Components/GithubCorner';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';
import Link from '../src/Components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0 }}
        >
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
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Widget.Header>
            <h1>Demais Quizzes...</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>

              {db.external.map((externalLink) => {
                const [projectName, userName] = externalLink
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={externalLink}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${userName}`}
                    >
                      {`${projectName}/${userName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: 1 }}
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/thiagocdn" />
    </QuizBackground>
  );
}
