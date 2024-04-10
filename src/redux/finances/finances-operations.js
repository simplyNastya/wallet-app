import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import * as api from '../../shared/api/auth';

export const allTransactions = createAsyncThunk(
  'transaction/get',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.allTransactions(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transaction/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addTransaction(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  'get/category',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const result = await api.Categories(auth.token);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const getSummary = createAsyncThunk(
  "getSummary",
  async (period = "", { rejectWithValue }) => {
    try {
      const data  = await api.getSummary(period);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteTransaction(id);
      return id;

    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
)
export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.editTransaction(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
)

