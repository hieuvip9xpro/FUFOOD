import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/Card';

const DetailSearchByRestaurant = ({ route, navigation }) => {
    const [data, setData] = useState([]);

    const { id } = route.params

    const { email } = route.params

    useEffect(() => {
        const myHeaders = new Headers({
            "Authorization": "Basic " + Base64.btoa(email + ':123456'),

        });
        const formdata = new FormData();
        formdata.append("page", 0)
        formdata.append("perPage", 100)
        formdata.append("createBy", id.id);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };


        fetch('http://10.0.2.2:8080/api/product/search/by/restaurant', requestOptions)
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
                ]} > Món ăn theo danh sách nhà hàng tên: {"\n"}{id.restaurantDTO.name}
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default DetailSearchByRestaurant;

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
});
