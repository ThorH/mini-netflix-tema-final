import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        border: 0;
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    }

    body {
        background-image: url("/images/movieswallpaper.jpg");
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input {
        outline: none;
    }
`;

export const AppContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    color: #ffffff;
`;


export const MainContainer = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 100%;
`;

export const BackToHomeContainer = styled.div`
    display: flex;
    width: 100%;
`;