import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store';
import BikeList from './BikeList';
import AddBikeScreen from './AddBikeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BikeList">
          <Stack.Screen name="BikeList" component={BikeList} options={{ title: 'Danh sách xe đạp' }} />
          <Stack.Screen name="AddBike" component={AddBikeScreen} options={{ title: 'Thêm xe đạp' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
