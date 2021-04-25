import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
const Login = ({ navigation }) => {

  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '397714499801-2cjfnnqs42db2pes8h64au99ft9pvftu.apps.googleusercontent.com',
    });

  }, []);

  const getCurrentUserInfo = async () => {
    try {
      const info = await GoogleSignin.signInSilently();
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
        console.log("Unable to get user's info");
      }
    }
  };

  const signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      setUserInfo(userInfo);
      console.log(userInfo)
      const reg = /^[A-Za-z0-9._%+-]+@fpt.edu.vn$/;
      if (reg.test(userInfo.user.email) === true) {
        navigation.navigate('MainTabScreen', {
          id: userInfo.user.id,
          name: userInfo.user.givenName,
          username: userInfo.user.name,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
        })
      }
      else {
        Alert.alert('Thông báo','Bạn cần đăng nhập bằng tài khoản email của sinh viên với đuôi là @fpt.edu.vn')
        await GoogleSignin.signOut()
      }


    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log(error.message);
      }
    }
  };

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[styles.footer]} animation="fadeInUpBig">
        <Text style={[styles.title]}>App đặt đồ ăn tốt nhất Hòa Lạc</Text>

        <GoogleSigninButton
          style={{ width: 312, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />

      </Animatable.View>
    </View>

  );

};

export default Login;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold'


  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});