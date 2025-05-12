import { FormEvent, useState } from "react";
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { style } from "../styleModel";
import { RootStore } from "../ReduxStore";
import { setUser } from "../UserSlice";
import axiosInstance from "../axiosInstance"; 

const UpdateDetails = ({ onClose }: { onClose: () => void }) => {
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
      await axiosInstance.put("/users/update-credentials", {
        fullName: user.fullName,
        passwordHash: user.passwordHash
      });

      dispatch(setUser({
        ...userRedux,
        name: user.fullName
      }));

      alert("Details updated successfully");
      onClose();
    } catch (e: any) {
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

//final