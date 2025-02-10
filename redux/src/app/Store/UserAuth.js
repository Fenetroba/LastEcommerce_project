import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Lib/Axios.js";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null, // Added error state for better error handling
};

export const signupUser = createAsyncThunk(
  "/auth/signup",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/signup", form, {
        withCredentials: true,
      });
      return response.data; // Return success data
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        return rejectWithValue(error.response.data.error); // Return specific error message
      } else if (error.request) {
        console.error("No response received:", error.request);
        return rejectWithValue("No response from server.");
      } else {
        console.error("Error message:", error.message);
        return rejectWithValue("An error occurred: " + error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (loginUser, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", loginUser, {
        withCredentials: true, // Include credentials if needed
      });
      return response.data; // Return the successful response data
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);

        return rejectWithValue(error.response.data.error); // Return specific error message
      } else if (error.request) {
        console.error("No response received:", error.request);
        return rejectWithValue("No response from the server.");
      } else {
        console.error("Error message:", error.message);
        return rejectWithValue("An error occurred: " + error.message);
      }
    }
  }
);

export const CheckAuths = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axios.get("/auth/check-auth", {
    withCredentials: true, // Include credentials if needed
    headers: {
      "cache-control": "no-cache , no-store,must-revaliate, proxy-revalidate",
    },
  });
});

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true; // Set loading to true
        state.error = null; // Clear previous errors
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false; // Set loading to false
        state.isAuthenticated = false; // Adjust based on your logic
        state.user = null; // Adjust based on your logic
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.payload || "Something went wrong"; // Capture error message
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // Set loading to true
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null; // Clear error on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.user = null; // Reset user on failure
        state.isAuthenticated = false; // Reset authentication state
        state.error = action.payload.action || "Login failed"; // Capture error message
      })

      // check the user authentication

      .addCase(CheckAuths.pending, (state) => {
        state.loading = true; // Set loading to true
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(CheckAuths.fulfilled, (state, action) => {
        console.log(action); // Log action for debugging
        state.loading = false; // Set loading to false
    // Assuming the response contains user data
        state.isAuthenticated = true; // Set authenticated state
      })
      .addCase(CheckAuths.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.user = null; // Reset user on failure
        state.isAuthenticated = false; // Reset authentication state
        // Capture error message
      });
  },
});

export const { logout, SetUser } = authSlice.actions; // Export actions
export default authSlice.reducer; // Export reducer
