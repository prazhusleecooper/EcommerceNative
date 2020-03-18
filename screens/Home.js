import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, SafeAreaView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-paper';

let Spinner = require('react-native-spinkit');

export class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            homeItems: [],
            homeCategories: [],
            currentCategory: '',
            searchQuery: '',
        };
        console.log('THE APP HAS STARTED::', this.state.searchQuery);

    }

    // Rendering methods
    // Renders the products in the Home page
    homePageProducts = () => {
        if(this.state.homeItems === 0 || this.state.homeItems.length === 0) {
            return(
                <SafeAreaView>
                    <Text style={styles.loadingText}>
                        Stocking the shelves ...
                        {'\n'}
                    </Text>
                    <Spinner
                        isVisible={true}
                        size={100}
                        type={'9CubeGrid'}
                        color={'#e5b700'}
                        style={styles.loadingSpinner}
                    />
                </SafeAreaView>
            );
        } else if(this.state.searchQuery !== '') {
            if(this.searchFilter() === [] || this.searchFilter().length === 0) {
                return(
                    <Text style={styles.searchEmptyText}>
                        No products found :(
                        {'\n'}
                        <Text style={styles.searchEmptyTextInstruction}>
                            Please refine your search
                        </Text>
                    </Text>

                );
            } else if(this.searchFilter() !== [] || this.searchFilter().length !== 0) {
                return(
                    <SafeAreaView>
                        <Text style={styles.productCategory}>
                            Search Results
                        </Text>
                        <FlatList data={this.searchFilter()}
                                  renderItem={({ item }) =>
                                      <SafeAreaView>
                                          <Card style={styles.cardStyle}>
                                              <Card.Content style={styles.cardTitleArea}>
                                                  <Title style={styles.cardTitle}>
                                                      { item.title }
                                                  </Title>
                                              </Card.Content>
                                              <Card.Cover source={{ uri: item.img[0] }} />
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
                                                      onPress={() => console.log('THE VAL:::', this.state.searchQuery)}
                                                  >
                                                      Add
                                                  </Button>
                                              </Card.Actions>
                                          </Card>
                                          <SafeAreaView
                                              style={{
                                                  borderBottomColor: '#ffeb99',
                                                  borderBottomWidth: 1,
                                                  marginHorizontal: 10,
                                                  marginTop: 20,
                                                  marginBottom: 25
                                              }}
                                          />
                                      </SafeAreaView>
                                  } />

                    </SafeAreaView>
                );
            }
        } else if(this.state.searchQuery === '' || this.state.homeItems !== [] || this.state.homeItems.length !== 0) {
            return(
                <FlatList
                    data={this.state.homeCategories}
                    renderItem={({ item }) =>
                        <SafeAreaView>
                            <View style={styles.yellowHR} />
                            <Text style={styles.productCategory}>
                                { this.setCurrentCategory(item.categoryName) }
                                { item.categoryName }
                            </Text>
                            <FlatList data={this.productsDisplayFilter()} renderItem={({ item }) =>
                                <SafeAreaView>
                                    <Card style={styles.cardStyle}>
                                        <Card.Content style={styles.cardTitleArea}>
                                            <Title style={styles.cardTitle}>
                                                { item.title }
                                            </Title>
                                        </Card.Content>
                                        <Card.Cover source={{ uri: item.img[0] }} />
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
                                                onPress={() => console.log('THE VAL:::', this.state.searchQuery)}
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

    // Filter the products according to the category for rendering in the Flat-list
    productsDisplayFilter = () => {
        let filteredArray = [];
        this.state.homeItems.map((item) => {
           if(item.category === this.state.currentCategory) {
               filteredArray.push(item);
           }
        });
        return filteredArray;
    };

    // Filter the products based on the search query
    searchFilter = () => {
      let searchResults = [];
      this.state.homeItems.map((item) => {
          if(item.title.toUpperCase().includes(this.state.searchQuery.toUpperCase())) {
              searchResults.push(item);
          }
      });
      return searchResults;
    };

    searchBarIcon = () => {
        if(this.state.searchQuery === '') {
            return (
                <Icon
                    name='search'
                    size={25}
                    color='white'
                    style={styles.searchIcon}
                />
            );
        } else if(this.state.searchQuery !== '') {
            return (
                <Icon
                    name='times'
                    size={30}
                    color='white'
                    style={styles.timesIcon}
                    onPress={() => this.clearSearchQuery()}
                />
            );
        }
    };

    // Non-rendering methods
    // Method to set the current category while rendering the categories and the products
    setCurrentCategory = (categoryName) => {
        this.state.currentCategory = categoryName;
    };

    // Method to clear the text entered in the search Input box when the 'X' icon is pressed
    clearSearchQuery = () => {
        this.setState({
            searchQuery: '',
        });
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
                                        value={this.state.searchQuery}
                                        onChangeText={searchQuery => this.setState({searchQuery})}
                                    />
                                    {/*<Icon name='search' size={25} color='white' style={styles.searchIcon}/>*/}
                                    {this.searchBarIcon()}
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
}

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
    timesIcon: {
        marginBottom: 2
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
    },
    searchEmptyText: {
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 10,
        color: '#b38f00',
        fontWeight: 'bold',
        fontSize: 30,
    },
    searchEmptyTextInstruction: {
        marginLeft: 10,
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 20,
    },
    // Loading
    // Loading screen Text
    loadingText: {
        marginVertical: 15,
        marginLeft: 10,
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 25,
    },
    // Loading Spinner / Loading animation
    loadingSpinner: {
        marginVertical: 45,
        marginHorizontal: '38%'
    }
});

