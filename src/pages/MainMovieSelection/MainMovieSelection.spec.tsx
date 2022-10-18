import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext, useUser } from "../../hooks/useUser";
import { mockUser } from "../../test/testMocks";
import MainMovieSelection from "./MainMovieSelection";
import { BrowserRouter } from "react-router-dom";

describe('MainMovieSelection component test', () => {

    const mockUserValue = {
        users: [mockUser],
        userLogged: mockUser,
        updateUsers: () => { },
        updateUserLogged: () => { }
    }

    const userLoggedSpy = jest.spyOn(mockUserValue, 'updateUserLogged')

    it('Should logout user', () => {
        render(
            <UserContext.Provider value={mockUserValue}>
                <BrowserRouter>
                    <MainMovieSelection />
                </BrowserRouter>
            </UserContext.Provider>
        )

        const logout = screen.getByText('Logout')

        fireEvent.click(logout)

        expect(userLoggedSpy).toBeCalledWith(undefined)
    })
})