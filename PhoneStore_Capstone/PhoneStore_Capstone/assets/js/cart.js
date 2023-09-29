var arrayItemCart = localStorage.getItem("item_cart") != null ? JSON.parse(localStorage.getItem("item_cart")) : [];
var totalAmount = localStorage.getItem("total_amount") != null ? localStorage.getItem("total_amount") : 0;

var cart = {
  _init: function () {
    cart.showNumberCart();
    cart.renderCart();
  },
  showNumberCart() {
    if (arrayItemCart.length > 0) {
      $('#number_cart').html(arrayItemCart.length);
    } else {
      $('#number_cart').html('');
    }
  },
  renderCart: function () {
    if (arrayItemCart.length > 0) {
      $.each(arrayItemCart, function (key, value) {
        $('#table_cart > tbody').append(`
          <tr>
            <td>${key + 1}</td>
            <td>${value.product_name}</td>
            <td>${value.quantity}</td>
            <td>${value.price}</td>
            <td>${value.price * value.quantity}</td>
            <td></td>
          </tr>
        `);
      });

      // $(".quantity").TouchSpin({
      //   step: 1,
      //   decimals: decimalsQuantity,
      //   min: 1,
      //   max: 100000,
      //   buttondown_class: "btn btn-metal btn-sm",
      //   buttonup_class: "btn btn-metal btn-sm"
      // });
    }
  },
  addCart: function (productId, productName, price) {
    if (arrayItemCart.length == 0) {
      // Add Cart
      arrayItemCart.push({
        'product_id': productId,
        'product_name': productName,
        'quantity': 1,
        'price': parseInt(price)
      });

      // Total Amount
      totalAmount = price;
    } else {
      // Check Exist Product
      if (arrayItemCart.some(arrayItemCart => arrayItemCart.product_id === productId)) {
        var itemCart = arrayItemCart.find(({ product_id }) => product_id === productId);

        // Update Cart
        itemCart.quantity = itemCart.quantity + 1;
      } else {
        // Add Cart
        arrayItemCart.push({
          'product_id': productId,
          'product_name': productName,
          'quantity': 1,
          'price': parseInt(price)
        });
      }

      // Total Amount
      totalAmount = parseInt(totalAmount) + parseInt(price);
    }

    // Set localStorage
    localStorage.setItem('item_cart', JSON.stringify(arrayItemCart));
    localStorage.setItem('total_amount', parseInt(totalAmount));

    cart.showNumberCart();
  },
};