import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showTimetApi } from "../../service/showTime";

export const getAlSt = createAsyncThunk<any, any, { rejectValue: string }>(
   "st/getAlSt",
   async (options, { rejectWithValue }) => {
      try {
         const { data } = await showTimetApi.getAll(options);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const removeData = createAsyncThunk<any, any, { rejectValue: string }
>("st/removeData", async (id, { rejectWithValue }) => {
   try {
      const { data } = await showTimetApi.removeApi(id);
      return data.room;
   } catch (error: any) {
      return rejectWithValue(error.response.data);
   }
});
export const updateData = createAsyncThunk<any, any, { rejectValue: string }>(
   "st/updateData",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await showTimetApi.updateApi(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
   "st/create",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await showTimetApi.create(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const getShowTimeByDate  =  createAsyncThunk<any, any, { rejectValue: string }>(
    "st/getByDate",
    async (input, { rejectWithValue }) => {
       try {
          const { data } = await showTimetApi.getStShowTimeByDate(input);
          console.log("getShowTimeByDate payload",data)
          return data;
       } catch (error: any) {
          return rejectWithValue(error.response.data);
       }
    }
);
type showTimeState = {
   stList: any[];
   errorMessage: string | undefined;
   isLoading: boolean,
   showTimeByDate: any[]
};
const initialState: showTimeState = {
   stList: [],
   errorMessage: "",
   isLoading: false,
   showTimeByDate:[]
};

const ShowTimeSlice = createSlice({
   name: "st",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      //getAll

      builder.addCase(getAlSt.fulfilled, (state, { payload }) => {
         state.stList = payload;
         state.isLoading = false
      });
      builder.addCase(getAlSt.rejected, (state, { payload }) => {
         state.errorMessage = payload;
         state.isLoading = false
      });
      builder.addCase(getAlSt.pending, (state, { payload }) => {
         state.errorMessage = payload;
         state.isLoading = true
      });
      // delete

      builder.addCase(removeData.fulfilled, (state, action) => {

         state.stList = state.stList.filter((item) => item._id !== action.meta.arg);
      });
      builder.addCase(removeData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //create

      builder.addCase(createData.fulfilled, (state, { payload }) => {
         state.stList.push(payload);
         state.isLoading = false

      });
      builder.addCase(createData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
         state.isLoading = false
      });
      builder.addCase(createData.pending, (state, { payload }) => {
         state.errorMessage = payload;
         state.isLoading = true
      });
      //update

      builder.addCase(updateData.fulfilled, (state, action) => {
       
      });
      builder.addCase(updateData.rejected, (state, action) => {
         state.errorMessage = action.payload;
      });

      //getShowTimeByDate

      builder.addCase(getShowTimeByDate.fulfilled, (state, action) => {
         state.showTimeByDate = action.payload;
      });
      builder.addCase(getShowTimeByDate.rejected, (state, action) => {
         state.errorMessage = action.payload;
      });
   },
});
export default ShowTimeSlice.reducer;
