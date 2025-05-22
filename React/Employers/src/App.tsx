import { RouterProvider } from 'react-router'
import MyRouter from './myRouter'
import { Provider } from 'react-redux'
import { createContext, Dispatch, useState, useEffect } from 'react'
import store from './ReduxStore'
import { useDispatch } from 'react-redux'
import { setUser } from './UserSlice'


export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])

function App() {
 
   const [isLogin, setIsLogin] = useState(false)
   const dispatch = useDispatch();

   useEffect(() => {
      try {
         const storedUser = localStorage.getItem('user');
         const token = localStorage.getItem('token');
      
         if (storedUser && token && storedUser !== "undefined") {
            const parsedUser = JSON.parse(storedUser);
            dispatch(setUser(parsedUser)); 
            setIsLogin(true); 
         } else {
            setIsLogin(false); 
         }
      } catch (error) {
         console.error('Failed to parse user from localStorage:', error);
         setIsLogin(false);
      }
      
   }, [dispatch]);

   return (
      <IsLogin.Provider value={[isLogin, setIsLogin]}>
            <Provider store={store}>
               <RouterProvider router={MyRouter} />
            </Provider>
      </IsLogin.Provider>
   )
}

export default App;
