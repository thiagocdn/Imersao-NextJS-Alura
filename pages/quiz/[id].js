import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/Screens/Quiz';

export default function QuizesPage({ dbExternal }) {
  return (
    <ThemeProvider theme={dbExternal.theme}>
      <QuizScreen
        externalQuestions={dbExternal.questions}
        externalBg={dbExternal.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, userName] = context.query.id.split('___');
  const dbExternal = await fetch(`https://${projectName}.${userName}.vercel.app/api/db`)
    .then((serverResponse) => {
      if (serverResponse.ok) {
        return serverResponse.json();
      }
      throw new Error('Falha em capturar os dados.');
    })
    .then((objectResponse) => (objectResponse))
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      dbExternal,
    },
  };
}
