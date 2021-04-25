
import React, { useState, useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet, StatusBar, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,

} from 'react-native-paper';
import HomeScreen from '../Home/HomeScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import Profile from '../Profile/Profile';
import History from '../History/History';
import CardItemDetails from '../ListOfItem/CardItemDetails';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { SearchBar } from 'react-native-elements';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();

const Tab = createBottomTabNavigator();
const MainTabScreen = ({ route }) => {

  const navigation = useNavigation();
  const { username, email, photo, id, givenname } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myHeaders = new Headers({
      "Authorization": "Basic " + Base64.btoa(email + ':123456'),
      "Content-Type": "application/json"
    });
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://10.0.2.2:8080/api/member/get", requestOptions)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      });
  }, []);

  if (loading) return <View><Text
    style={[
      styles.nunitoRegular,
      { color: "black", padding: 20, textAlign: "center" }
    ]}
  >
    Loading . . .
</Text></View>
  return (

    <Tab.Navigator initialRouteName="Home" >
      <Tab.Screen
        name="Trang chủ"
        component={HomeStackScreen}
        initialParams={{
          id: id,
          givenname: givenname,
          username: username,
          email: email,
          photo: photo
        }}
        options={{

          tabBarColor: '#eb4034',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />


      <Tab.Screen
        name="Hồ sơ"
        component={ProfileStackScreen}
        initialParams={{
          id: id,
          givenname: givenname,
          username: username,
          email: email,
          photo: photo
        }}
        options={{

          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}

      />

    </Tab.Navigator>
  )
}

export default MainTabScreen;



const HomeStackScreen = ({ route, navigation }) => (
  <HomeStack.Navigator screenOptions={{

  }}>
    <HomeStack.Screen name="Home" initialParams={{ id: route.params.id, email: route.params.email }} component={HomeScreen} options={{

      headerRight: () => (
        < View style={[{ padding: 5 }, styles.iconContainer]} >
          <Icon onPress={() => navigation.navigate('ShoppingCart', {
            email: route.params.email
          })} name="ios-cart" size={30} />
        </View >

      ),
      headerLeft: () => (
        <View style={{ marginLeft: 15 }}>
          <Avatar.Image
            source={{ uri: route.params.photo }}
            size={50}
          />
        </View>
      ),
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15 }}>Xin chào bạn: {route.params.username}</Text>
        </View>
      )
    }}
    />
    <HomeStack.Screen name="CardItemDetails" initialParams={{ email: route.params.email }} component={CardItemDetails} options={{
      headerShown: false
    }}
    />

  </HomeStack.Navigator>
);
const ProfileStackScreen = ({ route, navigation }) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="ProfileScreen" initialParams={{
      id: route.params.id,
      givenname: route.params.givenname,
      username: route.params.username,
      email: route.params.email,
      photo: route.params.photo
    }} component={ProfileScreen} options={{
      headerShown: false
    }
    } />

    <ProfileStack.Screen name="Profile" initialParams={{
      id: route.params.id,
      givenname: route.params.givenname,
      username: route.params.username,
      email: route.params.email,
      photo: route.params.photo
    }} component={Profile} options={{
      headerShown: false
    }} />


    <ProfileStack.Screen name="History" initialParams={{
      email: route.params.email
    }} component={History} options={{
      headerShown: false
    }} />

  </ProfileStack.Navigator>
);
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input = '') => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3 / 4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    paddingLeft: 20, paddingTop: 10, marginRight: 5
  },
  nunitoRegular: {
    fontFamily: "Nunito-Regular",
    fontSize: 25,
},
});