import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ReservationFormData: null,
  directionsData: null,
};

export const ReservationFormSlice = createSlice({
  name: "reservationForm",
  initialState,
  reducers: {
    setReservationFormData(state, action) {
      state.ReservationFormData = action.payload;
    },
    setDirectionsData(state, action) {
      state.directionsData = action.payload;
    },
    resetReservationForm(state) {
      state.ReservationFormData = null;
      state.directionsData = null;
    },
  },
});

export const {
  setReservationFormData,
  resetReservationForm,
  setDirectionsData,
} = ReservationFormSlice.actions;

export default ReservationFormSlice.reducer;
