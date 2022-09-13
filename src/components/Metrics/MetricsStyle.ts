import styled from "styled-components";

export const MetricsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const MetricContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px;

    h3 {
        width: 100%;
        margin: 5px 0;
    }
`;

export const MoviesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 5px;
    width: 100%;
`;

export const MovieContainer = styled.div`
    width: 225px;
    margin: 4px;
    cursor: pointer;

    img {
        width: 100%;
        height: 125px;
        object-fit: cover;
    }

    p {
        text-align: center;
    }
`;

export const UsersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 5px;
    width: 100%;
`;

export const UserContainer = styled.div`
    width: 150px;
    margin: 10px;

    img {
        width: 100%;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
    }

    p {
        text-align: center;
    }
`;