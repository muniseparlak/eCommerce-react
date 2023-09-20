import { useState, useEffect, createContext, useContext} from 'react'
import { fetchLogout, fetchMe } from '../api';

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser ] =useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe()

                setLoggedIn(true)
                setUser(me)
                console.log(me);
            } catch (error) {
                
            }
        } )()
    }, [])

    const login = (data) => {
        setLoggedIn(true)
        setUser(data.user)

        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token', data.refreshToken)
    }

    const logout = async (callback) => {
        setLoggedIn(false)
        setUser(null)

        await fetchLogout()

        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')

        callback()
    }
    

    const values = {
        loggedIn,
        user,
        login,
        logout
    }


    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}

const useAuth = () => useContext(AuthContext)

export {
    AuthProvider,
    useAuth
}