import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieApi } from "../../service/MovieApi";
import { RootState } from "../store";

export const createMovie = createAsyncThunk(
  "movie/MovieCreate",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMovie = createAsyncThunk(
  "movie/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.getAll();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeMovieItem = createAsyncThunk(
  "movie/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const UpdateMovie = createAsyncThunk(
  "movie/edit",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.edit(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const UpdateMultiMovie = createAsyncThunk(
  "movie/editMulti",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.updateMulti(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOneMovie = createAsyncThunk(
  "movie/getOneMovie",
  async (slug: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.getOne(slug);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchMovie = createAsyncThunk(
  "movie/searchMovie",
  async (key: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.search(key);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type initialStateT = {
  movie: any[],
  oneMovie: any[],
  movieSearch: any[],
  errMess: any,
  isLoading: boolean
}
const initialState: initialStateT = {
  movie: [],
  oneMovie: [],
  errMess: "",
  movieSearch: [],
  isLoading: false
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createMovie.pending, (state, action) => {
      state.errMess = false;
    });
    builder.addCase(createMovie.fulfilled, (state, action) => {
      state.movie.push(action.payload);
    });
    builder.addCase(createMovie.rejected, (state, action) => {
      state.errMess = action.payload;
    });
    // list
    builder.addCase(getMovie.pending, (state, action) => {
      state.errMess = action.payload;
      state.isLoading = true
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
      state.isLoading = false
    });
    builder.addCase(getMovie.rejected, (state, action) => {
      state.errMess = true;
      state.isLoading = false
    });
    // remove
    builder.addCase(removeMovieItem.fulfilled, (state, action) => {
      state.errMess = action.payload;
      state.movie = state.movie.filter(
        (x: any) => x._id !== action.payload._id
      );
    });
    builder.addCase(UpdateMovie.rejected, (state, action) => {
      state.errMess = true;
    });
    // update
    builder.addCase(UpdateMovie.fulfilled, (state, action) => {
      state.errMess = action.payload;
      state.movie = state.movie.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });

    builder.addCase(getOneMovie.pending, (state, action) => {
      state.errMess = false;
    });
    builder.addCase(getOneMovie.fulfilled, (state, action) => {
      state.errMess = false;
      state.oneMovie = action.payload;
    });
    builder.addCase(getOneMovie.rejected, (state, action) => {
      state.errMess = true;
    });
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.movieSearch = action.payload;
    });
  },
});

// Select state currentUser from slice
export const selectMovies = (state:RootState) =>state.movie.movie
export const oneMovie = (state:RootState) => state.movie.oneMovie
export const selectPending = (state:RootState) => state.movie.isLoading
export default movieSlice.reducer;
