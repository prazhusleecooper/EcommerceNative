import React, { Component } from 'react';
import {Text, View, StyleSheet, Button, TextInput, ScrollView, FlatList, SafeAreaView} from 'react-native';
import {ScreenContainer} from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
// const ScreenContainer = ({ children }) =>{
//
// };


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

export class Home extends Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            /*<View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={styles.headingFlex}>
                    <View style={styles.headingSection}>
                        <Text style={styles.headingText}>
                            Home
                        </Text>
                        <View style={styles.TextInputSectionStyle}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Search"
                                underlineColorAndroid="transparent"
                            />
                            <Icon name='search' size={25} color='white' style={styles.searchIcon}/>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <Card style={styles.cardStyle}>
                        <Card.Title title='card-title' subtitle='card sub'/>
                        <Card.Content>
                            <Title>
                                Card TitlE
                            </Title>
                            <Paragraph>
                                The paragraph content
                            </Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions>
                            <Button  title='OK'/>
                        </Card.Actions>
                    </Card>
                </ScrollView>
                <View>
                    <Text>asfasgf</Text>
                </View>
            </View>
            </View>*/
                <View style={styles.primaryContainer}>
                    <View style={styles.headingFlexSection} >
                        <View style={styles.headingFlex}>
                            <View style={styles.headingSection}>
                                <Text style={styles.headingText}>
                                    Home
                                </Text>
                                <View style={styles.TextInputSectionStyle}>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        placeholder="Search"
                                        underlineColorAndroid="transparent"
                                    />
                                    <Icon name='search' size={25} color='white' style={styles.searchIcon}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <SafeAreaView style={styles.safeArea}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Text >{item.title}</Text>}
                        keyExtractor={item => item.id}
                    />
                    </SafeAreaView>
                </View>
        );
    }
};

const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
    },
    headingFlexSection: {
        flex: 1,
        width: '100%',
        flexWrap: 'wrap',
    },
    headingFlex: {
        width: '100%'
    },
    headingSection: {
        width: '100%',
        height: 120,
        backgroundColor: '#e5b700',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 23,
        color: '#fff',
        fontWeight: '900',
    },
    TextInputSectionStyle: {
        height: 45,
        width: '90%',
        borderRadius: 35 ,
        paddingHorizontal:15,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b38f00',
        borderColor: '#000',
    },
    textInputStyle: {
        flex:1,
        fontSize: 15,
        color: 'white',
    },
    searchIcon: {
        marginBottom: 5
    },
    cardStyle: {
        width: '45%'
    },
    sampleStyle: {
        position: 'relative',
    },
    itemsSection: {
        flex: 1,
        width: '100%',
        flexWrap: 'wrap',
        height: 100,
        marginTop: 0,
    },
    scrollview: {
        // paddingTop: 120,
        // position: 'relative',

    },
    safeArea: {
        height: '80%'
    }
});

