import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum UserRole {
    Employer = "Employer",
    Guest = "Guest"
}


interface UserState {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

const initialState: UserState = {
    id: "",
    name: "",
    email: "",
    role: UserRole.Guest

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;

        },
        clearUser(state) {
            state.id = "";
            state.name = "";
            state.email = "";
            state.role = UserRole.Guest;

        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;