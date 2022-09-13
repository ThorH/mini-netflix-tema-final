import styled from "styled-components";

export const MainMovieSelectionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #141414;
`;

export const UserLoggedContainer = styled.div`
    text-align: center;
    margin: 15px 15px 0 auto;

    a {
        border-radius: 50%;
        img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 50%;
        }
    } 
    
    
    p {
        width: 100%;
        margin-top: 5px;
        font-weight: 600;
        cursor: pointer;
    }
`;

export const LastWatchedMovies = styled.div`
    display: flex;
    flex-wrap: wrap;

    h4 {
        width: 100%;
    }
`;