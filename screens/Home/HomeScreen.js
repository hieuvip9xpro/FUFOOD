import React, { Fragment, Component } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Button,
  SectionList,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Swiper from 'react-native-swiper'
import { SearchBar } from 'react-native-elements';
import StarRating from '../../components/StarRating';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomButton from 'apsl-react-native-button'
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: {}
    };
  }
  componentDidMount() {
    const myHeaders = new Headers({
      "Authorization": "Basic " + Base64.btoa(this.props.route.params.email + ':123456'),
      "Content-Type": "application/json"
    });
    const requestOptions1 = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://10.0.2.2:8080/api/member/get", requestOptions1)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ user: responseJson });
        if(!responseJson.phone)  Alert.alert('Đây là lần đầu bạn đăng nhập','Vui lòng thêm số điện thoại tại chi tiết hồ sơ để có thể đặt hàng')
      })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow'
    };

    fetch('http://10.0.2.2:8080/api/product/search', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson });
      })

  }


  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    return (

      <View style={styles.container}>

        <ScrollView>
          <View style={styles.swipecontainer}>
            <Swiper autoplay horizontal={true} activeDotColor="#fff" style={styles.wrapper} showsButtons={true}>
              <View style={styles.slide}>
                <Image
                  source={require('../../assets/aaa.jpg')}
                  resizeMode="cover"
                  style={styles.slideimage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require('../../assets/Food-Order-banner-1024x576.jpg')}
                  resizeMode="cover"
                  style={styles.slideimage}
                />
              </View><View style={styles.slide}>
                <Image
                  source={require('../../assets/images.jpg')}
                  resizeMode="cover"
                  style={styles.slideimage}
                />
              </View>
            </Swiper>
          </View>
          <View style={{ marginLeft: 40, flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', }}>
            <TouchableOpacity style={{ borderRadius: 15, height: 42, width: 150, marginTop: 5, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
              navigation.navigate("ListSearchByRestaurant", {
                email: this.props.route.params.email
              })
            }>
              <Text style={{ color: 'white', fontSize: 15 }}>Món theo nhà hàng</Text>
            </TouchableOpacity>
            <View style={{ flex: 0.5 }} />

            <TouchableOpacity style={{ borderRadius: 15, height: 42, width: 150, marginTop: 5, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
              navigation.navigate("ListSearchByCategory", {
                email: this.props.route.params.email
              })
            }>
              <Text style={{ color: 'white', fontSize: 15 }}>Món theo loại</Text>
            </TouchableOpacity>

          </View>

          <View
            style={{ flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap" }}
          >
            {data.map((item, i) => (
              <View key={i} >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CardItemDetails", {
                      itemData: item,
                      email: this.props.route.params.email
                    })
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                      <Image
                        source={{
                          uri: "http://10.0.2.2:8080/download?avatar=" + item.image,
                        }}
                        resizeMode="cover"
                        style={styles.cardImg}
                      />
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>Tên món: {item.name}</Text>
                      <Text style={styles.cardDetails}>Tên nhà hàng: {item.restaurName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

        </ScrollView>
      </View >
    );
  }
}
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
  },
  btn: {

  },
  swipecontainer: {
    height: 200,
    width: '95%',
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  slideimage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  search: {
    height: 50,
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  card: {
    height: 120,
    marginTop: 10,
    width: 180,
    marginLeft: 16,
  },

  cardImg: {
    marginLeft: 5,
    height: 70,
    width: 175,
    alignSelf: 'center',


  },
  cardInfo: {
    flex: 2,
    marginLeft: 5,
    padding: 3,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

});
