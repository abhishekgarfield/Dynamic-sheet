import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../apis/api';

import URLs from '../../../config/urls';
import {LoadStatus} from './types';

interface HomeState {
  fetchAllDropDownLocationsLoader: LoadStatus;
  fetchAllRouteLoader: LoadStatus;
  startLocation: any;
  endLocation: any;
  allRoutes: any;
}

const homeState: HomeState = {
  fetchAllDropDownLocationsLoader: 'idle',
  fetchAllRouteLoader: 'idle',
  startLocation: null,
  endLocation: null,
  allRoutes: null,
};

export const getAllDropdownLocations = createAsyncThunk(
  'home/getAllDropdownLocations',
  async (params, thunkApi) => {
    console.log('🚀 ~ params:', params);
    try {
      const response = await api({
        method: 'GET',
        url: URLs.getNearByDrivers,
        params: {lat: params.lat, lng: params.lng}, // Ensure params are passed correctly
      });
      console.log('🚀 ~ response:', response.data.nearbyDrivers);
      return response.data.nearbyDrivers;
    } catch (err) {
      thunkApi.rejectWithValue(err);
    }
  },
);

export const fetchAllRoutes = createAsyncThunk(
  'auth/fetchAllRoutes',
  async (params: any, thunkAPI) => {
    try {
      const response = await api({
        method: 'POST',
        url: URLs.deleteAllNotifications,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(params),
      });
      console.log('🚀 ~11111--------delete all notification ', response.data);
      if (response?.data?.status) {
        return response?.data?.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState: homeState,
  reducers: {
    addStartLocation: (state, action) => ({
      ...state,
      startLocation: action.payload,
    }),
    addEndLocation: (state, action) => ({
      ...state,
      endLocation: action.payload,
    }),
    deleteStartLocation: state => ({
      ...state,
      startLocation: null,
      allRoutes: null,
    }),
    deleteEndLocation: state => ({
      ...state,
      endLocation: null,
      allRoutes: null,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllRoutes.fulfilled, (state, action) => {
        state.fetchAllRouteLoader = 'loaded';
        state.allRoutes = action?.payload ?? null;
      })
      .addCase(fetchAllRoutes.pending, (state, action) => {
        state.fetchAllRouteLoader = 'loading';
      })
      .addCase(fetchAllRoutes.rejected, (state, action) => {
        state.fetchAllRouteLoader = 'failed';
      });
  },
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;
