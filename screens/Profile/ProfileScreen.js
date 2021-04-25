import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,

} from 'react-native-paper';
import emails from 'react-native-email'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { useState, useEffect } from 'react';



const ProfileScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { username } = route.params;
  const { email } = route.params;
  const { photo } = route.params;

  const unquotedname = username.replace(/"([^"]+)":/g, '$1:');
  const unquotedemail = email.replace(/"([^"]+)":/g, '$1:');
  const unquotedphoto = photo.replace(/"([^"]+)":/g, '$1:');


  const [userInfo, setUserInfo] = useState(null);



  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '397714499801-2cjfnnqs42db2pes8h64au99ft9pvftu.apps.googleusercontent.com',
    });
  }, []);



  const signOut = async () => {
    // Remove user session from the device.
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      navigation.navigate('Login')
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>

      <View style={styles.container}>
        <View style={styles.InfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
            <Avatar.Image
              source={{ uri: unquotedphoto }}
              size={120}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title]}>{unquotedname}</Title>
              <Caption style={styles.caption}>{id}</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>

        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => navigation.navigate('Payment')}>
            <View style={styles.menuItem}>
              <Icon name="md-wallet" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Phương thức thanh toán</Text>
            </View>
          </TouchableRipple>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <View style={styles.menuItem}>
              <Icon name="md-pricetag" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Lịch sử mua hàng</Text>
            </View>
          </TouchableOpacity>
          <TouchableRipple onPress={handleEmail}>
            <View style={styles.menuItem}>
              <Icon name="ios-save" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Góp ý hệ thống</Text>
            </View>
          </TouchableRipple>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.menuItem}>
              <Icon name="person" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Chi tiết hồ sơ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut}>
            <View style={styles.menuItem}>
              <Icon name="exit" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Thoát</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View >
    </ImageBackground>
  );
};

const handleEmail = () => {
  const to = ['hieuvmhe130992@fpt.edu.vn']
  emails(to, {
    subject: 'Tên tiêu đề',
    body: 'Nhập ý kiến của bạn'
  }).catch(console.error)
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  image: {
    flex: 1,

},
  acontain: {
    height: 400,
    backgroundColor: 'gray',
    width: '95%',
    marginTop: 10,

    alignSelf: 'center',
    borderRadius: 8,
  },
  abc: {
    marginTop: 50,
    marginLeft: 25,
    fontSize: 25,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: 'black',
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 26,
  },
  title: {
    color: 'black',
    marginTop: 25,
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 26,
  },
  caption: {
    color: 'black',
    fontWeight: '600',
    marginTop: 10,
    fontSize: 18,
    lineHeight: 26,
  },
  InfoSection: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 2,
    padding: 7,
    backgroundColor: "#FF6347",

  },
});
