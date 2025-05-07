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
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
         const parsedUser = JSON.parse(storedUser);
         dispatch(setUser(parsedUser)); // טוען ל-Redux
         setIsLogin(true); // מעדכן שהמשתמש מחובר
      } else {
         setIsLogin(false); // אם אין נתונים תקפים, המשתמש לא מחובר
      }
   }, [dispatch]);

   return (
      <IsLogin.Provider value={[isLogin, setIsLogin]}>
         {/* <User.Provider value={{ user, userDispatch }}> */}
            <Provider store={store}>
               <RouterProvider router={MyRouter} />
            </Provider>
         {/* </User.Provider> */}
      </IsLogin.Provider>
   )
}

export default App;
