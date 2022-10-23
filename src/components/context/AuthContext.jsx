import { createContext, useCallback, useContext, useState, useEffect  } from "react";


const AuthContext = createContext({login: () => {}, logout: () => {} })

const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState({
        isLoggedIn: false,
        userId: null,
        userName: null,
        userEmail: null,
        userImageUrl: null,
        token: null
    });


    const login = useCallback((userId, userName, userEmail, userImageUrl, token) =>{
        setUserData({
            isLoggedIn: true,
            userId,
            userName,
            userEmail,
            userImageUrl,
            token
        })
        localStorage.setItem(
          'userDetails',
          JSON.stringify({ userId, userName, userEmail, userImageUrl, token })
        )
      }, [])
    

    const logout = useCallback(() => {
        setUserData({
            isLoggedIn: false,
            userId: null,
            userName: null,
            userEmail: null,
            userImageUrl: null,
            token: null
        })
        localStorage.removeItem('userDetails')
      }, [])

      useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem('userDetails'))
    
        if (storedData && storedData.token) {
          login(storedData.userId, storedData.userName, storedData.userEmail, storedData.userImageUrl, storedData.token)
        }
    
      }, [login])



    return <AuthContext.Provider value={{userData, setUserData, login, logout}}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)


export { useAuth, AuthProvider}

