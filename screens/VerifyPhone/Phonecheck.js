import React, { useState, useEffect } from 'react';
import { Button, TextInput, Text, Image, View, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground,Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { formatNumber } from "libphonenumber-js";
import PhoneInput, { formatPhoneNumber } from 'react-native-phone-input'
import IntlPhoneInput from 'react-native-intl-phone-input';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CustomButton from 'apsl-react-native-button'
const Phonecheck = ({ route, navigation }) => {
    const { email } = route.params;

    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    const [phone, setPhone] = useState();

    const CELL_COUNT = 6;

    const phonenumberr = 1;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    // Handle the button press    

    const raw = JSON.stringify({
        "username": email,
        "password": 123456,
        "phone": phone
    });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
        redirect: 'follow'
    };
    async function confirmCode() {
        try {
            await confirm.confirm(value);
            fetch("http://10.0.2.2:8080/api/login", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error)),
                navigation.navigate('MainTabScreen');

                Alert.alert("Mã xác thực đúng","Giờ bạn có thể đặt mua các món ăn")
        } catch (error) {
            Alert.alert("Mã xác thực sai","Vui lòng kiểm tra lại mã và nhập lại")
        }

    }

    async function signInWithPhoneNumber() {

        const confirmation = await auth().signInWithPhoneNumber(phone);
        setConfirm(confirmation);

    }
    if (!confirm) {

        return (
            <>
                <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>

                    <SafeAreaView style={styles.root}>

                        <Text style={styles.title}>Kiểm tra số điện thoại</Text>          
                        <Image
                            source={require('../../assets/verify.png')}
                            style={{
                                width: 125,
                                height: 125,
                            }}
                        />
                        
                       
                        <Text style={{ color: 'black', fontSize: 17 }}>Điền số điện thoại cần xác thực</Text>
                        <Text style={{ color: 'black', fontSize: 17 }}>Mã xác nhận sẽ được gửi đến điện thoại của bạn</Text>
                        <PhoneInput
                            style={{ justifyContent: 'center', textAlign: 'center', }}
                            placeholder=""
                            value={phone}
                            maxLength={12}
                            defaultCountry="US"
                            onChangePhoneNumber={(text: string) => setPhone(text)} />
                        
                        <TouchableOpacity style={{ borderRadius: 15, height: 42, width: 150, marginTop: 35, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                            signInWithPhoneNumber()
                        }>
                            <Text style={{ color: 'white', fontSize: 18 }}>Xác thực</Text>
                        </TouchableOpacity>


                    </SafeAreaView>
                </ImageBackground>
            </>
        );
    }

    return (
        <>
            <ImageBackground source={require('../../assets/BG.png')} style={styles.image}>

                <SafeAreaView style={styles.root}>

                    <Text style={styles.title}>Xác thực mã </Text>
                    <Image
                        source={require('../../assets/verify.png')}
                        style={{
                            width: 150,
                            height: 150,
                        }}
                    />
                    <Text style={{ color: 'black', fontSize: 17 }}>Điền mã xác thực</Text>
                    <Text style={{ color: 'black', fontSize: 17 }}>Mã gửi tới điện thoại có thể mất 30s tới 1 phút</Text>
                    <CodeField                                     
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <TouchableOpacity style={{ borderRadius: 15, height: 42, width: 150, marginTop: 35, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                        confirmCode()
                    }>
                        <Text style={{ color: 'white', fontSize: 15 }}>Xác thực</Text>
                    </TouchableOpacity>

                </SafeAreaView>

            </ImageBackground>
        </>
    );
}

export default Phonecheck;

const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: 50,
    },
    image: {
        flex: 1,

    },
    root: {
        flex: 1, padding: 20, alignItems: "center",
        justifyContent: "center"
    },
    title: { textAlign: 'center', fontSize: 30, marginBottom: 35 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        marginRight: 5,
    },
    focusCell: {
        borderColor: '#000',
    },
})