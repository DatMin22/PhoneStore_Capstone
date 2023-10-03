// khi ấn vào 1 sản phẩm sẽ chuyển qua trang chi tiết sản phẩm đó
// khi ấn lấy id của sản phẩm đó -> show thông tin sp đó lên giao diện

// method hiện thông tin chi tiết sản phẩm lên giao diện
window.showProductDetail = (id) => {
  // console.log('id: ', id);
  // console.log(' getProductByID(id): ',  getProductByID(id));
  // debugger

  getProductByID(id)
    .then(
      response => {
        // console.log('response: ', response.data);
        let Product = response.data;
        console.log('Product: ', Product);
        let content = "";

        // console.log('element: ', element.id);
        if (Product.id == id) {
          let contentDiv = `
          <span id="close" title="Close" onclick='off()'>x</span>
          <div class="wrapper row m-4" >
                          <div class="preview col-md-6 col-sm-12 col-lg-6 ">
      
                            <div class="preview-pic tab-content">
                              <div class="tab-pane active" id="pic-1"><img src="${Product.img}" alt=""/></div>
                               </div>
                           
      
                          </div>
                          <div class="details col-md-6 col-sm-12 ">
                            <h3 class="product-title text-white">${Product.name}</h3>
                            <div class="rating">
                              <div class="stars">
                                <span class="fa fa-star checked text-warning"></span>
                                <span class="fa fa-star checked text-warning"></span>
                                <span class="fa fa-star checked text-warning"></span>
                                <span class="fa fa-star text-warning"></span>
                                <span class="fa fa-star text-warning"></span>
                              </div>
                              <span class="review-no">41 reviews</span>
                            </div>
                            <p class="product-description">${Product.desc}</p>
                            <h4 class="price text-white">Price: <span>$${Product.price}</span></h4>
                            <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                            
                          
                            <div class="action d-flex ">
                              <button class="mua-ngay btn text-white w-75 mx-2" type="button">BUY NOW</button>
<span id='addToCart'><i class="fa-solid fa-cart-plus"></i></span>
                              
<!-- <button class="add-to-cart btn btn-primary text-white w-25" type="button">ADD TO CART</button>
                              <span class="fa fa-heart text-danger"></span>-->
                            </div>
                          </div>
                        </div>`;
          content = contentDiv;
        }


        document.querySelector("#productDetailOverlay").innerHTML = content;
        on();
      }
    )
    .catch(
      error => { console.log("lỗi", error) }
    )


}

function on() {
  document.getElementById("productDetailOverlay").style.display = "block";
  document.getElementById("close").style.display = "block";
  document.getElementById("productDetailOverlay").focus();
}

function off() {
  document.getElementById("productDetailOverlay").style.display = "none";
  document.getElementById("productDetailOverlay").blur();

}