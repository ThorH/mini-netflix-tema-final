import React, { createContext, useContext, useState } from "react";
import User from '../interfaces/User';

interface Props {
    children: React.ReactNode
}

interface UserContextType {
    users: User[],
    updateUsers: (users: User[]) => void,
    userLogged?: User
    updateUserLogged: (user?: User) => void
}

const initialValue: UserContextType = {
    users: [],
    updateUsers: () => { },
    updateUserLogged: () => { }
}

const UserContext = createContext<UserContextType>(initialValue);

export const UserProvider = ({ children }: Props) => {
    const [users, setUsers] = useState<User[]>([])
    const [userLogged, setUserLogged] = useState<User>()

    const updateUsers = (users: User[]) => {
        setUsers(users)
    }

    const updateUserLogged = (user?: User) => {
        setUserLogged(user)
    }

    return (
        <UserContext.Provider
            value={{
                users,
                updateUsers,
                userLogged,
                updateUserLogged
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)