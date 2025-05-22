import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RootStore } from "../ReduxStore";
import { setUser } from "../UserSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStore) => state.user);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user.id) {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      dispatch(setUser(savedUser));
    }

    if (!token) {
      Swal.fire({
        title: "Access Denied! 🚫",
        text: getRandomMessage(),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Fine, I'll log in 🙄",
        cancelButtonText: "Nah, take me back",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        } else{
          navigate("/");
        }

      });
    } else {
      setIsChecking(false);
      

    }
  }, [user.id, dispatch]);

  if (isChecking) return null;

  return user.id ? children : <Navigate to="/login" replace />;
};

const getRandomMessage = () => {
  const messages = [
    "Nice try, but you need to log in first! No free passes here. 😜",
    "Oh no... You thought you could just sneak in? Not today! 😏",
    "Oops! This page is for logged-in users only. Maybe next time?",
    "Halt! Who goes there? Oh, it's you... but you're not logged in. 🚧",
    "I would totally let you in, but my boss says 'No Login, No Entry.' 🤷‍♂️",
    "Did you really think I wouldn’t notice you’re not logged in? 😂",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export default ProtectedRoute;

