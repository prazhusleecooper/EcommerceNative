import React, { Component } from 'react';
import {Text, StyleSheet, SafeAreaView, FlatList, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import {connect} from 'react-redux';
import {addToCart, decreaseQuantity} from '../actions/cartHandle';
import SyncStorage from 'sync-storage';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems:  [],
            refreshing: false,
            cartEmptyText: [
                {
                    content: 'Oops! Your cart seems to be empty',
                    id: 1,
                    style: styles.cartEmptyTextFirst,

                },
                {
                    content:'Please pull down to refresh!',
                    id: 2,
                    style: styles.cartEmptyTextLast,
                },

            ],
            cartEmptyRefreshing: false
        };
        console.log('CART CONSTRUCTOR++++++++++++++++++++++', SyncStorage.get('cartItems'));
        this.getCartItems();

    }

    // Non-Rendering methods
    // Get items from Sync Storage
    getCartItems = () => {
        let syncStorageItems = SyncStorage.get('cartItems');
        console.log('+++++++++++++++SYNC STORAGE ITEMS ARE+++++++::::', syncStorageItems);
        if(
            syncStorageItems === undefined ||
            syncStorageItems === null ||
            syncStorageItems === [] ||
            syncStorageItems.length === 0
        ) {
            this.state.cartItems = [];
        } else if(
            syncStorageItems !== undefined ||
            syncStorageItems !== null ||
            syncStorageItems !== [] ||
            syncStorageItems.length > 0
        ) {
            this.state.cartItems = syncStorageItems;
        }
    };

    // Handling pull down to refresh - When the cart is not empty
    handleRefresh = () => {
        console.log('+++++++++++ REFRESHING NOT EMPTY +++++++++++');
        this.setState({
            refreshing: true,
        });
        this.getCartItems();
        this.setState({
            refreshing: false
        });
        this.setState();
    };

    // Handling pull down to refresh - When the cart is empty
    handleCartEmptyRefresh = () => {
        console.log('+++++++++++ REFRESHING CART EMPTY +++++++++++');
        this.setState({
            refreshing: true,
        });
        this.getCartItems();
        this.setState({
            refreshing: false
        });
        this.setState();
    };

    // Method to INCREASE the item quantity
    increaseQuantity = (cartItem) => {
        let tempArray = this.state.cartItems;
        tempArray.map((item) => {
            if(cartItem.uid === item.uid) {
                item.quantity += 1;
                item.total_price = item.quantity * item.price;
            }
        });
        this.setState({
            cartItems: tempArray
        });
        SyncStorage.set('cartItems', tempArray);
    };

    // Method to DECREASE the item quantity
    decreaseQuantity = (cartItem) => {
        let tempArray = this.state.cartItems;
        tempArray.map((item, index) => {
            if(cartItem.uid === item.uid) {
                if(item.quantity === 1) {
                    tempArray.splice(index, 1)
                } else if(item.quantity > 1) {
                    item.quantity -= 1;
                    item.total_price = item.quantity * item.price;
                }
            }
        });
        this.setState({
            cartItems: tempArray,
        });
        SyncStorage.set('cartItems', tempArray);
    };

    // Delete item from the Cart
    deleteItem = (cartItem) => {
        let tempArray = this.state.cartItems;
        let index = -1;
        tempArray.map((item, arrayIndex) => {
            if(cartItem.uid === item.uid) {
                index = arrayIndex
            }
        });
        if(index !== -1) {
            tempArray.splice(index, 1);
        }
        this.setState({
            cartItem: tempArray,
        });
        SyncStorage.set('cartItems', tempArray);
    };

    // _________________________________________________________________________________________________________________

    // Rendering methods
    // Flat List Footer
    flatListFooterComponent = () => {
        return(
            <SafeAreaView style={styles.refreshInstructionSection}>
                <Text style={styles.refreshInstructionText}>
                    Please refresh by pulling down! :)
                </Text>
            </SafeAreaView>
        );
    };

    // Render the cart content
    cartContent = () => {
        if(this.state.cartItems === [] || this.state.cartItems.length === 0) {
            return(
                <SafeAreaView style={styles.emptyListSection}>
                    <FlatList
                        data={this.state.cartEmptyText}
                        renderItem={ ({item}) =>
                            <Text style={item.style}>
                                {item.content}
                            </Text>
                        }
                        refreshing={this.state.cartEmptyRefreshing}
                        onRefresh={() => this.handleCartEmptyRefresh()}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            )
        } else if(this.state.cartItems !== [] || this.state.cartItems.length !== 0) {
            return (
                <SafeAreaView>
                    <FlatList
                        data={ this.state.cartItems }
                        renderItem={ ({ item }) =>
                            <SafeAreaView >
                                <SafeAreaView style={ styles.cartItemSection }>
                                    <SafeAreaView style={ styles.cartItemUpperSection }>
                                        <SafeAreaView style={ styles.cartItemImageSection }>
                                            <Image
                                                source={{ uri: item.img[0] }}
                                                style={ styles.cartItemImage }
                                            />
                                        </SafeAreaView>
                                        <SafeAreaView style={ styles.cartItemTextSection }>
                                            <Text style={ styles.cartItemTitle }>
                                                { item.title }
                                            </Text>
                                            <Text style={ styles.cartItemCategory }>
                                                { item.category }
                                            </Text>
                                        </SafeAreaView>
                                        <SafeAreaView style={ styles.cartItemPriceSection }>
                                            <Icon
                                                name='rupee'
                                                size={25}
                                                color= {variables.primaryYellowDark}
                                                style={styles.cartItemCurrencyIcon}
                                            />
                                            <Text style={ styles.cartItemPrice }>
                                                { item.total_price }
                                            </Text>
                                        </SafeAreaView>
                                    </SafeAreaView>
                                    <SafeAreaView style={ styles.cartItemBottomSection }>
                                        <SafeAreaView style={ styles.cartItemQuantitySection }>
                                            <Button
                                                mode='contained'
                                                color='#e5b700'
                                                dark={true}
                                                onPress={() => this.decreaseQuantity(item)}
                                            >
                                                <Icon
                                                    name='minus'
                                                    size={25}
                                                    color= {variables.primaryYellowDark}
                                                    style={styles.cartItemCurrencyIcon}
                                                    style={{
                                                        marginHorizontal: 17,
                                                        backgroundColor: variables.primaryYellow,
                                                    }}
                                                />
                                            </Button>
                                            <Text style={ styles.cartItemQunatity }>
                                                { item.quantity }
                                            </Text>

                                            <Button
                                                mode='contained'
                                                color='#e5b700'
                                                dark={true}
                                                onPress={() => this.increaseQuantity(item)}
                                            >
                                                <Icon
                                                    name='plus'
                                                    size={25}
                                                    color= {variables.primaryYellowDark}
                                                    style={styles.cartItemCurrencyIcon}
                                                    style={{
                                                        marginHorizontal: 17,
                                                        backgroundColor: variables.primaryYellow,
                                                    }}
                                                />
                                            </Button>
                                        </SafeAreaView>
                                        <SafeAreaView style={ styles.deleteBtnArea }>
                                            <Button
                                                mode='contained'
                                                icon='delete'
                                                color='red'
                                                dark={true}
                                                style={{
                                                    height: '100%',
                                                    justifyContent: 'center'
                                                }}
                                                onPress={() => this.deleteItem(item)}
                                            >
                                                Delete
                                            </Button>
                                        </SafeAreaView>
                                    </SafeAreaView>
                                </SafeAreaView>
                                <SafeAreaView
                                    style={ styles.cartItemHR }
                                />
                            </SafeAreaView>
                        }
                        keyExtractor={ item => item.uid }
                        style={ styles.cartItemsList }
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.handleRefresh()}
                        ListFooterComponent={this.flatListFooterComponent()}
                    />

                    <Button
                        mode='contained'
                        icon='cart'
                        color= {variables.primaryYellowDark}
                        dark={true}
                        style={{
                            height: '10%',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: variables.primaryYellowDark
                        }}
                        labelStyle={{
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}
                        onPress={() => this.testing()}
                    >
                        Checkout
                    </Button>
                </SafeAreaView>
            );
        }
    };
    // _________________________________________________________________________________________________________________

    // Component Life-cycle methods
    // Component Did Mount method
    componentDidMount = () => {
        // This is to refresh the state of the Cart component when it is clicked (When it comes into focus)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log('##########   CART FOCUSED   ##########');
            this.handleRefresh();
        });
    };

    // Component Will Unmount method
    componentWillUnmount = () => {
        this._unsubscribe();
    };

    // _________________________________________________________________________________________________________________

    // Render method
    render() {
        return(
             this.cartContent()
        );
    }
}

