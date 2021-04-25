import React, { useState, useEffect } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
    FlatList,
    Image,
    ImageBackground,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const History = ({ route, navigation }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const { email } = route.params
 
    useEffect(() => {
        const myHeaders = new Headers({
            "Authorization": "Basic " + Base64.btoa(email + ':123456'),
        });
        let formData = new FormData()
        formData.append("page", 0)
        formData.append("perPage", 100)
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };

        fetch("http://10.0.2.2:8080/api/member/bill/search", requestOptions)
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
        <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>

            <ScrollView style={styles.scroll} >
                <View style={styles.headerContainer}>
                    <Text
                        style={[
                            styles.nunitoRegular,
                            { color: "black", padding: 20, textAlign: "center" }
                        ]}
                    >
                        Danh sách lịch sử mua hàng
</Text>
                    {data.map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.row, styles.reviewContainer, styles.shadow]}
                            onPress={() =>
                                navigation.navigate("HistoryDetail", {
                                    itemData: item,
                                    email: email,
                                    productid: data[i].billProductDTO[0].productDTO.id,
                                    productname: data[i].billProductDTO[0].productDTO.name,
                                    productaddress: data[i].billProductDTO[0].address,
                                })}>
                            <View style={styles.card}>
                                <Text style={styles.telNumberText}>Số thứ tự hóa đơn: {item.id}</Text>
                                <Text style={styles.telNumberText}>Tên nhà hàng: {item.retauranName}</Text>
                                <Text style={styles.telNumberText}>Ngày đặt món ăn: {item.createDate}</Text>
                                {item.billProductDTO.map((bill, i) => (
                                    <Text key={i} style={styles.telNumberText}>Tên món ăn đã đặt: {bill.productDTO.name}</Text>
                                ))}
                            </View>
                            <Ionicons
                                name="md-arrow-forward-outline"
                                size={30}
                                style={{ alignSelf: "center", marginRight: 4 }}
                            />
                        </TouchableOpacity>

                    ))}

                </View>
            </ScrollView >
        </ImageBackground>
    )
}
export default History

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

    headerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        flex: 1,

    },
    headerColumn: {
        color: 'black',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 19,
        lineHeight: 26,
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
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
        color: '#FFF',
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
        color: 'gray',
        fontSize: 30,
    },
    emailNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    emailNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    emailRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 16,
    },
    telNumberColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    telNumberText: {
        fontSize: 16,
        fontFamily: "Nunito-Regular"
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
    card: {
        height: 120,
        marginTop: 10,
        width: '90%',
        marginLeft: 16,
    },
    row: {
        flexDirection: "row"
    },
    dotsContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 48,
        right: 0,
        left: 0
    },
    dots: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 5,
        backgroundColor: "#fff"
    },
    contentHeader: {
        padding: 32,
        backgroundColor: "#fcfcfc",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -18
    },
    avatar: {
        // position: "absolute",
        // bottom: 8,
        // right: 18,
        width: 36 * 2,
        height: 36 * 2,
        borderRadius: 36
    },
    reviewAvatar: {
        width: 24 * 2,
        height: 24 * 2,
        borderRadius: 24
    },
    shadow: {
        shadowColor: "#525257",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.24,
        shadowRadius: 5,
        elevation: 2
    },
    title: {
        fontSize: 24,
        color: "#525257"
    },
    description: {
        fontSize: 14,
        color: "#525257"
    },
    nunitoBlack: {
        fontFamily: "Nunito-Black"
    },
    nunitoRegular: {
        fontFamily: "Nunito-Regular",
        fontSize: 25,
    },
    rating: {
        marginTop: 12,
        justifyContent: "space-between"
    },
    reviewText: { marginLeft: 8, color: "#525257", fontSize: 14 },
    priceText: { color: "#3DCC8E", fontSize: 20 },
    textContainer: {
        marginTop: 6,
        justifyContent: "space-between"
    },
    regularGray: { color: "#525257", fontSize: 14 },
    smallGray: { color: "#525257", fontSize: 12 },
    titleText: {
        marginTop: 25,
        color: "#525257",
        fontSize: 24,
        marginBottom: 5
    },
    reviewContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
        marginVertical: 10,
        borderColor: '#FF6347',
        borderWidth: 1,
    },
    reviewImageContainer: {
        flex: 1,
        padding: 22,
        alignItems: "center",
        justifyContent: "center"
    },
    reviewDate: { color: "#9DA3B4", fontSize: 12, paddingTop: 28 },
    buttonContainer: {

        bottom: 0,
        left: 0,
        right: 0,

        paddingHorizontal: 32,
        paddingBottom: 10,
        backgroundColor: "#fcfcfc"
        //flex: 0.1
    },
})