var cart = {
  _init: function () {},
  renderCart: function () {},
  addCart: function (productId, productName, price) {
    var arrayItemCart = localStorage.getItem("item_cart") ?? [];

    if (arrayItemCart.length == 0) {
      // Add Cart
    } else {
      // Check Exist Product
      // Add Cart
      // Update Cart
    }

    // Set localStorage
    localStorage.setItem('item_cart', arrayItemCart);
  },
};
