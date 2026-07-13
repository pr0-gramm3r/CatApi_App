import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import React from 'react'

const TabRoot = () => {
  return (
    <Tabs screenOptions={{headerStatusBarHeight: 5, headerTitleAlign: 'center', headerTintColor: '#00B2FF'}}>
        <Tabs.Screen name='index' options={{title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}/> 
        <Tabs.Screen name='profile' options={{title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}/>
    </Tabs>
  )
}

export default TabRoot