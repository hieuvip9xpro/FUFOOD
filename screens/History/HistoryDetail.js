import React, { useRef, useState } from 'react';
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
    Alert,
    TextInput,
} from 'react-native';
import HeaderImageScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import StarRating from 'react-native-star-rating';
import { ImageBackground } from 'react-native';
const MIN_HEIGHT = 55;
const MAX_HEIGHT = 350;

export default class HistoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5,
            data: {}
        };
    }
    componentDidMount() {

        const myHeaders = new Headers({
            "Authorization": "Basic " + Base64.btoa(this.props.route.params.email + ':123456'),
            "Content-Type": "application/json"
        });
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch('http://10.0.2.2:8080/api/member/get', requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson });
            })

    }

    onStarRatingPress(rating) {
        const { data } = this.state;
        const { navigation } = this.props;
        this.setState({
            starCount: rating
        });

        const raw = JSON.stringify({
            "starNumber": rating,
            "reviewDate": "ok",
            "productDTO": {
                "id": this.props.route.params.productid
            },
            "userDTO": {
                "id": data.id
            }
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };
        fetch("http://10.0.2.2:8080/api/member/review", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        Alert.alert("Cảm ơn bạn đã đánh giá món ăn","Bạn vẫn có thể đánh giá lại món ăn nếu bạn đổi ý")
        navigation.navigate('MainTabScreen');
    }

    render() {


        return (
            <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>

                <ScrollView>

                    <View style={styles.container}>

                        <Text style={[
                            styles.nunitoRegular, { color: "black", padding: 20, textAlign: "center" }]}>Chi tiết hóa đơn số: {this.props.route.params.itemData.id}</Text>
                        <View style={[styles.reviewContainer, styles.shadow]}>

                            <Text style={styles.imageTitle}>Tên món ăn: {this.props.route.params.productname}</Text>
                            <Text style={styles.imageTitle}>Tổng giá tiền: {this.props.route.params.itemData.priceTotal} VNĐ</Text>
                            <Text style={styles.imageTitle}>Ngày đặt mua: {this.props.route.params.itemData.createDate}</Text>
                            <Text style={styles.imageTitle}>Tại nhà hàng: {this.props.route.params.itemData.retauranName}</Text>
                            <Text style={styles.imageTitle}>Gửi tới địa chỉ: {this.props.route.params.productaddress}</Text>
                        </View>
                        <View style={[styles.reviewContainer, styles.shadow]}>
                            <Text style={styles.imageTitle}>Đánh giá món ăn</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    </View>

                </ScrollView>
            </ImageBackground>
        );
    }
};

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
        marginTop: 160,
        flex: 1,
    },
    image: {
        flex: 1,
    },
    swipecontainer: {
        height: 400,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        marginRight: 25,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    categoryContainer: {
        flexDirection: 'row',
        backgroundColor: '#FF6347',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    category: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    },
    titleContainer: {
        flex: 1,

    },
    til: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 5,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
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
        backgroundColor: "#FFFFFF"
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
        borderRadius: 15,
        elevation: 2,
        backgroundColor: "#fff",
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center"
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
});
