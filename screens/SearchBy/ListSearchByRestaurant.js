import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet,TouchableOpacity, ImageBackground } from 'react-native';
import Card from '../../components/Card';

const ListSearchByRestaurant = ({ route, navigation }) => {
  const [data, setData] = useState([]);

  const { email } = route.params

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

    fetch('http://10.0.2.2:8080/api/restaurant/search', requestOptions)
      .then(response => response.json())
      .then(data => {
        setData(data)
      });
  }, [])
  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() => navigation.navigate("CardItemDetails", {
          itemData: item,
          email: email
        })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.nunitoRegular,
          { color: "black", padding: 20, textAlign: "center" }
        ]} > Danh sách các nhà hàng
            </Text>
      {data.map((item, i) => (
        <TouchableOpacity key={item.id.toString()} onPress={() =>
          navigation.navigate("DetailSearchByRestaurant", {
            id: item,
            email: email
          })
        }>
          <ImageBackground
            style={[styles.card]}
            source={require('../../assets/a.jpg')}
          >
            <Text style={styles.cardTitle}>{item.restaurantDTO.name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      ))
      }
    </View>
  );
};

export default ListSearchByRestaurant;

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
    width: '90%',
    alignSelf: 'center'
},
nunitoRegular: {
    fontFamily: "Nunito-Regular",
    fontSize: 25,
},
cardTitle: {
    fontFamily: "Nunito-Regular",
    fontSize: 25,
    color: '#fff'
},
card: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

},
});
