import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "../features/restaurants/restaurantsSlice";
import rolesReducer from "../features/roles/rolesSlice";
import employeeeReducer from "../features/employees/employeesSlice";
import shiftReducer from "../features/shifts/shiftsSlice";
import authReducer from "../features/authState/authSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    roles: rolesReducer,
    employees: employeeeReducer,
    shifts: shiftReducer,
    auth: authReducer,
  },
});
