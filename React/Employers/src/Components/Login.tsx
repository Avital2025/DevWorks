

// import { useNavigate } from 'react-router-dom';
// import { Box, Button, TextField, Typography, Container, Card, CardContent } from '@mui/material';
// import axios, { AxiosError } from "axios";
// import { IsLogin, User } from '../App';
// import Swal from 'sweetalert2';
// import { useRef, useState, useContext } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../UserSlice';

// export default function AuthPage() {
//     const email = useRef<HTMLInputElement>(null);
//     const password = useRef<HTMLInputElement>(null);
//     const fullName = useRef<HTMLInputElement>(null);
//     const [click, setClick] = useState<'Login' | 'Register'>('Login');
//     const userContext = useContext(User);
//     const [_, setLogin] = useContext(IsLogin);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // const url = "http://localhost:5069";
//         try {
//             // const data = click === 'Register' ? {
//             //     FullName: fullName.current?.value,
//             //     email: email.current?.value,
//             //     passwordHash: password.current?.value,
//             //     role: "Employer"
//             // } : {
//             //     email: email.current?.value,
//             //     passwordHash: password.current?.value
//             // };

//             // const res = await axios.post(`${url}/Auth/${click.toLowerCase()}`, data);
//             // const { user } = res.data;

//             // // שמירת נתוני המשתמש
//             // localStorage.setItem('token', res.data.token);
//             // localStorage.setItem('user', JSON.stringify(user));
//             // localStorage.setItem('EmployerId', user.id);

//             // // עדכון Redux
//             // dispatch(setUser(user));

//             // userContext.userDispatch({
//             //     type: 'LOGIN',
//             //     data: user
//             // });
//             invoke(email.current?.value, password.current?.value, fullName.current?.value, click);

//             setLogin(true);
//             navigate('/addFiles');
//         } catch (e: AxiosError | any) {
//             if (click === 'Login' && (e.response?.status === 404 || e.response?.status === 401)) {
//                 Swal.fire("Oops...", "User not found! Please sign up first.", "error");
//             } else if (click === 'Register' && e.response?.status === 400) {
//                 Swal.fire("Oops...", "This user already exists. Please sign in.", "error");
//             } else if (click === 'Register' && e.response?.status === 409) {
//                 Swal.fire("Oops...", "This email already exists!", "error");
//             } else if (e.response?.status === 422) {
//                 alert(e.response.data.message);
//             } else {
//                 console.error(e);
//             }
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
//                 <CardContent>
//                     <Typography variant="h5" align="center" gutterBottom>
//                         {click === 'Login' ? 'Sign In' : 'Sign Up'}
//                     </Typography>
//                     <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
//                         {click === 'Register' && (
//                             <TextField inputRef={fullName} label="Full Name" variant="outlined" required fullWidth />
//                         )}
//                         <TextField inputRef={email} label="Email" variant="outlined" type="email" required fullWidth />
//                         <TextField inputRef={password} label="Password" variant="outlined" type="password" required fullWidth />
//                         <Button type="submit" variant="contained" color="primary" fullWidth>
//                             {click === 'Login' ? 'Login' : 'Register'}
//                         </Button>
//                         <Button onClick={() => setClick(click === 'Login' ? 'Register' : 'Login')} color="secondary">
//                             {click === 'Login' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
//                         </Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Container>
//     );
// }

// // import { useNavigate } from 'react-router-dom';
// // import { Box, Button, TextField, Typography, Container, Card, CardContent } from '@mui/material';
// // import axios, { AxiosError } from "axios";
// // import { IsLogin, User } from '../App';
// // import Swal from 'sweetalert2';
// // import { useRef, useState, useContext } from 'react';

