// HIỂN THỊ SẢN PHẨM LÊN TRANG CHỦ CUSTOMER
window.renderProductsListCustomer = (productsList) => {
  var content = "";
  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];
    var contentDiv = `
    <div class="col-12 col-md-4 col-lg-3 mb-5" >
      <a class="product-item " id='idsp'  >
        <img src="${product.img}" alt="" class="img-fluid product-thumbnail" 
        onclick='showProductDetail(${product.id})'
        onerror="this.src=https://i.ibb.co/qpB9ZCZ/placeholder.png">
        <h3 class="product-title">${product.name}</h3>
        <strong class="product-price">$${product.price}</strong>

        <span class="icon-cross">
          <div class="btn text-white text-center">Add to Cart</div>

        </span>
      </a>
  </div>
        `;

    content += contentDiv;
  }

  //in danh sách ra giao diện.
  document.querySelector("#products-list").innerHTML = content;
}

