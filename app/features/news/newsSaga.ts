import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure } from './newsSlice';
import  fetchNews  from '../../api/newsApi';

function* handleFetchNews() {
  try {
    const data = yield call(fetchNews); // Call the API to get the news articles
    yield put(fetchNewsSuccess(data)); // Dispatch the fetched articles
  } catch (error: any) {
    yield put(fetchNewsFailure(error.message)); // Dispatch failure with error message
  }
}

export default function* newsSaga() {
  yield takeLatest(fetchNewsRequest.type, handleFetchNews);
}
