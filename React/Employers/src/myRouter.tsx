import { createBrowserRouter, Navigate } from "react-router";
import About from "./Components/About";
import Layout from "./Components/AppLayuot";
import Home from "./Components/Home";
import AddFiles from "./Components/AddFiles";
import Login from "./Components/Login";
import EmployerFiles from "./Components/EmployerFiles";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useContext } from "react";
import { IsLogin } from "./App";

function LoginOrHome() {
  const [isLogin] = useContext(IsLogin);
  return isLogin ? <Navigate to="/HomePage" replace /> : <Login />; 
}

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "about", element: <About /> },
      { path: "HomePage", element: <Home /> },
      { path: "login", element: <LoginOrHome /> }, // משתמשים ברכיב שעושה את הבדיקה
      { path: "addfiles", element: (<ProtectedRoute> <AddFiles /> </ProtectedRoute> )},
      { path: "userFiles", element: (<ProtectedRoute> <EmployerFiles /> </ProtectedRoute> )},
      { index: true, element: <Home /> },
    ],
  },
]);
