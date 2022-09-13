import { useEffect } from "react"
import {
  GlobalStyle,
  AppContainer,
  MainContainer
} from "./AppStyles"

import { useUser } from "./hooks/useUser";
import Login from "./components/Login/Login";
import RoutesApp from "./RoutesApp";
import {
  getUsersStorage,
  getUserLogged
} from "./services/storage";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./hooks/useMovie";

function App() {
  const { updateUsers, userLogged, updateUserLogged } = useUser();

  useEffect(() => {
    const userIsLogged = getUserLogged()

    if (userIsLogged) updateUserLogged(userIsLogged)

    updateUsers(getUsersStorage())

  }, [])

  return (
    <AppContainer>
      <GlobalStyle />
      {!userLogged ?
        <Login />
        :
        <MovieProvider>
          <BrowserRouter>
            <MainContainer>
              <RoutesApp />
            </MainContainer>
          </BrowserRouter>
        </MovieProvider>
      }
    </AppContainer>
  )
}

export default App