// // export default function AuthPage() {
// //     const email = useRef<HTMLInputElement>(null);
// //     const password = useRef<HTMLInputElement>(null);
// //     const fullName = useRef<HTMLInputElement>(null);
// //     const [click, setClick] = useState<'Login' | 'Register'>('Login');
// //     const userContext = useContext(User);
// //     const [_, setLogin] = useContext(IsLogin);
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault();
// //         const url = "http://localhost:5069";
// //         try {
// //             const data = click === 'Register' ? {
// //                 FullName: fullName.current?.value,
// //                 email: email.current?.value,
// //                 passwordHash: password.current?.value,
// //                 role: "Employer"
// //             } : {
// //                 email: email.current?.value,
// //                 passwordHash: password.current?.value
// //             };

// //             const res = await axios.post(`${url}/Auth/${click.toLowerCase()}`, data);
// //             const {  User: userData } = res.data; 

// //             console.log("data", res.data);

// //             // שמור את ה-token ב-localStorage
// //             localStorage.setItem('token', res.data.token);

// //             // שמור את כל פרטי המשתמש (כולל ה-id) ב-localStorage
// //             localStorage.setItem('user', JSON.stringify(res.data.user));

// //             // אם אתה רוצה גם לשמור רק את ה-id בנפרד
// //             localStorage.setItem('EmployerId', res.data.user.id);

// //             userContext.userDispatch({
// //                 type: 'LOGIN',
// //                 data: userData
// //             });

// //             setLogin(true);
// //             navigate('/addFiles');
// //         } catch (e: AxiosError | any) {
// //             if (click === 'Login' && (e.response?.status === 404 || e.response?.status === 401)) {
// //                 Swal.fire("Oops...", "User not found! Please sign up first.", "error");
// //             } else if (click === 'Register' && e.response?.status === 400) {
// //                 Swal.fire("Oops...", "This user already exists. Please sign in.", "error");
// //             } else if (click === 'Register' && e.response?.status === 409) {
// //                 Swal.fire("Oops...", "This email already exists!", "error");
// //             } else if (e.response?.status === 422) {
// //                 alert(e.response.data.message);
// //             } else {
// //                 console.error(e);
// //             }
// //         }
// //     };

// //     return (
// //         <Container maxWidth="sm">
// //             <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
// //                 <CardContent>
// //                     <Typography variant="h5" align="center" gutterBottom>
// //                         {click === 'Login' ? 'Sign In' : 'Sign Up'}
// //                     </Typography>
// //                     <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
// //                         {click === 'Register' && (
// //                             <TextField inputRef={fullName} label="Full Name" variant="outlined" required fullWidth />
// //                         )}
// //                         <TextField inputRef={email} label="Email" variant="outlined" type="email" required fullWidth />
// //                         <TextField inputRef={password} label="Password" variant="outlined" type="password" required fullWidth />
// //                         <Button type="submit" variant="contained" color="primary" fullWidth>
// //                             {click === 'Login' ? 'Login' : 'Register'}
// //                         </Button>
// //                         <Button onClick={() => setClick(click === 'Login' ? 'Register' : 'Login')} color="secondary">
// //                             {click === 'Login' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
// //                         </Button>
// //                     </Box>
// //                 </CardContent>
// //             </Card>
// //         </Container>
// //     );
// // }import { useRef, useState } from "react";

import { Box, Button, TextField, Typography, Container, Card, CardContent } from "@mui/material";
import { useRef, useState } from "react";
import { useRestService } from "../utils/useRestService";


export default function AuthPage() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const fullName = useRef<HTMLInputElement>(null);
  const [click, setClick] = useState<'Login' | 'Register'>('Login');
  const { handleAuth } = useRestService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleAuth(
        click,
        email.current?.value,
        password.current?.value,
        fullName.current?.value
      );
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {click === "Login" ? "Sign In" : "Sign Up"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            {click === "Register" && 
              <TextField inputRef={fullName} label="Full Name" variant="outlined" required fullWidth />
            }
            <TextField inputRef={email} label="Email" variant="outlined" type="email" required fullWidth />
            <TextField inputRef={password} label="Password" variant="outlined" type="password" required fullWidth />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {click === "Login" ? "Login" : "Register"}
            </Button>
            <Button onClick={() => setClick(click === "Login" ? "Register" : "Login")} color="secondary">
              {click === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
