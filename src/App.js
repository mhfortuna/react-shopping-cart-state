import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

class App extends Component {
  static findObjectByIdInArray(key, array) {
    const productData = array.find((selectedProduct) => {
      return selectedProduct.id === key;
    });
    return productData;
  }

  static findObjectIndexByIdInArray(key, array) {
    const productData = array.findIndex((selectedProduct) => {
      return selectedProduct.id === key;
    });
    return productData;
  }

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartItems: [],
      isLoading: false,
      hasError: false,
      loadingError: null,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    api.getProducts().then((data) => {
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  handleAddToCart(productId) {
    const { products, cartItems } = this.state;
    /* const foundItem = cartItems.find((element) => {
      return element.id === productId;
    }); */
    /* const productData = products.find((selectedProduct) => {
      return selectedProduct.id === productId;
    }); */
    const cartItem = App.findObjectByIdInArray(productId, cartItems);
    const productData = App.findObjectByIdInArray(productId, products);

    if (cartItem === undefined) {
      cartItems.push({
        id: productId,
        title: productData.title,
        img: productData.img,
        price: productData.price,
        unitsInStock: productData.unitsInStock,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        quantity: 1,
      });
      this.setState({ cartItems: cartItems });
    } else {
      /* const cartItemId = cartItems.findIndex((element) => {
        return element.id === productId;
      }); */
      const cartItemId = App.findObjectIndexByIdInArray(productId, cartItems);
      if (productData.unitsInStock > cartItems[cartItemId].quantity) {
        cartItems[cartItemId].quantity += 1;
        cartItems[cartItemId].updatedAt = new Date().toISOString();
        this.setState({ cartItems });
      }
    }
  }

  handleChange(value, productId) {
    const { products, cartItems } = this.state;
    const productData = App.findObjectByIdInArray(productId, products);
    const cartItemId = App.findObjectIndexByIdInArray(productId, cartItems);
    if (productData.unitsInStock >= value) {
      cartItems[cartItemId].quantity = value;
      cartItems[cartItemId].updatedAt = new Date().toISOString();
      this.setState({ cartItems });
    }
  }

  handleRemove(productId) {
    const { cartItems } = this.state;
    // const cartItem = App.findObjectByIdInArray(productId, cartItems);
    // const productData = App.findObjectByIdInArray(productId, products);
    const cartItemId = App.findObjectIndexByIdInArray(productId, cartItems);
    cartItems.splice(cartItemId, 1);
    this.setState({ cartItems });
  }

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  // handleSetFavorite(productId) {}

  render() {
    const {
      cartItems,
      products,
      isLoading,
      hasError,
      loadingError,
    } = this.state;

    return (
      <Home
        cartItems={cartItems}
        products={products}
        isLoading={isLoading}
        hasError={hasError}
        loadingError={loadingError}
        handleDownVote={() => {}}
        handleUpVote={() => {}}
        handleSetFavorite={() => {}}
        handleAddToCart={this.handleAddToCart}
        handleRemove={this.handleRemove}
        handleChange={this.handleChange}
      />
    );
  }
}

export default App;
