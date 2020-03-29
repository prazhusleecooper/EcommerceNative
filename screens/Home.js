import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    FlatList,
    SafeAreaView,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Title, Paragraph, Checkbox } from 'react-native-paper';
import { Button } from 'react-native-paper';
import SyncStorage from 'sync-storage';

let Spinner = require('react-native-spinkit');

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            homeItems: [],
            homeCategories: [],
            categoriesPermanent: [],
            currentCategory: '',
            searchQuery: '',
            categoriesModalVisible: false,
            checked: true,
            refreshing: false
        };
    }

    // Method to handle refresh
    handleRefresh = () => {
        console.log('HOME PAGE REFRESH');
        this.setState({
            refreshing: true
        });
        let stateCategories = this.state.homeCategories;
        stateCategories.map((category) => {
            category.checked = true;
        });
        this.setState({
            homeCategories: stateCategories,
            refreshing: false
        });
    };

    // Rendering methods
    // Renders the products in the Home page
    homePageProducts = () => {
        // let allChecked = this.allCategoriesUnchecked();
        if(this.allCategoriesUnchecked() === 0){
            console.log('all cat check:::', this.allCategoriesUnchecked());
            return(
                    <SafeAreaView style={styles.noCategoriesTextSection}>
                        <Text style={styles.noCategoriesText}>
                            Please select one of the categories to view the products :)
                        </Text>
                    </SafeAreaView>
            );
        } else if(this.state.homeItems === 0 || this.state.homeItems.length === 0) {
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
            if(this.searchFilter() === [] || this.searchFilter().length === 0) {           // If search results is empty
                return(
                    <Text style={styles.searchEmptyText}>
                        No products found :(
                        {'\n'}
                        <Text style={styles.searchEmptyTextInstruction}>
                            Please refine your search
                        </Text>
                    </Text>

                );
            } else if(this.searchFilter() !== [] || this.searchFilter().length !== 0) {     // Rendering search results
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
                                              <Card.Content
                                                  style={styles.productDescriptionArea}
                                              >
                                                  <Paragraph
                                                      style={styles.productDescription}
                                                  >
                                                      { item.description }
                                                  </Paragraph>
                                              </Card.Content>
                                              <View
                                                  style={styles.cardHR}
                                              />
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
                                                      onPress={() => this.addToCart(item)}
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
        } else if(this.state.searchQuery === '' || this.state.homeItems !== [] || this.state.homeItems.length !== 0) {      // Default home products display
            return(
                <FlatList
                    data={this.state.homeCategories}
                    renderItem={({ item }) =>
                        this.homeProducts(item)
                    }
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.handleRefresh()}
                    keyExtractor={item => item.id}
                />
            );
        }
    };

    // Render default home products based on the categories checked
    homeProducts = (item) => {
        if(item.checked) {
            return(
                <SafeAreaView>
                    <View style={styles.yellowHR} />
                    <Text style={styles.productCategory}>
                        { this.setCurrentCategory(item.categoryName) }
                        { item.categoryName }
                    </Text>
                    <FlatList
                        data={this.productsDisplayFilter()}
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
                                            onPress={() => this.addTocart(item)}
                                        >
                                            Add
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            </SafeAreaView>
                        }
                    />
                </SafeAreaView>
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

    // Method to toggle the categories modal
    toggleModal = () => {
        this.setState({
            categoriesModalVisible: !this.state.categoriesModalVisible
        })
    };

    // Method to toggle the Categories checkbox in the Modal
    toggleCategories = (categoryName) => {
        console.log('TOGGLERD DTHASO::', categoryName);
        this.state.homeCategories.map((category, id) => {
            if(categoryName === category.categoryName) {
                this.state.homeCategories[id].checked = !this.state.homeCategories[id].checked;
                this.setState({});
                console.log('state modified');
            }
        })
    };

    // Method to check if all the categories are unchecked => none of the  products should be displayed
    /*
    * Codes:
    *   0 - Not all the categories are unchecked / Atleast one category is checked
    *   1 - All the categories are unchecked
    * */
    allCategoriesUnchecked = () => {
        let flag = 0;
        this.state.homeCategories.map((category) => {
           if(category.checked === true) {
               flag = 1;
           }
        });
        return flag;
    };

    // Add the item to ASYNC storage
    addTocart = (item) => {
        this.popup.show({
            onPress: function() {console.log('Pressed')},
            slideOutTime: 5000
        });
        console.log('THE ADDED ITssEM IS::', SyncStorage.get('cartItems'));
        let syncStorageItems = SyncStorage.get('cartItems');
        if( syncStorageItems === undefined ||
            syncStorageItems === null ||
            syncStorageItems === [] ||
            syncStorageItems.length === 0
        ) {
            let tempArray = [];
            tempArray.push(item);
            SyncStorage.set('cartItems', tempArray);
        } else if(
            syncStorageItems !== undefined ||
            syncStorageItems !== null ||
            syncStorageItems !== [] ||
            syncStorageItems.length > 0
        ) {
            let presence = false;
            syncStorageItems.map((cartItem) => {
                if(item.uid === cartItem.uid) {
                    presence = true;
                    cartItem.quantity += 1;
                    cartItem.total_price = cartItem.quantity * cartItem.price
                }
            });
            if(presence === false) {
                syncStorageItems.push(item);
            }
            SyncStorage.set('cartItems', syncStorageItems);
        }
        console.log('UPDATED CART IS::::++++:::++++::::', SyncStorage.get('cartItems'));
        /*if (cartAsyncArr === null || cartAsyncArr.length === 0) {
            let tempArray = [];
            tempArray.push(item);
            SyncStorage.set('cartItems', JSON.stringify(tempArray));
        } else if (cartAsyncArr.length > 0) {
            let presence = false;
            cartAsyncArr.map((cartItem) => {
                if (item.uid === cartItem.uid) {
                    presence = true;
                    cartItem.quantity += 1;
                    cartItem.total_price = cartItem.quantity * cartItem.price
                }
            });
            if (presence === false) {
                cartAsyncArr.push(item);
            }
            SyncStorage.set('cartItems', JSON.stringify(cartAsyncArr));
        }
        console.log('GET THE VALUE', SyncStorage.get('cartItems'));*/
    };

    // Life-cycle methods
    componentDidMount = async () => {
        console.log('component did mount method');
        let data = await SyncStorage.init();
        console.log('SYNC STORAGE READY', data);
        fetch('http://192.168.0.106:1338/items', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('REACHED HERER');
                    this.setState({
                        homeItems: result,
                    });
                    console.log('THE RES FROM GET ALL ITEMS IS::', result);

                },
                (error) => {
                    console.log('THE ERROR FROM GET ALL ITEMS IS::', error);
                }
            );
        fetch('http://192.168.0.106:1338/categories', {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        homeCategories: result,
                        categoriesPermanent: result,
                    });
                    console.log('THE RESULT FROM FETCH ISS:::', result);
                },
                (error) => {
                    console.log('THE ERROR FROM GET ALL CATEGORIES IS::', error);
                }
            );
        console.log('PROPS ITEMS:::', this.props.addedItems);
    };

    componentWillUnmount = () => {
        console.log('component will unmount');
    };

    render() {
        return(
            <View style={styles.primaryContainer}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.categoriesModalVisible}
                    onRequestClose={() => this.toggleModal()}
                    style={{
                        backgroundColor: variables.primaryYellow,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}
                >
                    <SafeAreaView
                        style={styles.modalTitleSection}
                    >
                        <SafeAreaView
                            style={styles.modalTitleFlex}
                        >
                            <Text
                                style={styles.modalTitle}
                            >
                                Categories
                            </Text>
                            <Icon
                                name='times'
                                size={ 35 }
                                color={ variables.primaryLight }
                                style={ styles.modalCloseIcon }
                                onPress={ () => this.toggleModal() }
                            />
                        </SafeAreaView>
                    </SafeAreaView>
                    <SafeAreaView style={ styles.categoriesPane }>
                        <SafeAreaView
                            style={ styles.modalHR }
                        />
                        <FlatList
                            data={ this.state.homeCategories }
                            renderItem={({ item }) =>
                                <SafeAreaView
                                    style={{
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Checkbox
                                        status={ item.checked ? 'checked' : 'unchecked' }
                                        onPress={ () => this.toggleCategories(item.categoryName) }
                                    />
                                    <Text style={styles.checkboxText}>
                                        { item.categoryName }
                                    </Text>
                                </SafeAreaView>
                            }

                        />
                    </SafeAreaView>

                    <SafeAreaView style={styles.categoriesPaneFooter}>
                        <Text style={styles.categoriesPaneFooterText}>
                            Kindly pick the categories that you wish to be displayed :)
                        </Text>
                        <Icon
                            name='shopping-bag'
                            size={25}
                            color='white'
                        />
                    </SafeAreaView>
                </Modal>
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
                                {this.searchBarIcon()}
                            </View>
                            <Button
                                type='text'
                                color={variables.primaryLight}
                                onPress={() => this.toggleModal()}
                            >
                                Filter
                            </Button>
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

const variables = {
    primaryYellow: 'rgb(229, 183, 0)',
    primaryYellowOpacity: 'rgba(229, 183, 0, 0.8)',
    primaryYellowDark: '#b38f00',
    primaryLight: '#ffff',
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
        backgroundColor: variables.primaryYellow,
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
        marginHorizontal: 10,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variables.primaryYellowDark,
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
        borderBottomColor: variables.primaryYellow,
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
        color: variables.primaryYellowDark,
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
        backgroundColor: variables.primaryYellow,
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
        color: variables.primaryYellow,
        fontSize: 18,
        marginRight: '72%',
    },
    productPriceAmount: {
        color: variables.primaryYellow,
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
        color: variables.primaryYellowDark,
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
    },
    // Categories modal
    // Title section
    modalTitleSection: {
        height: '10%',
    },
    modalTitleFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: variables.primaryYellowOpacity,
    },
    modalTitle: {
        marginTop: 15,
        color: variables.primaryLight,
        fontWeight: 'bold',
        fontSize: 25,
    },
    modalCloseIcon: {
        marginTop: 15,
    },
    modalHR: {
        borderBottomColor: variables.primaryYellowDark,
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginBottom: 10
    },
    categoriesPane: {
        backgroundColor: variables.primaryYellowOpacity,
        height: '80%'
    },
    categoriesPaneFooter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variables.primaryYellow
    },
    checkboxText: {
        color: variables.primaryLight,
        fontWeight: 'normal',
        fontSize: 20,
    },
    categoriesPaneFooterText: {
        fontSize: 15,
        color: 'white',
    },
    // No Categories selected text
    noCategoriesTextSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noCategoriesText: {
        marginTop: 15,
        marginLeft: 15,
        fontSize: 25,
        color: variables.primaryYellow,
        fontWeight: 'bold',
    }

});

export default Home;
