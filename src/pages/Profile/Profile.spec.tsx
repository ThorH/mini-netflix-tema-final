import { render, screen } from "@testing-library/react";
import { UserContext } from "../../hooks/useUser";
import { mockUserLogged } from "../../test/testMocks";
import { BrowserRouter } from "react-router-dom";
import Profile from "../Profile/Profile";

describe('Profile page component test', () => {

    const mockUserValue = {
        users: [mockUserLogged],
        userLogged: mockUserLogged,
        updateUsers: () => { },
        updateUserLogged: () => { }
    }

    it('Should render userlogged profile', () => {
        render(
            <UserContext.Provider value={mockUserValue}>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </UserContext.Provider>
        )

        expect(screen.getByRole('img')).toBeTruthy()
        expect(screen.getByText('Thor Haubert')).toBeTruthy()
        expect(screen.getByText('Email: haubertthor@gmail.com')).toBeTruthy()
        expect(screen.getByText('Country: Brazil')).toBeTruthy()
    })
})