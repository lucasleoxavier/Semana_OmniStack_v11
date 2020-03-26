import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Detail from './pages/Detail';
import Incidents from './pages/Incidents';


const Appstack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Appstack.Navigator screenOptions={{headerShown: false}}>
                <Appstack.Screen name="Incidents" component={Incidents} />
                <Appstack.Screen name="Detail" component={Detail} />
            </Appstack.Navigator>
        </NavigationContainer>
    );
}