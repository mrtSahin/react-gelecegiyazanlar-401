import { Flex, Spinner } from "@chakra-ui/react";
import { useState, createContext, useEffect, useContext } from "react";
import { fetchMe } from "../api";


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false) // giris yapili mi degil mi
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe()
                setLoggedIn(true)
                setUser(me)
                setLoading(false)
                console.log('me', me)
            } catch (e) {
                
            }
        })()
    }, [])


    const login = (data) => {
        console.log(data)
        setLoggedIn(true)
        setUser(data)
        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token', data.refreshToken)
    }

    const values = {
        loggedIn,
        user,
        login
    }

    if (loading) {
        return (
            <Flex justifyContent='center' alignItems='center' height='100vh'>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size='xl' color="blue.500" />
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}

const useAuth = () => useContext(AuthContext)

export {
    AuthProvider,
    useAuth
}