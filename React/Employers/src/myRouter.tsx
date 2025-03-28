import { createBrowserRouter } from "react-router";
import About from "./Components/About";
import Layout from "./Components/AppLayuot";
import Home from "./Components/Home";
import AddFiles from "./Components/AddFiles";
import Login from "./Components/Login";
import EmployerFiles from "./Components/EmployerFiles";



const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [

      { path: "about", element: <About /> },
      { path: "HomePage", element: <Home /> },
      { path: "addfiles", element: <AddFiles /> },
      { path: "login", element: <Login /> },
      { path: "userFiles", element: <EmployerFiles /> },
      { index: true, element: <Home /> },
],
  },
]);
export default myRouter;
