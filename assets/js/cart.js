var arrayItemCart = localStorage.getItem("item_cart") != null ? JSON.parse(localStorage.getItem("item_cart")) : [];
var totalAmount = 0;

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
    $('#table_cart > tbody').empty();

    if (arrayItemCart.length > 0) {
      $.each(arrayItemCart, function (key, value) {
        $('#table_cart > tbody').append(`
          <tr>
            <td style="text-align: center;">${value.product_name}</td>
            <td style="text-align: center;width:20%;">
              <input class="quantity" value="${value.quantity}" onchange="cart.changeQuantity(this, '${value.product_id}', '${value.price}')">
            </td>
            <td style="text-align: center; font-weight: bolder;">$ ${value.price}</td>
            <td style="text-align: center; font-weight: bolder;" id="amount_${value.product_id}">$ ${value.price * value.quantity}</td>
            <td style="text-align: center;">
              <a class="btn" href="javascript:void(0)" onclick="cart.removeItemCart(this, '${value.product_id}')"><i class="fa fa-trash"></i></a>
            </td>
          </tr>
        `);
      });

      $(".quantity").TouchSpin({
        step: 1,
        min: 1,
        max: 100000,
      });
    }

    // Load total amount (View)
    cart.calculateTotalAmount();
  },
  addCart: function (productId, productName, price) {
    console.log('price: ', price);
    console.log('productName: ', productName);
    console.log('productId: ', productId);
    
    

    if (arrayItemCart.length == 0) {
      // Add Cart
      arrayItemCart.push({
        'product_id': productId,
        'product_name': productName,
        'quantity': 1,
        'price': parseInt(price)
      });
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
    }

    // Set localStorage
    localStorage.setItem('item_cart', JSON.stringify(arrayItemCart));

    cart.showNumberCart();

    Swal.fire('Thêm giỏ hàng thành công!', '', 'success');
  },
  changeQuantity: function (obj, productId, price) {
    if (arrayItemCart.some(arrayItemCart => arrayItemCart.product_id === productId)) {
      var itemCart = arrayItemCart.find(({ product_id }) => product_id === productId);

      // Update Cart
      itemCart.quantity = $(obj).val();

      //Load amount (tr)
      $('#amount_' + productId).html('$ ' + (parseInt(price) * parseInt($(obj).val())));
    }

    // Set localStorage
    localStorage.setItem('item_cart', JSON.stringify(arrayItemCart));

    // Load total amount (View)
    cart.calculateTotalAmount();
  },
  removeItemCart: function (obj, productId) {
    // Remove Item In Array Item Cart
    arrayItemCart = arrayItemCart.filter(el => el.product_id != productId);

    // Set localStorage
    localStorage.setItem('item_cart', JSON.stringify(arrayItemCart));

    // Load total amount (View)
    cart.calculateTotalAmount();

    // Remove Tr (Table)
    $(obj).closest('tr').remove();

    cart.showNumberCart();
  },
  calculateTotalAmount: function () {
    if (arrayItemCart.length > 0) {
      $.each(arrayItemCart, function (key, value) {
        totalAmount = totalAmount + parseInt(value.price) * value.quantity;
      });
    }

    $('#total_amount').html('$ ' + totalAmount);
  },
  payment: function () {
    if (arrayItemCart.length > 0) {
      Swal.fire({
        title: 'Tổng tiền $ ' + totalAmount + '<br>Bạn có muốn thanh toán không?',
        showCancelButton: true,
        confirmButtonText: 'Thanh toán',
        cancelButtonText: 'Tiếp tục mua hàng'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // Remove Cart
          localStorage.removeItem("item_cart");

          Swal.fire('Thanh toán giỏ hàng thành công!', '', 'success').then(function (result) {
            if (result.dismiss == 'esc' || result.dismiss == 'backdrop') {
              window.location.reload();
            }
            if (result.value == true) {
              window.location.reload();
            }
          });
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thanh toán thất bại',
        text: 'Giỏ hàng trống nên bạn không thể thanh toán giỏ hàng',
      })
    }
  },
  clearCart: function () {
    if (arrayItemCart.length > 0) {
      Swal.fire({
        title: 'Bạn có muốn hủy giỏ hàng?',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Không'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // Remove Cart
          localStorage.removeItem("item_cart");

          Swal.fire('Hủy giỏ hàng thành công!', '', 'success').then(function (result) {
            if (result.dismiss == 'esc' || result.dismiss == 'backdrop') {
              window.location.reload();
            }
            if (result.value == true) {
              window.location.reload();
            }
          });
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Hủy giỏ hàng thất bại',
        text: 'Giỏ hàng trống nên bạn không thể hủy giỏ hàng',
      })
    }
  }
};

const navToggler = () => {
  // const navToggler = document.querySelector(".navbar-toggler");

  document.querySelector('.collapse').className='collapsed navbar-collapse';
}