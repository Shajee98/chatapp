/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

 const Stack = createNativeStackNavigator();
 
 const App = () => {
 
   return (
     <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name='Home' component={HomeScreen}/>
         <Stack.Screen name='Chat' component={ChatScreen}/>
      </Stack.Navigator>
     </NavigationContainer>
   );
 };
 
 export default App;
 