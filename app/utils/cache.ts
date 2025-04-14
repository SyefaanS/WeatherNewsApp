import AsyncStorage from '@react-native-async-storage/async-storage';

export const cacheData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to cache data:', e);
  }
};

export const getCachedData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    console.error('Failed to get cached data:', e);
    return null;
  }
};
