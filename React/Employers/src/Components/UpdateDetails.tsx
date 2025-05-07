// import { FormEvent, useContext, useState } from "react"
// import { Box, Button, Modal, TextField, Typography } from "@mui/material"
// import axios, { AxiosError } from "axios"
// import { User } from "../App";
// import { UserType } from '../types/userType'
// import { style } from "../styleModel";
// const updateDetails = () => {
//     const url = "http://localhost:5069";
//     const userContext = useContext(User)
//     const [user, setUser] = useState<UserType>(userContext.user)
//     const [open, setOpen] = useState(false)
//     const handleOpen = () => setOpen(true)
//     const handleClose = () => { setOpen(false) }
//     const handleChange = (e: { target: { name: any; value: any } }) => {
//         const { name, value } = e.target
//         setUser(
//             { ...user, [name]: value }
//          )}
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         try {
//             const res = await axios.put(`${url}/api/user`,
//                 {  ...user   },
//                 {   headers: {    "user-id": "" + user.id   }    } )   

//                 userContext.userDispatch(
//                 {     type: 'UPDATE',   data: res.data   }
//             )
//         } catch (e: AxiosError | any) {
//             if (e.response?.status === 401)
//                 alert(e.response.data.message)
//             else if (!e.response.ok)
//                 throw new Error(e.response.status + " " + e.response.data.message);
//         }
//         handleClose()
//     }
//     return (<>
//         <div>
//             <Button onClick={handleOpen} color='inherit'>update</Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Enter your details
//                     </Typography>
//                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 id="outlined-basic"
//                                 name="firstName"
//                                 label="first name"
//                                 variant="outlined"
//                                 margin="normal"
//                                 value={user.firstName}
//                                 onChange={handleChange}
//                             />
//                             <TextField
//                                 id="outlined-basic"
//                                 name="lastName"
//                                 label="last name"
//                                 variant="outlined"
//                                 margin="normal"
//                                 value={user.lastName}
//                                 onChange={handleChange}
//                             />
//                             <TextField
//                                 type="email"
//                                 id="outlined-basic"
//                                 name="email"
//                                 label="email"
//                                 variant="outlined"
//                                 margin="normal"
//                                 value={user.email}
//                                 onChange={handleChange}
//                             />
//                             <TextField
//                                 id="outlined-basic"
//                                 name="phon"
//                                 label="phon"
//                                 variant="outlined"
//                                 margin="normal"
//                                 value={user.phon}
//                                 onChange={handleChange}
//                             />
//                             <TextField
//                                 id="outlined-basic"
//                                 name="address"
//                                 label="address"
//                                 variant="outlined"
//                                 margin="normal"
//                                 value={user.address}
//                                 onChange={handleChange}
//                             />
//                             <div>
//                                 <Button type="submit">update</Button>
//                             </div>
//                         </form>
//                     </Typography>
//                 </Box>
//             </Modal>
//         </div>
//     </>)
// }
// export default updateDetails

// import { FormEvent, useContext, useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   InputAdornment,
//   IconButton
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import axios, { AxiosError } from "axios";
// // import { User } from "../App";
// import { UserType } from "../types/userType";
// import { style } from "../styleModel";

// type Props = {
//   onClose: () => void;
// };

// const UpdateDetails = ({ onClose }: Props) => {
//   const url = "http://localhost:5069";
//   const userContext = useContext(User);
//   const [showPassword, setShowPassword] = useState(false);

//   const [user, setUser] = useState<UserType>(() => {
//     const fromContext = userContext.user;
//     if (fromContext?.id) return fromContext;
//     const fromStorage = localStorage.getItem("user");
//     return fromStorage
//       ? JSON.parse(fromStorage)
//       : { id: "", fullName: "", email: "", passwordHash: "" };
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found");

//        await axios.put(
//         `${url}/users/update-credentials`,
//         {
//           fullName: user.fullName,
//           passwordHash: user.passwordHash
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert("Details updated successfully");
//       onClose();
//     } catch (e: AxiosError | any) {
//       if (e.response?.status === 401) alert("Unauthorized. Please log in again.");
//       else alert(`Error: ${e.response?.data?.message || e.message}`);
//     }
//   };

//   return (
//     <Box sx={style}>
//       <Typography variant="h6">Update Your Details</Typography>
//       <form onSubmit={handleSubmit} dir="ltr">
//         <TextField
//           label="Full Name"
//           name="fullName"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           value={user.fullName}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Email"
//           name="email"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           value={user.email}
//           InputProps={{
//             readOnly: true,
//             style: { color: "#888" }
//           }}
//         />
//         <TextField
//           label="New Password"
//           name="passwordHash"
//           type={showPassword ? "text" : "password"}
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           value={user.passwordHash || ""}
//           onChange={handleChange}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconButton
//                   onClick={() => setShowPassword(!showPassword)}
//                   edge="start"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             )
//           }}
//         />
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//             Update
//           </Button>
//           <Button onClick={onClose} sx={{ mt: 2 }} variant="outlined">
//             Close
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default UpdateDetails;


import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { style } from "../styleModel";
import { RootStore } from "../ReduxStore";
import { setUser } from "../UserSlice";

const UpdateDetails = ({ onClose }: { onClose: () => void }) => {
  const url = "http://localhost:5069";
  const dispatch = useDispatch();
  const userRedux = useSelector((state: RootStore) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUserState] = useState({
    fullName: userRedux.name,
    email: userRedux.email,
    passwordHash: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(
        `${url}/users/update-credentials`,
        {
          fullName: user.fullName,
          passwordHash: user.passwordHash
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // עדכון ה-Redux לאחר הצלחה
      dispatch(setUser({
        ...userRedux,
        name: user.fullName
      }));

      alert("Details updated successfully");
      onClose();
    } catch (e: AxiosError | any) {
      if (e.response?.status === 401) alert("Unauthorized. Please log in again.");
      else alert(`Error: ${e.response?.data?.message || e.message}`);
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6">Update Your Details</Typography>
      <form onSubmit={handleSubmit} dir="ltr">
        <TextField
          label="Full Name"
          name="fullName"
          variant="outlined"
          margin="normal"
          fullWidth
          value={user.fullName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={user.email}
          InputProps={{
            readOnly: true,
            style: { color: "#888" }
          }}
        />
        <TextField
          label="New Password"
          name="passwordHash"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          fullWidth
          value={user.passwordHash}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="start"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
          <Button onClick={onClose} sx={{ mt: 2 }} variant="outlined">
            Close
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateDetails;
