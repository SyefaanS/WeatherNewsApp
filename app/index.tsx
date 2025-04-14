import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import AppNavigator from './navigation/AppNavigator';
import { useTheme } from './theme/theme';
import { Provider } from 'react-redux';
import { store } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home' | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      setInitialRoute(user ? 'Home' : 'Login');
    };
    checkLogin();
  }, []);

  if (!initialRoute) return null; // Or show a loading spinner here


  return (
    <Provider store={store}> 
      <ThemeProvider theme={theme}>
          <AppNavigator initialRouteName={initialRoute} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
