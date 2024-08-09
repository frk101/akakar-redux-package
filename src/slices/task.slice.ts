// tasksSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DataConfig } from "../constants/Config";
import { RootState } from "../store";
import { User } from "./user.slice";

// Task Model
export interface Task {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  date: string;
  user: User;
}

// Task State
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Fetch All Tasks
export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.user?.token; // Auth state'den token'ı alıyoruz

    try {
      const response = await axios.get(`${DataConfig.BASE_URL}/tasks/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.tasks;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Insert Task
export const insertTask = createAsyncThunk(
  "tasks/insert",
  async (
    taskData: {
      title: string;
      description: string;
      status: string;
      date: string;
      user: string;
    },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.user?.token; // Auth state'den token'ı alıyoruz

    try {
      const response = await axios.post(
        `${DataConfig.BASE_URL}/tasks/insert`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (
    {
      taskId,
      taskData,
    }: {
      taskId: string;
      taskData: {
        title: string;
        description: string;
        status: string;
        date: string;
        user: string;
      };
    },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.user?.token; // Auth state'den token'ı alıyoruz

    try {
      const response = await axios.put(
        `${DataConfig.BASE_URL}/tasks/${taskId}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.updatedTask;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.user?.token; // Auth state'den token'ı alıyoruz

    try {
      await axios.delete(`${DataConfig.BASE_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return taskId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Fetch Tasks by User
export const fetchTasksByUser = createAsyncThunk(
  "tasks/fetchByUser",
  async (userId: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.user?.token; // Auth state'den token'ı alıyoruz
    try {
      const response = await axios.get(
        `${DataConfig.BASE_URL}/tasks/allTasksByUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Task Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllTasks.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllTasks.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(insertTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(insertTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasksByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTasksByUser.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchTasksByUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default taskSlice.reducer;
