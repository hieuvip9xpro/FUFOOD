import React from 'react';
import RootStackScreen from './screens/RootStackScreen';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer> 
        <RootStackScreen />
    </NavigationContainer>
  );
}

export default App;
