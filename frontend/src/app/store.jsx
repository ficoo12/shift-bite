import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "../features/restaurants/restaurantsSlice";
import rolesReducer from "../features/roles/rolesSlice";
import employeeeReducer from "../features/employees/employeesSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    roles: rolesReducer,
    employees: employeeeReducer,
  },
});
