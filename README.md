# Tema Final - Mini Netflix

This project was bootstrapped with [Vitejs](https://vitejs.dev/).


## Installing dependencies and running project

Run `yarn install` to install dependencies and `yarn dev` to start the project.
Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

Run `yarn test:cypress` to run E2E tests and `yarn test` to run unit tests.

## Project description

This project its a kind of mini netflix. The data is mocked in json files, stored on localstorage and context api that wraps the application components. The data stored in localstorage is updated as the user interacts with the application and saved. To use the application it is necessary to login, for that you can use any email and password of a user mocked in the json file.

## Project components
The application has 3 routes, which are the components in the pages folder, but to have access it is necessary to login, and this is the function of the login component. When logged into a user profile, you have access to the MainMovieSelection component which is the home page that wraps the metrics component, and access the profile page clicking on the profile picture. The metrics component is where you have all the metrics like top users, movies, categories, and access the play movie page clicking on the movie. 
The components are inside the context api providers, which use the useMovie and useUser hooks that provide the data between the components.


## Project dependencies

- vite
- typescript
- react-router-dom
- react-icons
- uuid
- styled-components
- testing-library
- cypress

<div align="center">
    <p><strong>Login</strong></p>
    <img width="500" src="readme/gifs/login.gif">
</div>
<br>
<div align="center">
    <p><strong>Play movie and update metrics</strong></p>
    <img width="500" src="readme/gifs/playmovie.gif">
</div>