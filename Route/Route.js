import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { NavigationContainer } from "@react-navigation/native";
import React,{Component} from 'react';
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'


const Bot = createBottomTabNavigator();
function Bottom() {
    return(
        <NavigationContainer>
            <Bot.Navigator 
            tabBarOptions={{
                tabStyle:{
                    backgroundColor:'#45ccf5',
                    borderColor:'rgba(235,119,52,1)'  ,           
                },
                activeTintColor:'#faf6eb',
                inactiveTintColor:'#fff8c9',
                labelStyle:{fontSize:13},
            }}>
                <Bot.Screen 
                name="Transaksi" 
                component={Home}
                options={{
                    tabBarIcon:
                    ({tintcolor})=>(
                        <AntDesign name="wallet" size={25} color='#faf6eb'/>
                    ),
                }}
                />
                <Bot.Screen name="History" component={Homes}
                 options={{
                    tabBarIcon:({tintcolor})=>(
                        <MaterialCommunityIcons name="history" size={25} color='#faf6eb'/>
                        
                    ),
                    
                }}/>
            </Bot.Navigator>
        </NavigationContainer>
    )
}
const Stack = createStackNavigator();
function Home() {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen 
            name="Transaksi" 
            component={HomeScreen}
            options={{
                headerTitleAlign:{
                    alignSelf: 'center',
                },
            }}
            />
            <Stack.Screen name="History" component={LinksScreen}/>
        </Stack.Navigator>
    )
}
function Homes() {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="History" component={LinksScreen}/>
            <Stack.Screen name="Transaksi" component={HomeScreen}/>
        </Stack.Navigator>
    )
}
export default Bottom