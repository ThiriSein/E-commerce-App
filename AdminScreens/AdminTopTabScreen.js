import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AdminShoes from './AdminShoe';
import AdminMen from './AdminMen';
import AdminWomen from './AdminWomen';
import AdminAccessories from './AdminAccessory';

const Tab = createMaterialTopTabNavigator();

const AdminTopTabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#174fe8',
      tabBarInactiveTintColor: '#848554',
      tabBarLabelStyle: { fontSize: 12, fontWeight: '900', },
      tabBarItemStyle: { width: 100 },
      tabBarStyle: { backgroundColor: '#f7d081' },
    }}>
      <Tab.Screen name='Man' component={AdminMen} />
      <Tab.Screen name='Woman' component={AdminWomen} />
      <Tab.Screen name='Shoe' component={AdminShoes} />
      <Tab.Screen name='Accessory' component={AdminAccessories} />

    </Tab.Navigator>
  )
}

export default AdminTopTabScreen

const styles = StyleSheet.create({})
