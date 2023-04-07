import { Flex, Spinner } from "@chakra-ui/react";
import { useState, createContext, useEffect, useContext } from "react";
import { fetchLogout, fetchMe } from "../api";


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false) // giris yapili mi degil mi
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe() // kullanıcı bilgileri kritik olmayan bilgiler haricinde api den soruluyor ve serUser ile user verisine ekleniyor
                //console.log('auth context ',me)
                setUser(me)
                setLoggedIn(true)
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        })()
    }, [])
    // {role: 'admin', _id: '6426e6217d2d863a58539ef6', email: 'mrtsvs17@gmail.com'}

    const login = (data) => {
        console.log(data.user)
        setLoggedIn(true)
        setUser(data.user) // eger direkt data yi eklersek useEffect icerisinde fetchMe nin dondugu bir data gibi data eklemis olmayiz login kullanicinin access ve refresh tokenlarini de donuyor. useEffect deki gibi eklemek icin bu sekilde .user seklinde ekliyoruz. boyle eklemezsek ilk giriste otomatik olarak admin butonu gelmiyor sayfayi yenileyince geliyor. Bu sekilde sıkıntısız bir şekilde çalışıyor.
        localStorage.setItem('access-token', data.accessToken) // kullanıcı sisteme giriş yaptıktan sonra bu bilgileri her seferinde apiden çekmek yerine localstorage a kaydediyoruz ve lazım olduğunda oradan alıyoruz
        localStorage.setItem('refresh-token', data.refreshToken)
        localStorage.setItem('loggedIn', true)
    }

    const logout = async (callback) => {
        setLoggedIn(false)
        setUser(null)
        const response = await fetchLogout()
        localStorage.removeItem("refresh-token") // artık sistemde bir kullanıcı olmadığı için localstorage dan bu bilgiler siliniyor
        localStorage.removeItem("access-token")
        localStorage.setItem('loggedIn', false)
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

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {
    AuthProvider,
    useAuth
}