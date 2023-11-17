import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchPage from "../pages/search";
import { Header } from "react-native/Libraries/NewAppScreen";



const Stack = createNativeStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{headerShown:false}}
    />
  </Stack.Navigator>
);

export default Routes;
