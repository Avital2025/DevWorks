// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import { FormEvent, useContext, useRef, useState } from 'react';
// import axios, { AxiosError } from "axios";
// import { IsLogin, User } from '../App';
// import { style } from '../styleModel';
// import UpdateDetails from './UpdateDetails';
// import Swal from 'sweetalert2';
// export default function Login() {
//     const email = useRef<HTMLInputElement>(null);
//     const password = useRef<HTMLInputElement>(null);
//     const [click, setClick] = useState("");
//     const [open, setOpen] = useState(false);
//     const userContext = useContext(User);
//     const [isLogin, setLogin] = useContext(IsLogin);

//     const handleClose = () => setOpen(false);
//     const handleOpenSignIn = () => { setClick("Register"); setOpen(true); };
//     const handleOpenSignUp = () => { setClick("Login"); setOpen(true); };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const url = "http://localhost:3000";
//         try {
//             const res = await axios.post(`${url}/api/user/${click === 'Register' ? 'register' : 'login'}`, {
//                 email: email.current?.value,
//                 password: password.current?.value
//             });
//             userContext.userDispatch({
//                 type: 'LOGIN',
//                 data: click === 'Login' ? {
//                     id: res.data.userId,
//                     email: email.current?.value,
//                     password: password.current?.value
//                 } : { ...res.data.user }
//             });
//             setLogin(true);
//             handleClose();
//         } catch (e: AxiosError | any) {
//             if (e.response?.status === 404||e.response?.status === 401) {
//                 handleClose();
//                 Swal.fire("Oops...", "User not found! Please sign up first.", "error");            
//             }
//             else if (e.response?.status === 422)
//                 alert(e.response.data.message);
//             else if (e.response?.status === 400) {
//                 handleClose();
//                 Swal.fire("Oops...", "This user already exists. Please sign in.", "error");            
//             }
//             else throw new Error(e.response.status + " " + e.response.data.message);
//         }
//     };

//     return (
//         <>
//             <Box sx={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 1 }}>
//                 {!isLogin ? (
//                     <>
//                         <Button onClick={handleOpenSignIn} color='inherit'>Login</Button>
//                         <Button onClick={handleOpenSignUp} color='inherit'>Register</Button>
//                     </>
//                 ) : <UpdateDetails />}
//             </Box>

//             <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Enter your email and code
//                     </Typography>
//                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                         <form onSubmit={handleSubmit}>
//                             <TextField inputRef={email} label="email" variant="outlined" type='email' />
//                             <TextField inputRef={password} label="password" variant="outlined" type='password' />
//                             <Button type="submit">save</Button>
//                         </form>
//                     </Typography>
//                 </Box>
//             </Modal>
//         </>
//     );
// }

/*------------------------------*/

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { FormEvent, useContext, useRef, useState } from 'react';
// import axios, { AxiosError } from "axios";
// import { IsLogin, User } from '../App';
// import { style } from '../styleModel';
// import UpdateDetails from './UpdateDetails';
// import Swal from 'sweetalert2';

// export default function Login() {
//     const email = useRef<HTMLInputElement>(null);
//     const password = useRef<HTMLInputElement>(null);
//     const [role, setRole] = useState<string>('');
//     const fullName = useRef<HTMLInputElement>(null);
//     const [click, setClick] = useState("");
//     const [open, setOpen] = useState(false);
//     const userContext = useContext(User);
//     const [isLogin, setLogin] = useContext(IsLogin);

//     const handleClose = () => setOpen(false);
//     const handleOpenSignIn = () => { setClick("Login"); setOpen(true); };
//     const handleOpenSignUp = () => { setClick("Register"); setOpen(true); };

//     // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     //     e.preventDefault();
//     //     const url = "http://localhost:5069"; // כאן מוגדר ה-URL של השרת
//     //     try {
//     //         const data = click === 'Register' ? {
//     //             email: email.current?.value,
//     //             passwardHash: password.current?.value,
//     //             role: role,
//     //             FullName: fullName.current?.value
//     //         } : {
//     //             email: email.current?.value,
//     //             passwardHash: password.current?.value
//     //         };
    
//     //         const res = await axios.post(`${url}/users/${click === 'Register' ? 'register' : 'login'}`, data);
    
//     //         userContext.userDispatch({
//     //             type: 'LOGIN',
//     //             data: click === 'Login' ? {
//     //                 id: res.data.userId,
//     //                 email: email.current?.value,
//     //                 passwardHash: password.current?.value
//     //             } : { ...res.data.user }
//     //         });
//     //         setLogin(true);
//     //         handleClose();
//     //     } catch (e: AxiosError | any) {
//     //         if (e.response?.status === 404 || e.response?.status === 401) {
//     //             handleClose();
//     //             Swal.fire("Oops...", "User not found! Please sign up first.", "error");
//     //         } else if (e.response?.status === 422)
//     //             alert(e.response.data.message);
//     //         else if (e.response?.status === 400) {
//     //             handleClose();
//     //             Swal.fire("Oops...", "This user already exists. Please sign in.", "error");
//     //         } else throw new Error(e.response.status + " " + e.response.data.message);
//     //     }
//     // };
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         console.log("email: ",email);
//         console.log("password: ",password); 
//         e.preventDefault();

