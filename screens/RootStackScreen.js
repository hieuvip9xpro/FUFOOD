import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login/Login';
import MainTabScreen from './Home/MainTabScreen';
import ProfileScreen from './Profile/ProfileScreen';
import Profile from './Profile/Profile';
import History from './History/History';
import Phonecheck from './VerifyPhone/Phonecheck';
import CardItemDetails from './ListOfItem/CardItemDetails';
import SuccessfulOrder from './Success/SuccessfulOrder';
import Payment from './Payment/Payment';
import HistoryDetail from './History/HistoryDetail';
import ListSearchByRestaurant from './SearchBy/ListSearchByRestaurant';
import ListSearchByCategory from './SearchBy/ListSearchByCategory';
import DetailSearchByCategory from './ListOfItem/DetailSearchByCategory';
import DetailSearchByRestaurant from './ListOfItem/DetailSearchByRestaurant';
import ShoppingCart from './Cart/ShoppingCart';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode='none'>    
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="MainTabScreen" component={MainTabScreen} />
        <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />       
        <RootStack.Screen name="Profile" component={Profile} />       
        <RootStack.Screen name="History" component={History} />     
        <RootStack.Screen name="CardItemDetails" component={CardItemDetails} />  
        <RootStack.Screen name="HistoryDetail" component={HistoryDetail} />  
        <RootStack.Screen name="SuccessfulOrder" component={SuccessfulOrder} />  
        <RootStack.Screen name="Payment" component={Payment} />  
        <RootStack.Screen name="Phonecheck" component={Phonecheck} />  
        <RootStack.Screen name="ListSearchByRestaurant" component={ListSearchByRestaurant} />  
        <RootStack.Screen name="ListSearchByCategory" component={ListSearchByCategory} />  
        <RootStack.Screen name="DetailSearchByCategory" component={DetailSearchByCategory} />
        <RootStack.Screen name="ShoppingCart" component={ShoppingCart} />
        <RootStack.Screen name="DetailSearchByRestaurant" component={DetailSearchByRestaurant} />          
    </RootStack.Navigator>
);

export default RootStackScreen;