import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import HostagesCounter from "./HostagesCounter";
import ChatBot from "./ChatBot";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <HostagesCounter />
      <div style={{  marginBottom: "100px" }}>
        <Outlet />
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
}


