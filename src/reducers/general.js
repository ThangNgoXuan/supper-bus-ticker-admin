import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: localStorage.getItem("collapsed") === "1",
  lang: localStorage.getItem("lang") || "en",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleCollapsed: (state, action) => {
      localStorage.setItem("collapsed", action.payload ? "1" : "0");
      state.collapsed = action.payload;
    },
    changeLang: (state, action) => {
      localStorage.setItem("lang", action.payload);
      state.lang = action.payload;
    },
  },
});

export const { toggleCollapsed, changeLang } = generalSlice.actions;

export default generalSlice.reducer;
