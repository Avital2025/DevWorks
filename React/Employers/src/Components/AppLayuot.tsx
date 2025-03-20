import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
// import Login from "./Login";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Login/>  */}
    </div>
  );
}


