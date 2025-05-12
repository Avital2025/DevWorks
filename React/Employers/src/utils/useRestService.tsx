// import axios, { AxiosError } from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { IsLogin } from "../App";
// import { useDispatch } from "react-redux";
// import { setUser } from "../UserSlice";

// export const useRestService = () => {
//   const navigate = useNavigate();
//   const [_, setLogin] = useContext(IsLogin);
//   const dispatch = useDispatch();

//   type ClickType = 'Login' | 'Register';

//   const handleAuth = async (
//     click: ClickType,
//     email?: string | null,
//     password?: string | null,
//     fullName?: string | null
//   ) => {
//     try {
//       const data =
//         click === "Register"
//           ? {
//               FullName: fullName,
//               email: email,
//               passwordHash: password,
//               role: "Employer",
//             }
//           : {
//               email: email,
//               passwordHash: password,
//             };

//       const res = await axios.post(`${URL}/Auth/${click.toLowerCase()}`, data);
//     const { user } = res.data;

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("EmployerId", user.id?.toString() || "0");

//       dispatch(setUser(user));

 
//       setLogin(true);
//       navigate("/addFiles");
//     } catch (e: AxiosError | any) {
//       if (click === "Login" && (e.response?.status === 404 || e.response?.status === 401)) {
//         Swal.fire("Oops...", "User not found! Please sign up first.", "error");
//       } else if (click === "Register" && e.response?.status === 400) {
//         Swal.fire("Oops...", "This user already exists. Please sign in.", "error");
//       } else if (click === "Register" && e.response?.status === 409) {
//         Swal.fire("Oops...", "This email already exists!", "error");
//       } else if (e.response?.status === 422) {
//         alert(e.response.data.message);
//       } else {
//         throw e; 
//       }
//     }
//   };

//   return { handleAuth };
// };


import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { IsLogin } from "../App";
import { useDispatch } from "react-redux";
import { setUser } from "../UserSlice";
import axiosInstance from "../axiosInstance";

export const useRestService = () => {
  const navigate = useNavigate();
  const [_, setLogin] = useContext(IsLogin);
  const dispatch = useDispatch();

  type ClickType = 'Login' | 'Register';

  const handleAuth = async (
    click: ClickType,
    email?: string | null,
    password?: string | null,
    fullName?: string | null
  ) => {
    try {
      const data =
        click === "Register"
          ? {
              FullName: fullName,
              email: email,
              passwordHash: password,
              role: "Employer",
            }
          : {
              email: email,
              passwordHash: password,
            };

      const res = await axiosInstance.post(`/Auth/${click.toLowerCase()}`, data);
      const { user } = res.data;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("EmployerId", user.id?.toString() || "0");

      dispatch(setUser(user));
      setLogin(true);
      navigate("/addFiles");
    } catch (e: AxiosError | any) {
      if (click === "Login" && (e.response?.status === 404 || e.response?.status === 401)) {
        Swal.fire("Oops...", "User not found! Please sign up first.", "error");
      } else if (click === "Register" && e.response?.status === 400) {
        Swal.fire("Oops...", "This user already exists. Please sign in.", "error");
      } else if (click === "Register" && e.response?.status === 409) {
        Swal.fire("Oops...", "This email already exists!", "error");
      } else if (e.response?.status === 422) {
        alert(e.response.data.message);
      } else {
        throw e;
      }
    }
  };

  return { handleAuth };
};


// final