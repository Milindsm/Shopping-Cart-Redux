import { configureStore } from "@reduxjs/toolkit";

import cartToggleSlice from "./cartToggleSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: { cartToggle: cartToggleSlice.reducer, cart: cartSlice.reducer },
});

export default store;