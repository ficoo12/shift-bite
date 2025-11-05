import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import restaurantsReducer from "../features/restaurants/restaurantsSlice";
import rolesReducer from "../features/roles/rolesSlice";
import employeeeReducer from "../features/employees/employeesSlice";
import shiftReducer from "../features/shifts/shiftsSlice";
import authReducer from "../features/authState/authSlice";

const persistAuthReducer = persistReducer(
  { key: "auth", storage },
  authReducer
);
const persistRestaurantReducer = persistReducer(
  {
    key: "restaurants",
    storage,
  },
  restaurantsReducer
);
const persistRolesReducer = persistReducer(
  { key: "roles", storage },
  rolesReducer
);
const persistEmployeesReducer = persistReducer(
  { key: "employees", storage },
  employeeeReducer
);
const persistShiftReducer = persistReducer(
  { key: "shifts", storage },
  shiftReducer
);
export const store = configureStore({
  reducer: {
    restaurants: persistRestaurantReducer,
    roles: persistRolesReducer,
    employees: persistEmployeesReducer,
    shifts: persistShiftReducer,
    auth: persistAuthReducer,
  },
});

export const persistor = persistStore(store);
