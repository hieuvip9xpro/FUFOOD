import React, { useRef, useState, useEffect } from 'react';
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
    Alert

} from 'react-native';
import HeaderImageScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input'
import { useNavigation } from '@react-navigation/native';
import StarRating from '../../components/StarRating';
import { add, result } from 'lodash';
import { SimpleStepper } from 'react-native-simple-stepper';
import { AppContext } from '../../components/GlobalContext';

const { width, height } = Dimensions.get("window");
export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: [],
            average: [],
            address: '',

        };
    }


    static contextType = AppContext;

    state = {
        qty: 1,
    };
    qtyChanged = value => {
        const nextValue = Number(value);
        this.setState({ qty: nextValue });
    };
    addToCart = (item, qty) => {
        Alert.alert(
            'Đã thêm vào giỏ hàng',
            `${qty} ${item.name} Được thêm vào giỏ hàng`,
        );
        console.log(qty)
        this.context.addToCart(item, qty);
    };

    componentDidMount() {
        const email = this.props.route.params.email
        const myHeaders1 = new Headers({
            "Authorization": "Basic " + Base64.btoa(email + ':123456'),
        });
        const formdata = new FormData();
        formdata.append("id", this.props.route.params.itemData.id);

        const requestOptions1 = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
        };
        const requestOptions2 = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://10.0.2.2:8080/api/member/review/total", requestOptions1)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({ total: responseJson });
            })
        fetch("http://10.0.2.2:8080/api/member/review/average", requestOptions1)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({ average: responseJson });
            })
        fetch("http://10.0.2.2:8080/api/list/member/review/", requestOptions1)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson });
            })
    }

    render() {
        const { data } = this.state;
        const { total } = this.state;
        const { average } = this.state;
        const { itemData } = this.props.route.params.itemData
        const { qty } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 44 }}
                >

                    <View style={styles.container}>
                   
                        < View style={[{ padding: 7, alignItems: 'flex-end',flexDirection: 'row', }]} >
                            <Text style={{ fontSize: 30, marginRight:145 }}>Thông tin chi tiết</Text>
                            <Icon onPress={() => this.props.navigation.navigate('ShoppingCart', {
                                email: this.props.route.params.email
                            })} name="ios-cart" size={30} />
                        </ View>
                        <View style={styles.container}>
                            <Image
                                source={{ uri: 'http://10.0.2.2:8080/download?avatar=' + this.props.route.params.itemData.image }}
                                resizeMode="cover"
                                style={{ width, height: width }}
                            />
                        </View>
                    </View>
                    <View style={[styles.container, styles.contentHeader]}>
                        <Text style={[styles.title, styles.nunitoBlack]}>
                            {this.props.route.params.itemData.name}
                        </Text>
                        <View style={[styles.row, styles.rating]}>
                            <View style={[styles.row, { alignItems: "center" }]}>
                                <StarRating ratings={average} reviews={total + " Lượt đánh giá"} />
                            </View>
                            <Text style={[styles.nunitoBlack, styles.priceText]}>
                                {this.props.route.params.itemData.price} VNĐ
                            </Text>
                        </View>


                        <View style={[styles.row, styles.textContainer]}>

                            <View style={styles.row}>
                                <Ionicons
                                    name="ios-timer"
                                    size={16}

                                    style={{ alignSelf: "center", marginRight: 4 }}
                                />
                                <Text style={[styles.nunitoRegular, styles.smallGray]}>
                                    Dự kiến 20 phút đến nơi giao hàng
                </Text>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <View>
                                <Text style={[
                                    styles.nunitoRegular,]}>
                                    Bởi nhà hàng: {this.props.route.params.itemData.restaurName}
                                </Text>
                                <Text style={[
                                    styles.nunitoRegular,]}>
                                    Số diện thoại liên lạc: {this.props.route.params.itemData.restaurPhone}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={[styles.nunitoBlack, styles.titleText]}>Thông tin món ăn</Text>
                        <Text style={[styles.description, styles.nunitoRegular]}>
                            {this.props.route.params.itemData.description.split("").slice(0, 180)}
                        </Text>

                        <Text style={[styles.titleText, styles.nunitoBlack]}>Đánh giá</Text>

                        {data.length > 0 ? (
                            data.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={[styles.row, styles.reviewContainer, styles.shadow]}
                                    >
                                        <View style={styles.reviewImageContainer}>
                                            <Text>ID: {item.id}</Text>
                                            <Image
                                                style={styles.reviewAvatar}
                                                source={{ uri: 'http://10.0.2.2:8080/download?avatar=' + this.props.route.params.itemData.image }}
                                            />
                                            <Text
                                                style={[
                                                    styles.nunitoRegular,
                                                    styles.smallGray,
                                                    { marginTop: 3 }
                                                ]}
                                            >
                                                {item.userDTO.name}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                flex: 5,
                                                paddingVertical: 22,
                                                paddingHorizontal: 6
                                            }}
                                        >
                                            <Text style={[styles.nunitoRegular, styles.regularGray]}>
                                                <StarRating ratings={item.starNumber} />
                                            </Text>
                                            <Text style={[styles.nunitoRegular, styles.reviewDate]}>
                                                {item.reviewDate}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })
                        ) : (
                            <Text
                                style={[
                                    styles.nunitoRegular,
                                    { color: "black", padding: 20, textAlign: "center" }
                                ]}
                            >
                                Chưa có đánh giá nào về món ăn này cả.
                            </Text>
                        )}
                    </View>


                </ScrollView>
                <View style={styles.buttonContainer}>
                    <View style={styles.itemContainer}>
                        <SimpleStepper
                            valueChanged={value => this.qtyChanged(value)}
                            initialValue={1}
                            minimumValue={1}
                            maximumValue={10}
                            showText={true}
                            containerStyle={styles.stepperContainer}
                            incrementImageStyle={styles.stepperButton}
                            decrementImageStyle={styles.stepperButton}
                            textStyle={styles.stepperText}
                        />
                    </View>
                    <Button
                        onPress={() => {
                            this.addToCart(this.props.route.params.itemData, qty);
                        }}
                        title="Thêm vào giỏ hàng"
                        color="#FF6347"
                    />
                </View>
            </View>
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
    },

    stepperContainer: {
        backgroundColor: '#FF6347',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: '#ccc',
    },
    itemContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    smallItemContainer: {
        marginBottom: 5,
        alignItems: 'center',
    },
    smallItemContainer1: {
        marginBottom: 5,
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    subText: {
        fontSize: 15,
        color: '#3a3a3a',
        alignItems: 'center',
    },
    subText1: {
        fontSize: 15,
        color: '#3a3a3a',
        marginLeft: 15,
    },
    priceText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    labelText: {
        fontSize: 18,
        color: '#303540',
    },
    stepperButton: {
        height: 20,
        width: 20,
    },
    stepperText: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        flex: 1
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
        fontFamily: "Nunito-Regular"
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
        borderRadius: 7,
        elevation: 2,
        backgroundColor: "#fff",
        marginVertical: 5
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
