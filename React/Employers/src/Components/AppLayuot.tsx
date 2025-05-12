import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: "70px" }}>
        <Outlet />
      </div>
      
      <Footer/>
    </div>
  );
}


//final