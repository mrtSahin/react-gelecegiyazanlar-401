import { Flex, Spinner } from "@chakra-ui/react";
import { useState, createContext, useEffect, useContext } from "react";
import { fetchLogout, fetchMe } from "../api";


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false) // giris yapili mi degil mi
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe() // kullanıcı bilgileri kritik olmayan bilgiler haricinde api den soruluyor ve serUser ile user verisine ekleniyor
                setUser(me)
                setLoggedIn(true)
                setLoading(false)
                console.log('me', me)
            } catch (e) {
                setLoading(false)
            }
        })()
    }, [])


    const login = (data) => {
        console.log(data)
        setLoggedIn(true)
        setUser(data)
        localStorage.setItem('access-token', data.accessToken) // kullanıcı sisteme giriş yaptıktan sonra bu bilgileri her seferinde apiden çekmek yerine localstorage a kaydediyoruz ve lazım olduğunda oradan alıyoruz
        localStorage.setItem('refresh-token', data.refreshToken)
    }

    const logout = async (callback) => {
        setLoggedIn(false)
        setUser(null)
        const response = await fetchLogout()
        localStorage.removeItem("refresh-token") // artık sistemde bir kullanıcı olmadığı için localstorage dan bu bilgiler siliniyor
        localStorage.removeItem("access-token")
        console.log(response)
        callback() // yönlendirme işleminin yapıldığı callback metod
    }

    const values = {
        loggedIn,
        user,
        login,
        logout
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