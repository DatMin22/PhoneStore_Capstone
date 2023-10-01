// HIỂN THỊ SẢN PHẨM LÊN TRANG CHỦ CUSTOMER
const renderProductsListCustomer = (productsList) => {
  var content = "";
  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];
    var contentDiv = `
    <div class="col-12 col-md-4 col-lg-3 mb-5" >
      <a class="product-item" href="./customer/views/productDetail.html" onclick='showProductDetail(${product.id})'>
        <img src="${product.img}" alt="" class="img-fluid product-thumbnail" 
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

//


// ====================================
// function getInfor() {
//   var id = document.querySelector("#id").value;
//   var name = document.querySelector("#name").value;
//   var price = document.querySelector("#price").value;
//   var screen = document.querySelector("#screen").value;
//   var backCamera = document.querySelector("#backCamera").value;
//   var frontCamera = document.querySelector("#frontCamera").value;
//   var img = document.querySelector("#img").value;
//   var desc = document.querySelector("#desc").value;
//   var type = document.querySelector("#type").value;

//   return new Product(id,
//     name,
//     price,
//     screen,
//     backCamera,
//     frontCamera,
//     img,
//     desc,
//     type);
// }

// function onLoading() {
//   document.querySelector("#spinner").style.display = "flex";
// }

// function offLoading() {
//   document.querySelector("#spinner").style.display = "none";
// }

// function reset() {
//   document.querySelector("#id").innerHTML = '';
//   document.querySelector("#name").innerHTML = '';
//   document.querySelector("#price").innerHTML = '';
//   document.querySelector("#screen").innerHTML = '';
//   document.querySelector("#backCamera").innerHTML = '';
//   document.querySelector("#frontCamera").innerHTML = '';
//   document.querySelector("#img").innerHTML = ''
//   document.querySelector("#desc").innerHTML = '';
//   document.querySelector("#type").innerHTML = '';
// }