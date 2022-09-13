import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 250px;
    background-color: #000000d4;
    padding: 40px 0;
    text-align: center;
`;

export const InvalidData = styled.div`
    display: flex;

    p {
        max-width: 300px;
        word-wrap: break-word;
        color: #e50914;
    }
`;

export const RowContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px 0;

    input {
        width: 80%;
        padding: 15px 10px;
        background-color: #333;
        border-radius: 4px;
        font-size: 16px;
        color: #ffffff;
    }

    button {
        width: 80%;
        padding: 15px 0;
        background-color: #e50914;
        font-size: 18px;
        font-weight: 600;
        border-radius: 4px;
        margin-top: 20px;
        color: #ffffff;
    }
`;