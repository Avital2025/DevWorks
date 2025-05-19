import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import HostagesCounter from "./HostagesCounter";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <HostagesCounter />
      <div style={{ paddingTop: "100px", marginBottom: "100px" }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}


