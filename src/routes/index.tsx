import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchPage from "../pages/search";


const Stack = createNativeStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen name="Search" component={SearchPage} />
  </Stack.Navigator>
);

export default Routes;
