import { createBrowserRouter } from "react-router";
import About from "./Components/About";
import Layout from "./Components/AppLayuot";
import Home from "./Components/Home";



const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [

      { path: "about", element: <About /> },
      { path: "HomePage", element: <Home /> },
      { index: true, element: <Home /> },
],
  },
]);
export default myRouter;
