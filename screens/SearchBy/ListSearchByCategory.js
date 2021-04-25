import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, SectionList, TouchableOpacity, ImageBackground, } from 'react-native';

const ListSearchByCategory = ({ route, navigation }) => {
    const [data, setData] = useState([]);      

    const { email } = route.params

    useEffect(() => {     
        const requestOptions = {
            method: 'POST',         
            redirect: 'follow'
        };

        fetch('http://10.0.2.2:8080/api/category/search', requestOptions)
            .then(response => response.json())
            .then(data => {
                setData(data)
            });  
    }, [])
    return (

        <View style={styles.container}>
            <Text
                style={[
                    styles.nunitoRegular,
                    { color: "black", padding: 20, textAlign: "center" }
                ]} > Danh sách các loại món ăn
            </Text>                                                     
            {data.map((item, i) => (                                    
                    <TouchableOpacity key={item.id.toString()} onPress={() =>    
                        navigation.navigate("DetailSearchByCategory", {
                            id: item,
                            email: email
                        })
                    }>                      
                        <ImageBackground
                            style={[styles.card]}
                            source={require('../../assets/a.jpg')}
                        >
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                ))
            }
        </View >
    );
};


export default ListSearchByCategory;

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
