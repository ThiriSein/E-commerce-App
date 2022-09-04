import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AdminShoes from './AdminShoe';
import AdminMen from './AdminMen';
import AdminWomen from './AdminWomen';
import AdminAccessories from './AdminAccessory';
import AdminTrendList from './AdminTrendList';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const AdminTopTabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#174fe8',
      tabBarInactiveTintColor: '#848554',
      tabBarLabelStyle: { fontSize: 10, fontWeight: '900', },
      //tabBarItemStyle: { width: 80 },
      tabBarStyle: { backgroundColor: '#f7d081' },
      //tabBarOptions: { showLabel: false },
    }}>
      <Tab.Screen name='Man' component={AdminMen}
        
        options={{
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="man" color={'#000'} size={30} />
        ), }} />
      <Tab.Screen name='Woman' component={AdminWomen}
       options={{
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="woman" color={'#000'} size={30} />
          ),
        }}
      />
      <Tab.Screen name='Shoe' component={AdminShoes}
       options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shoe-heel" color={'#000'} size={30} />
          ),
        }}
      />
      <Tab.Screen name='Accessory' component={AdminAccessories}
       options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="necklace" color={'#000'} size={30} />
          ),
        }}/>
      <Tab.Screen name='TrendList' component={AdminTrendList}
       options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="basket" color={'#000'} size={30} />
          ),
        }}/>

    </Tab.Navigator>
  )
}
export default AdminTopTabScreen

const styles = StyleSheet.create({})
