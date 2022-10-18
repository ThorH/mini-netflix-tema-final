import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { UserContext } from '../../hooks/useUser';
import { mockUser } from '../../test/testMocks'

describe('Login component test', () => {

    const mockValue = {
        users: [mockUser],
        updateUsers: () => { },
        updateUserLogged: () => { }
    }

    beforeEach(() => {
        render(
            <UserContext.Provider value={mockValue}>
                <Login />
            </UserContext.Provider>
        )
    })

    it('Should get password invalid email error', () => {
        const inputEmail = screen.getByPlaceholderText('Email')
        const inputPassword = screen.getByPlaceholderText('Password')
        const button = screen.getByText('Login')

        fireEvent.change(inputEmail, { target: { value: 'haubertthorinvalid@gmail.com' } })
        fireEvent.change(inputPassword, { target: { value: 'senhadothor' } })
        fireEvent.click(button)

        const errorMessage = screen.getByText("Sorry, we couldn't find an account with that email address. Try again.")

        expect(errorMessage).toBeInTheDocument()
    })

    it('Should get password invalid message error', () => {
        const inputEmail = screen.getByPlaceholderText('Email')
        const inputPassword = screen.getByPlaceholderText('Password')
        const button = screen.getByText('Login')

        fireEvent.change(inputEmail, { target: { value: 'haubertthor@gmail.com' } })
        fireEvent.change(inputPassword, { target: { value: 'senhadothorinvalid' } })
        fireEvent.click(button)

        const errorMessage = screen.getByText("Invalid password. Try again.")

        expect(errorMessage).toBeInTheDocument()
    })

    it('Should login succeced', () => {
        const inputEmail = screen.getByPlaceholderText('Email')
        const inputPassword = screen.getByPlaceholderText('Password')
        const button = screen.getByText('Login')

        fireEvent.change(inputEmail, { target: { value: 'haubertthor@gmail.com' } })
        fireEvent.change(inputPassword, { target: { value: 'senhadothor' } })
        fireEvent.click(button)

        expect(screen.queryByText("Invalid password. Try again."))
            .toBeFalsy()

        expect(screen.queryByText("Sorry, we couldn't find an account with that email address. Try again."))
            .toBeFalsy()
    })
})