//         const url = "https://devworksweb.onrender.com"; 
//         try {
//             const data = click === 'Register' ? {
//                 email: email.current?.value,
//                 passwordHash: password.current?.value,
//                 role: role,
//                 FullName: fullName.current?.value
//             } : {
//                 email: email.current?.value,
//                 passwordHash: password.current?.value
//             };
    
//             const res = await axios.post(`${url}/Auth/${click === 'Register' ? 'register' : 'login'}`, data);
           
//             userContext.userDispatch({
//                 type: 'LOGIN',
//                 data: click === 'Login' ? {
//                     id: res.data.userId,
//                     email: email.current?.value,
//                     passwordHash: password.current?.value
//                 } : { ...res.data.user }
//             });
//             setLogin(true);
//             handleClose();
//         } catch (e: AxiosError | any) {
//             if (click === 'Login' && (e.response?.status === 404 || e.response?.status === 401)) {
//                 handleClose();
//                 Swal.fire("Oops...", "User not found! Please sign up first.", "error");
//             } else if (click === 'Register' && e.response?.status === 400) {
//                 handleClose();
//                 Swal.fire("Oops...", "This user already exists. Please sign in.", "error");
//             } else if (e.response?.status === 422) {
//                 alert(e.response.data.message);
//             } else {
//                 throw new Error(e.response.status + " " + e.response.data.message);
//             }
//         }
//     };
//     return (
//         <>
//             <Box sx={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 1 }}>
//                 {!isLogin ? (
//                     <>
//                         <Button onClick={handleOpenSignIn} color='inherit'>Login</Button>
//                         <Button onClick={handleOpenSignUp} color='inherit'>Register</Button>
//                     </>
//                 ) : <UpdateDetails />}
//             </Box>

//             <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Enter your email and code
//                     </Typography>
//                     <div id="modal-modal-description" style={{ marginTop: "16px" }}>
//                         <form onSubmit={handleSubmit}>
//                             <TextField inputRef={email} label="email" variant="outlined" type='email' />
//                             <TextField inputRef={password} label="password" variant="outlined" type='password' />
//                             {click === 'Register' && (
//                                 <>
//                                     <Select
//                                         value={role}
//                                         onChange={(e) => setRole(e.target.value as string)}
//                                         displayEmpty
//                                         variant="outlined"
//                                         fullWidth
//                                     >
//                                         <MenuItem value="" disabled>Select Role</MenuItem>
//                                         <MenuItem value="Employer">Employer</MenuItem>
//                                         <MenuItem value="Worker">Worker</MenuItem>
//                                     </Select>
//                                     <TextField inputRef={fullName} label="FullName" variant="outlined" />
//                                 </>
//                             )}
//                             <Button type="submit">save</Button>
//                         </form>
//                     </div>
//                 </Box>
//             </Modal>
//         </>
//     );
// }
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField,  Typography, Container, Card, CardContent } from '@mui/material';
import axios, { AxiosError } from "axios";
import { IsLogin, User } from '../App';
import Swal from 'sweetalert2';

export default function AuthPage() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const fullName = useRef<HTMLInputElement>(null);
    const [click, setClick] = useState<'Login' | 'Register'>('Login');
    const userContext = useContext(User);
    const [ _,setLogin] = useContext(IsLogin);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = "http://localhost:5069";
        try {
            const data = click === 'Register' ? {
                FullName: fullName.current?.value,
                email: email.current?.value,
                passwordHash: password.current?.value,
                role: "Employer" // תמיד שולח "Employer"
               
            } : {
                email: email.current?.value,
                passwordHash: password.current?.value
            };
            
            const res = await axios.post(`${url}/Auth/${click.toLowerCase()}`, data);
            
            userContext.userDispatch({
                type: 'LOGIN',
                data: click === 'Login' ? {
                    id: res.data.userId,
                    email: email.current?.value,
                    role: "Employer",
                    passwordHash: password.current?.value
                } : { ...res.data.user }
            });
            
            setLogin(true);
            navigate('/addFiles');
        } catch (e: AxiosError | any) {
            if (click === 'Login' && (e.response?.status === 404 || e.response?.status === 401)) {
                Swal.fire("Oops...", "User not found! Please sign up first.", "error");
            } else if (click === 'Register' && e.response?.status === 400) {
                Swal.fire("Oops...", "This user already exists. Please sign in.", "error");
            } else if (click === 'Register' && e.response?.status === 409) {
                Swal.fire("Oops...", "This email already exists!", "error");
            } else if (e.response?.status === 422) {
                alert(e.response.data.message);
            } else {
                console.error(e);
            }
        }
    };
    return (
            <Container maxWidth="sm">
                <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            {click === 'Login' ? 'Sign In' : 'Sign Up'}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                            {click === 'Register' && (
                                <TextField inputRef={fullName} label="Full Name" variant="outlined" required fullWidth />
                            )}
                            <TextField inputRef={email} label="Email" variant="outlined" type="email" required fullWidth />
                            <TextField inputRef={password} label="Password" variant="outlined" type="password" required fullWidth />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {click === 'Login' ? 'Login' : 'Register'}
                            </Button>
                            <Button onClick={() => setClick(click === 'Login' ? 'Register' : 'Login')} color="secondary">
                                {click === 'Login' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        );
        
}    