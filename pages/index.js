import styled from 'styled-components'
import db from '../db.json';
import Footer from '../Components/Footer';
import GithubCorner from '../Components/GithubCorner';
import QuizBackground from '../Components/QuizBackground';
import QuizLogo from '../Components/QuizLogo';
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
  return (
    <QuizBackground backgroundImage={db.bg} >
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum blablabla...</p> 
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
      <GitHubCorner projectUrl="https://github.com/thiagocdn"/>
    </QuizBackground>
  );
}
