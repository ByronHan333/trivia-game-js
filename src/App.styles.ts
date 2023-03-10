import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/trivia-bg.jpeg';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Tahoma Inline;
    background-image: linear-gradient(180deg, #87f1ff, #87f1ff);
    font-weight: 500;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 100px;
    text-align: center;
    margin: 20px;
  }

  .instruction-card {
    border: 1px solid white;
    border-radius: 20px;
    background-color: #F5F5DC;
    width: 600px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }



  .start, .next {
    cursor: pointer;
    background-color: #F5F5DC
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 60px;
    margin: 20px 0;
    padding: 0 40px;
    font-size: 20px;
  }

  .start {
    max-width: 300px;
  }

  a {
    color: #fff;
    font-size: 20px;
    text-decoration: none;
  }
`;
