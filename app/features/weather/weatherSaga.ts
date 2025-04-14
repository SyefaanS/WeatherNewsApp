import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import * as Location from "expo-location";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "./weatherSlice";
import fetchWeather from "../../api/weatherApi";
import { cacheData, getCachedData } from "../../utils/cache";

function* handleFetchWeather(): SagaIterator {
  try {
    const cachedWeather = yield call(getCachedData, "weather");
    console.log("Cached Weather:", cachedWeather);

    if (cachedWeather) {
      yield put(fetchWeatherSuccess(cachedWeather));
    } else {
      const { status } = yield call([
        Location,
        "requestForegroundPermissionsAsync",
      ]);
      console.log("Location Permission Status:", status);

      if (status !== "granted") throw new Error("Location permission denied");

      const location = yield call([Location, "getCurrentPositionAsync"], {});
      console.log("Location:", location);

      const data = yield call(
        fetchWeather,
        location.coords.latitude,
        location.coords.longitude
      );
      console.log("Fetched Weather Data:", data);

      yield call(cacheData, "weather", data);
      console.log("Weather data cached");

      yield put(fetchWeatherSuccess(data));
    }
  } catch (error: any) {
    console.error("Weather Fetch Error:", error);
    yield put(fetchWeatherFailure(error.message || "Something went wrong"));
  }
}

export default function* weatherSaga(): SagaIterator {
  yield takeLatest(fetchWeatherRequest.type, handleFetchWeather);
}