const variables = {
    primaryYellow: 'rgb(229, 183, 0)',
    primaryYellowOpacity: 'rgba(229, 183, 0, 0.8)',
    primaryYellowDark: '#b38f00',
    primaryLight: '#ffff',
    primaryDark: 'black',
};


let styles = StyleSheet.create({
    cartItemsArea: {
        height: '85%'
    },
    cartItemsList: {
        height: '90%'
    },
    cartItemSection: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        height: '100%'
    },
    cartItemUpperSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        height: '100%'
    },
    cartItemImageSection: {
        marginLeft: 5,
        width: 65,
        height: 65
    },
    cartItemImage: {
        width: 65,
        height: 65
    },
    cartItemTextSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        width: '20%',
    },
    cartItemTitle: {
        fontSize: 25,
        color: variables.primaryDark,
    },
    cartItemCategory: {
        fontSize: 20,
        color: variables.primaryYellow,
        fontWeight: 'bold'
    },
    cartItemPriceSection: {
        flex: 1,
        flexDirection: 'row',
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartItemPrice: {
        color: variables.primaryYellow,
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 15
    },
    cartItemCurrencyIcon: {

    },
    cartItemBottomSection: {
        flex: 1,
        flexDirection: 'row',
    },
    cartItemQuantitySection: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '25%',
        marginTop: 5,
        marginLeft: 5,
    },
    cartItemQunatity: {
        fontSize: 20,
        color: variables.primaryYellow,
        fontWeight: 'bold',
        paddingHorizontal: 15
    },
    deleteBtnArea: {
        marginRight: 15
    },
    cartItemHR: {
        borderBottomColor: variables.primaryYellow,
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginVertical: 5
    },
    emptyListSection: {
        // padding: 100
    },
    cartEmptyTextFirst: {
        paddingVertical: 20,
        paddingLeft: 15,
        fontSize: 20,
        color: variables.primaryYellowDark,
        fontWeight: 'bold',
    },
    cartEmptyTextLast: {
        paddingBottom: 550,
        paddingLeft: 15,
        fontSize: 25,
        color: variables.primaryYellow,
        fontWeight: 'bold',
    },
    refreshInstructionSection: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    refreshInstructionText: {
        fontSize: 20,
        color: variables.primaryYellow,
        fontWeight: 'bold',
    }
});

export default Cart;
