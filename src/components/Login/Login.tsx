import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import {
    LoginContainer,
    InvalidData,
    RowContainer
} from "./LoginStyle"

function Login() {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const { users, updateUserLogged } = useUser();

    const handleLoginSubmit = () => {
        const userFoundByEmail = users.find(user => user.email === emailInput)

        if (!userFoundByEmail) {
            setInvalidEmail(true)
            return
        }

        setInvalidEmail(false)

        if (userFoundByEmail.password !== passwordInput) {
            setInvalidPassword(true)
            return
        }

        setInvalidPassword(false)

        localStorage.setItem("userLogged", JSON.stringify(userFoundByEmail))
        updateUserLogged(userFoundByEmail)
    }

    return (
        <LoginContainer data-test-target="loginContainer">
            {invalidEmail ?
                <InvalidData>
                    <p>Sorry, we couldn't find an account with that email address. Try again.</p>
                </InvalidData>
                :
                <>
                    {invalidPassword &&
                        <InvalidData>
                            <p>Invalid password. Try again.</p>
                        </InvalidData>
                    }
                </>
            }

            <RowContainer>
                <input
                    data-test-target="inputEmail"
                    type="text"
                    placeholder="Email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                />
            </RowContainer>
            <RowContainer>
                <input
                    data-test-target="inputPassword"
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                />
            </RowContainer>
            <RowContainer>
                <button onClick={() => handleLoginSubmit()}>Login</button>
            </RowContainer>
        </LoginContainer>
    )
}

export default Login