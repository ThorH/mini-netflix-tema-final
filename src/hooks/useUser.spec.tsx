import { UserProvider, useUser } from '../hooks/useUser'
import { renderHook, act } from '@testing-library/react-hooks'
import { mockUser } from '../test/testMocks'

interface Props {
    children: React.ReactNode
}

const wrapper = ({ children }: Props) => <UserProvider>{children}</UserProvider>

describe('Movie hooks tests', () => {

    it('Should update users', () => {
        const { result } = renderHook(() => useUser(), { wrapper })

        act(() => {
            result.current.updateUsers([mockUser])
        })

        expect(result.current.users).toContain(mockUser)
    })

    it('Should update userLogged', () => {
        const { result } = renderHook(() => useUser(), { wrapper })

        act(() => {
            result.current.updateUserLogged(mockUser)
        })

        expect(result.current.userLogged).toEqual(mockUser)
    })
})