import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/Card';

const DetailSearchByCategory = ({ route, navigation }) => {
    const [data, setData] = useState([]);

    const { id } = route.params

    const { email } = route.params

    useEffect(() => {       
        const formdata = new FormData();
        formdata.append("id", id.id);
        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch('http://10.0.2.2:8080/api/product/cate', requestOptions)
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
                ]} > Món ăn theo danh sách {"\n"}{id.name}
            </Text>       
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default DetailSearchByCategory;

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
