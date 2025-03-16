// import { configureStore } from "@reduxjs/toolkit";
// import recipesSlice from "./Components/RecipesStore";
// const store = configureStore({
//     reducer: {
//         recipes: recipesSlice.reducer, 
    
//     }
// });
// export type RootStore = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;

// import { combineSlices, configureStore } from "@reduxjs/toolkit";
// import UserSlice from "./UserSlice";

// const store = configureStore(
//     {
//         reducer: combineSlices(UserSlice)
//     });

// export type RootState = ReturnType<typeof store.getState>

// export type UserDispatch = typeof store.dispatch

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

const store = configureStore({
    reducer: {
        user: userSlice
    }
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;