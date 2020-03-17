import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, FlatList, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-paper';
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
    },
];

const categories = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        categoryTitle: 'Fruits',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        categoryTitle: 'Vegetables',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        categoryTitle: 'Appliances',
    },
];

export class Home extends Component{
    constructor(props) {
        super(props);
        console.log('THE APP HAS STARTED');
        this.state = {
            homeItems: [],
            homeCategories: [],
        }

    }

    // Rendering methods
    // Renders the products in the Home page
    homePageProducts = () => {
      if(this.state.homeItems !== [] || this.state.homeItems.length !== 0) {
          return(
              <FlatList
                  data={this.state.homeCategories}
                  renderItem={({ item }) =>
                      <SafeAreaView>
                          <View style={styles.yellowHR} />
                          <Text style={styles.productCategory}>{ item.categoryName }</Text>
                          <FlatList data={this.state.homeItems} renderItem={({ item }) =>
                              <SafeAreaView>
                                  <Card style={styles.cardStyle}>
                                      <Card.Content style={styles.cardTitleArea}>
                                          <Title style={styles.cardTitle}>
                                              { item.title }
                                          </Title>
                                      </Card.Content>
                                      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                                      <Card.Content style={styles.productDescriptionArea}>
                                          <Paragraph style={styles.productDescription}>
                                              { item.description }
                                          </Paragraph>
                                      </Card.Content>
                                      <View style={styles.cardHR} />
                                      <Card.Actions >
                                          <SafeAreaView>
                                              <Text style={styles.productPrice}>Rs.</Text>
                                              <Text style={styles.productPriceAmount}>{ item.price }</Text>
                                          </SafeAreaView>
                                          <Button
                                              icon='cart'
                                              mode='contained'
                                              color='#e5b700'
                                              dark={true}
                                          >
                                              Add
                                          </Button>
                                      </Card.Actions>
                                  </Card>
                              </SafeAreaView>
                          } />
                      </SafeAreaView>
                  }
                  keyExtractor={item => item.id}
              />
          );
      }
    };

    // Life-cycle methods
    componentDidMount = () => {
        console.log('component did mount method');
        fetch('http://192.168.1.135:1338/items', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        homeItems: result,
                    });
                    console.log('THE RESULT FROM GET ALL ITEMS IS::', this.state.homeItems);
                },
                (error) => {
                    console.log('THE ERROR FROM GET ALL ITEMS IS::', error);
                }
            );
        fetch('http://192.168.1.135:1338/categories', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('THE RESULT FROM GET ALL Categories IS::', result);
                    // let tempCategoryArray = [];
                    // result.map((categoryRecord) => {
                    //     tempCategoryArray.push(categoryRecord.categoryName);
                    // });
                    // console.log('THE CAT ARRAY IS::', tempCategoryArray);
                    this.setState({
                        homeCategories: result,
                    })
                },
                (error) => {
                    console.log('THE ERROR FROM GET ALL CATEGORIES IS::', error);
                }
            );
    };

    componentWillUnmount = () => {
        console.log('component will unmount');
    };

    render() {
        return(
                <View style={styles.primaryContainer}>
                    <SafeAreaView style={styles.headingFlexSection} >
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
                    </SafeAreaView>
                    <SafeAreaView style={styles.ProductsArea}>
                        {this.homePageProducts()}
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
        height: '100%',
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
    itemsSection: {
        flex: 1,
        width: '80%',
        flexWrap: 'wrap',
        height: 100,
        marginTop: 0,
    },
    scrollview: {
        // paddingTop: 120,
        // position: 'relative',
    },
    yellowHR: {
        borderBottomColor: '#e5b700',
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginVertical: 5
    },
    ProductsArea: {
        height: '80%',
        position: 'relative',
    },
    productCategory: {
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        color: '#b38f00',
        fontWeight: 'bold',
        fontSize: 30,
    },
    cardStyle: {
        marginHorizontal: 10,
        marginVertical: 7,
        borderRadius: 0,
        borderBottomRightRadius: 25,
    },
    cardTitleArea: {
        backgroundColor: '#e5b700',
    },
    cardTitle: {
        color: 'white',
        marginTop: -5,
        marginBottom: 10,
        fontSize: 20
    },
    productDescriptionArea: {
        marginTop: 5,
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 15,
        lineHeight: 20
    },
    cardHR: {
        borderBottomColor: '#ffeb99',
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginVertical: 5
    },
    productPrice: {
        color: '#e5b700',
        fontSize: 18,
        marginRight: '72%',
    },
    productPriceAmount: {
        color: '#b38f00',
        fontSize: 25,
        fontWeight: 'bold',
    },
    addBtn: {
        marginRight: '10%',
    }
});

