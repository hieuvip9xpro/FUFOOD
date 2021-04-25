import React, { useState, useEffect } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from 'apsl-react-native-button'
const Profile = ({ route, navigation }) => {


  const { username } = route.params;
  const { email } = route.params;
  const { photo } = route.params;

  const unquotedname = username.replace(/"([^"]+)":/g, '$1:');
  const unquotedemail = email.replace(/"([^"]+)":/g, '$1:');
  const unquotedphoto = photo.replace(/"([^"]+)":/g, '$1:');

  const [data, setData] = useState({})
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
      .then(data => setData(data));
  }, [])

  if (data.phone) {

    return (
      <>
        <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>
          <ScrollView >
            <View style={styles.headerContainer}>
              <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={{ uri: unquotedphoto }}
              >
                <View style={styles.headerColumn}>
                  <Image
                    style={styles.userImage}
                    source={{ uri: unquotedphoto }}
                  />
                  <Text style={styles.userNameText}>{unquotedname}</Text>
                </View>
              </ImageBackground>
            </View>

            <Card containerStyle={styles.cardContainer}>
              <View style={styles.container}>
                <View style={styles.iconRow}>
                  <Icon

                    name="email"
                    iconStyle={styles.emailIcon}
                  />
                </View>
                <View style={styles.emailRow}>
                  <View style={styles.emailColumn}>
                    <Text style={styles.emailText}>{unquotedemail}</Text>
                  </View>

                </View>
              </View>
            </Card>

            <Card containerStyle={styles.cardContainer}>
              <View style={styles.container}>
                <View style={styles.iconRow}>
                  <Icon
                    name="call"
                    underlayColor="transparent"
                    iconStyle={styles.emailIcon}
                  />
                </View>
                <View style={styles.emailRow}>
                  <View style={styles.emailColumn}>
                  </View>
                  <View style={styles.emailNameColumn}>
                    <Text style={styles.emailText}>{data.phone}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </ScrollView >
        </ImageBackground>
      </>
    );
  }
  else {

    return (
      <>
        <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>
          <ScrollView >
            <View style={styles.headerContainer}>
              <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={{ uri: unquotedphoto }}
              >
                <View style={styles.headerColumn}>
                  <Image
                    style={styles.userImage}
                    source={{ uri: unquotedphoto }}
                  />
                  <Text style={styles.userNameText}>{unquotedname}</Text>
                </View>
              </ImageBackground>
            </View>

            <Card containerStyle={styles.cardContainer}>
              <View style={styles.container}>
                <View style={styles.iconRow}>
                  <Icon
                    name="email"
                    underlayColor="transparent"
                    iconStyle={styles.emailIcon}
                  />
                </View>
                <View style={styles.emailRow}>
                  <View style={styles.emailColumn}>
                    <Text style={styles.emailText}>{unquotedemail}</Text>
                  </View>

                </View>
              </View>
            </Card>

            <Card containerStyle={styles.cardContainer}>
              <View style={styles.container}>
                <View style={styles.iconRow}>
                  <Icon
                    name="call"
                    underlayColor="transparent"
                    iconStyle={styles.emailIcon}
                  />
                </View>
                <View style={styles.emailRow}>
                  <View style={styles.emailColumn}>
                  </View>
                  <View style={styles.emailNameColumn}>
                    <TouchableOpacity style={{ borderRadius: 15, height: 42, width: 150, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                      navigation.navigate("Phonecheck", {
                        email: email
                      })
                    }>
                      <Text style={{ color: 'white', fontSize: 15 }}>Thêm số điện thoại</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </Card>
          </ScrollView >
        </ImageBackground>
      </>
    );
  }
}
export default Profile

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
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 25,
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 55,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  image: {
    flex: 1,

  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
 
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: "#FF6347",
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: '#FF6347',
    fontSize: 16,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 18,
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  telIcon: {
    color: 'gray',
    fontSize: 30,
  },
})