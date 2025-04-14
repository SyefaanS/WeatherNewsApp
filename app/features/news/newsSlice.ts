import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsState {
  articles: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess: (state, action: PayloadAction<any[]>) => {
      state.articles = action.payload;
      state.loading = false;
    },
    fetchNewsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure } = newsSlice.actions;
export default newsSlice.reducer;
