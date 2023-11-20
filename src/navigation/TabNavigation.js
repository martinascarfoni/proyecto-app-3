import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';
import Home from '../screens/home'
import Search from '../screens/Search'
import ProfilePropio from '../screens/ProfilePropio'
import NewPost from '../screens/NewPost'
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='purple' />
        }}
        />
        <Tab.Screen 
        name='Posteo nuevo' 
        component={NewPost}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <MaterialIcons name="photo-camera" size={27} color="purple" />
        }}
        />
        <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
            tabBarIcon: ()=> <MaterialIcons name="search" size={30} color="purple" />
        }}
        />
        <Tab.Screen 
        name='Perfil' 
        component={ProfilePropio}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <MaterialIcons name="person" size={30} color="purple" />
        }}
        />

        
    </Tab.Navigator>
  )
}