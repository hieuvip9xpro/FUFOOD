import React from 'react';
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
    ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
export default class Success extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>

                <View style={styles.container}>
                    <TouchableOpacity style={{ marginTop: 200 ,justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.menuItemText}>Hiện tại chỉ có thể thanh toán </Text>
                        <Text style={styles.menuItemText}>bằng tiền mặt</Text>
                    </TouchableOpacity>
                    <LottieView source={require('../../assets/4261-cash-money-euro.json')} autoPlay loop />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        flex: 1,

    },
    menuItemText: {
        fontSize: 25,
     
    },
});