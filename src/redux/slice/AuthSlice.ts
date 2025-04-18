import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../../service/authApi";
import { jwtDecode } from "jwt-decode";

// thunk :
export const authAsyncRegister = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("auth/authAsyncRegister", async (registerData, { rejectWithValue }) => {
  try {
    const { data } = await AuthApi.register(registerData);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const authAsyncLogin = createAsyncThunk<
  { user: any; accessToken: any },
  any,
  { rejectValue: string }
>("auth/authAsyncLogin", async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await AuthApi.login(loginData);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getCurrentUser = createAsyncThunk<any>(
  "auth/getCurrentUser",
  async (_: any, { rejectWithValue }) => {
    try {
      const root = localStorage.getItem("persist:root");
      if (!root) throw new Error("No persist:root found");

      const parsedRoot = JSON.parse(root);

      if (!parsedRoot.authReducer) {
        throw new Error("authReducer not found in persist:root");
      }

      const authReducer = JSON.parse(parsedRoot.authReducer);

      if (!authReducer.accessToken) {
        throw new Error("accessToken not found");
      }

      const decoded = jwtDecode(authReducer.accessToken);

      return decoded;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || error.message || "Unknown error"
      );
    }
  }
);

//slice
type AuthState = {
  isLogged: boolean;
  currentUser: any | {};
  accessToken: string;
};

const initialState: AuthState = {
  currentUser: {},
  isLogged: false,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogOut() {
    localStorage.removeItem("persist:root");
    localStorage.removeItem("accessToken");
    },
  },
  extraReducers(builder) {
    builder.addCase(authAsyncLogin.fulfilled, (state, action) => {
      state.isLogged = true;
      state.accessToken = action.payload.accessToken;
      state.currentUser = action.payload.user;
    });
    // builder.addCase(getCurrentUser.fulfilled, (state, action) => {
    //   state.isLogged = true;
    //   state.accessToken = action.payload.accessToken;
    //   state.currentUser = action.payload.user;
    // });
  },
});

export default authSlice.reducer;
export const selectCurrentUser = (state: any) => state.auth.currentUser;
export const { LogOut } = authSlice.actions;
