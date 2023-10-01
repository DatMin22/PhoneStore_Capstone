// khi ấn vào 1 sản phẩm sẽ chuyển qua trang chi tiết sản phẩm đó
// khi ấn lấy id của sản phẩm đó -> show thông tin sp đó lên giao diện

// method hiện thông tin chi tiết sản phẩm lên giao diện
const showProductDetail = (id) => {
    console.log('id: ', id);
    // lấy id -> 
    axios({
        url: "https://6500588418c34dee0cd4bf27.mockapi.io/products",
        method: "GET",
    })
        .then(function (res) {
            let listProducts = res.data;
            let content = "";
            listProducts.forEach(element => {
                if (element.id == id) {
                    let contentDiv = `<div class="wrapper row" >
                    <div class="preview col-md-6">
          
                      <div class="preview-pic tab-content">
                        <div class="tab-pane active" id="pic-1"><img src="${element.img}" alt=""/></div>
                         </div>
                      <ul class="preview-thumbnail nav nav-tabs">
                        <li class="active"><a data-target="#pic-1" data-toggle="tab"><img
                              src="http://placekitten.com/200/126" alt="" /></a></li>
                        <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                        <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                        <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                        <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                      </ul>
          
                    </div>
                    <div class="details col-md-6">
                      <h3 class="product-title">${element.name}</h3>
                      <div class="rating">
                        <div class="stars">
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                        </div>
                        <span class="review-no">41 reviews</span>
                      </div>
                      <p class="product-description">${element.desc}</p>
                      <h4 class="price">current price: <span>$${element.price}</span></h4>
                      <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                      <h5 class="sizes">sizes:
                        <span class="size" data-toggle="tooltip" title="small">s</span>
                        <span class="size" data-toggle="tooltip" title="medium">m</span>
                        <span class="size" data-toggle="tooltip" title="large">l</span>
                        <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
                      </h5>
                      <h5 class="colors">colors:
                        <span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                        <span class="color green"></span>
                        <span class="color blue"></span>
                      </h5>
                      <div class="action">
                        <button class="add-to-cart btn btn-default" type="button">add to cart</button>
                        <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
                      </div>
                    </div>
                  </div>`;
                    content += contentDiv;
                }


            }
            );
            document.querySelector("#productDetail").innerHTML = content;

            // renderProductsList(res.data);
            // offLoading();
        })
        .catch(function (err) {
            // offLoading();
            console.log("err", err);
        });
    console.log('thnafh công');

}