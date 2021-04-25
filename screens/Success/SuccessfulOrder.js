import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    StatusBar,
    Platform,
    ScrollView,
    Button,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
const SuccessfulOrder = ({ route, navigation }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const { email } = route.params
    useEffect(() => {

        const myHeaders = new Headers({
            "Authorization": "Basic " + Base64.btoa(email + ':123456'),
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch('http://10.0.2.2:8080/api/member/bill/search', requestOptions)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setLoading(false)
            });
    }, [])
    if (loading) return <View><Text
    style={[
        styles.nunitoRegular,
        { color: "black", padding: 20, textAlign: "center" }
    ]}
>
    Loading . . .
</Text></View>
    return (
        <View style={styles.container}>
            <View style={styles.swipecontainer}>
                <LottieView source={require('../../assets/21654-delivery-guy-order-pickup.json')} autoPlay loop />
            </View>
            <Text style={styles.menuItemText}>Đơn hàng của bạn đã được đặt thành công</Text>
            <Text style={styles.menuItemText}>Số điện thoại liên lạc {data[0].userDTO.phone}</Text>           
            
            <View style={{
                marginTop:25,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <TouchableOpacity style={{ borderRadius: 15, height: 42, width: 150, marginTop: 5, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                    navigation.navigate('MainTabScreen')
                }>
                    <Text style={{ color: 'white', fontSize: 15 }}>Quay lại trang chủ</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default SuccessfulOrder
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

    },
    swipecontainer: {
        height: 400,
        width: '100%',

        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    menuItemText: {
        color: 'black',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 19,
        lineHeight: 26,
    },
    bton: {
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    }
});
