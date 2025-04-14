import { all } from 'redux-saga/effects';
import weatherSaga from '../features/weather/weatherSaga';
import newsSaga from '../features/news/newsSaga';

export default function* rootSaga() {
  yield all([weatherSaga(), newsSaga()]);
}
