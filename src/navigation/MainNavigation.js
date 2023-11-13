import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Register from "../screens/Register"
import Login from "../screens/Login"
import Comments from "../screens/Comments"
import TabNavigation from "./TabNavigation"
import ProfileUsuarios from "../screens/ProfileUsuarios"
import InfoAdicionalUser from '../screens/InfoAdicionalUser'

const stack = createNativeStackNavigator()

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} />

        <stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }} />

        <stack.Screen 
            name="TabNavigation" 
            component={TabNavigation} 
            options={{ headerShown: false }} />
        
        <stack.Screen 
        name = 'Comments'
        component={Comments}
        />

      <stack.Screen 
        name = 'ProfileUsuarios'
        component={ProfileUsuarios}
        />

      <stack.Screen 
        name = 'InfoAdicionalUser'
        component={InfoAdicionalUser}
        options={{
          headerShown: false
        }}
        />


      </stack.Navigator>
    </NavigationContainer>
  )
}

