import React, { useEffect, useState, Component } from 'react'
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import DrawerHome from '../DrawerScreens/DrawerHome';
import Products from '../DrawerScreens/Products';
import MyCart from '../DrawerScreens/MyCart';
import OrderDetail from '../DrawerScreens/OrderDetail';
import AboutUs from '../DrawerScreens/AboutUs';
import CustomDrawer from '../DrawerScreens/CustomDrawer';
import UserAccount from '../DrawerScreens/UserAccount'
import { CommonActions } from '@react-navigation/native'
import { firebase } from '../config';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function Home(navigation) {

    const isFocused = useIsFocused();


    function Logout({ navigation }) {

        useEffect(() => {
            firebase.auth().signOut();

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            )
        }, [isFocused])

        clear();

    }

    const clear = async () => {
        try {
            AsyncStorage.clear()
        } catch (e) {
            console.warn(e)
        }
    }


    return (
        <Drawer.Navigator initialRouteName="DrawerHome"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: "black",
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
            }} >
            <Drawer.Screen
                name="DrawerHome"
                component={DrawerHome}
                options={{
                    //headerShown: false,
                    title: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={'#f7d081'} size={30} />
                    ),
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerRight: () => <Image
                        style={{ width: 40, height: 40, borderRadius: 50, margin: 15, borderWidth: 1, borderColor: "#fff" }}
                        source={require('../assets/logo.png')}
                    />,
                }}
            />
            <Drawer.Screen
                name="Products"
                component={Products}
                options={({ navigation }) => ({
                    title: 'Products',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shopping" color={'#f7d081'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="cart"
                            style={{
                                fontSize: 30,
                                color: '#f7d081',
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate('MyCart')}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="MyCart"
                component={MyCart}
                options={{
                    title: 'MyCart',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-outline" color={'#f7d081'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                }}
            />
            <Drawer.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{
                    title: 'OrderDetail',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-list-outline" color={'#f7d081'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                }}
            />
            <Drawer.Screen
                name="UserAccount"
                component={UserAccount}
                options={{
                    title: 'Profile',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={'#f7d081'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },

                }}
            />

            <Drawer.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                    title: 'AboutUs',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information-outline" color={'#f7d081'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },

                }}
            />
            <Drawer.Screen
                name="Logout"
                component={Logout}
                options={{
                    title: 'Logout',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="logout" color={'#f7d081'} size={30} />
                    )
                }}
            />

        </Drawer.Navigator>
    );
}
