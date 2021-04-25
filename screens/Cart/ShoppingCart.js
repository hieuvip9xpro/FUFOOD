import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  Alert
} from 'react-native';


import { AppContext } from '../../components/GlobalContext';

import getSubTotal from '../../helpers/getSubTotal';
import { useNavigation } from '@react-navigation/native';

class ShoppingCart extends Component {

  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { address: '' }; // initialized here
  }
  cancel() {
    this.context.cart_items.length = [];
    this.props.navigation.navigate('MainTabScreen', {
      email: this.props.route.params.email,
    })
  }
  order() {

    const item = this.context.cart_items;

    const { address } = this.state;
    const email = this.props.route.params.email
    const myHeaders = new Headers({
      "Authorization": "Basic " + Base64.btoa(email + ':123456'),
      "Content-Type": "application/json"
    });



    for (let i = 0; i < item.length; i++) {
      const raw = JSON.stringify([
        {
          "unitPrice": item[i].price,
          "quantity": item[i].qty,
          "productDTO": {
            "id": item[i].id
          },
          "address": address
        }
      ]);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      if (address === "") {
        Alert.alert("Thông báo","Vui lòng nhập địa chỉ giao món ăn")
      }
      else {
        fetch("http://10.0.2.2:8080/api/member/order", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
        this.props.navigation.navigate('SuccessfulOrder', {
          email: email,
        })
        this.context.cart_items.length = [];
      }
    }



  };
  render() {
    const subtotal = getSubTotal(this.context.cart_items);
    const { address } = this.state;
    return (
      <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>

        <View style={styles.wrapper}>
          <Text style={{ fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Giỏ hàng</Text>
          <View style={styles.cartItemsContainer}>
            <FlatList
              data={this.context.cart_items}
              renderItem={this.renderCartItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          {subtotal > 0 && (
          <View style={styles.smallItemContainer}>
            <Text style={styles.labelText}>Giao tới: </Text>
            <TextInput style={styles.labelText} placeholder='Địa điểm giao món ăn ?' onChangeText={(address) => this.setState({ address })} />
          </View>
)}
          <View style={styles.lowerContainer}>
            <View style={styles.spacerBox} />

            {subtotal > 0 && (
              <View style={styles.paymentSummaryContainer}>
                <View style={styles.endLabelContainer}>
                  <Text style={styles.priceLabel}>Giá chưa bao gồm ưu đãi: </Text>

                  <Text style={styles.priceLabel}>Tổng giá tiền: </Text>
                </View>

                <View>
                  <Text style={styles.price}>{subtotal} VNĐ</Text>

                  <Text style={styles.price}>{subtotal} VNĐ</Text>
                </View>
              </View>
            )}
          </View>

          {subtotal == 0 && (
            <View style={styles.messageBox}>
              <Text style={styles.messageBoxText}>Giỏ hàng của bạn đang trống</Text>
            </View>
          )}

          {subtotal > 0 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{ borderRadius: 15, height: 50, width: 150, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                this.cancel()
              }>
                <Text style={{ color: 'white', fontSize: 20 }}>Hủy giỏ hàng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderRadius: 15, height: 50, width: 200, marginLeft: 50, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                this.order()
              }>
                <Text style={{ color: 'white', fontSize: 20 }}>Đặt hàng</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
  //

  renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItemContainer}>
        <View>

          <Text style={styles.priceLabel}>
            <Image
              source={{
                uri: "http://10.0.2.2:8080/download?avatar=" + item.image,
              }}
              style={{
                width: 25,
                height: 25,
              }}
            />
            {item.qty} x {item.name}

          </Text>
        </View>
        <View>
          <Text style={styles.price}>{item.price} VNĐ</Text>
        </View>
      </View>
    );
  };
}
//
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
  wrapper: {
    flex: 1,
  },
  addressSummaryContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  addressContainer: {
    padding: 10,
  },
  image: {
    flex: 1,

  },
  mapContainer: {
    width: 125,
    height: 125,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addressText: {
    fontSize: 16,
  },
  linkButtonContainer: {
    marginTop: 10,
  },
  linkButton: {
    color: '#0366d6',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  cartItemsContainer: {
    flex: 5,
    marginTop: 10,
  },
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  spacerBox: {
    flex: 2,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  paymentSummaryContainer: {
    flex: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 100,
  },
  endLabelContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  priceLabel: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 20,
    marginLeft: 25,

  },
  messageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4c90d4',
  },
  messageBoxText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

});

export default ShoppingCart;
