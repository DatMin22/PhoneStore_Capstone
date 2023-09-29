function fetchProductsList() {
  onLoading();
  // axios({
  //   url: "https://6500588418c34dee0cd4bf27.mockapi.io/products",
  //   method: "GET",
  // })
  //   .then(function (res) {
  //     console.log("res", res.data);
  //     renderProductsList(res.data);
  //     offLoading();
  //   })
  //   .catch(function (err) {
  //     offLoading();
  //     console.log("err", err);
  //   });

  getProductList()
    .then(function (res) {
      console.log("res", res.data);
      renderProductsList(res.data);
      offLoading();
    })
    .catch(function (err) {
      offLoading();
      console.log("err", err);
    });
}

fetchProductsList();

//xóa SP
function delProduct(id) {
  delProductByID(id)
    .then(function (res) {
      // gọi lại api lấy lại tất cả sp trên server về sau khi xóa thành công để render ra ds mới nhất
      fetchProductsList();
      console.log("sản phẩm bị xóa", res.data);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

//Thêm sản phẩm
function addProduct() {
  var sp = getInfor();
  console.log("sp: ", sp);

  addNewProduct(sp)
    .then(function (res) {
      console.log("res", res);
      //   tắt modal của bs sau khi thêm thành công

      // document.getElementById('myModal')
      $("#myModal").modal("hide");

      //lấy danh sách sp mới nhất từ server
      fetchProductsList();
    })
    .catch(function (err) {
      console.log(err);
    });
}

// cập nhật sản phẩm :
// Bước 1: lấy thông tin sản phẩm cần sửa show lên form
function editProduct(id) {
  getProductByID(id)
    .then(function (res) {
      // lấy được sp cần sửa
      console.log("res", res.data);
      var sp = res.data;

      // hiển thị thông tin sp cần sửa lên modal
      document.querySelector("#id").value = sp.id;
      document.querySelector("#name").value = sp.name;
      document.querySelector("#price").value = sp.price;
      document.querySelector("#screen").value = sp.screen;
      document.querySelector("#backCamera").value = sp.backCamera;
      document.querySelector("#frontCamera").value = sp.frontCamera;
      document.querySelector("#img").value = sp.img;
      document.querySelector("#desc").value = sp.desc;
      document.querySelector("#type").value = sp.type;

      // mở modal
      $("#myModal").modal("show");
    })
    .catch(function (err) {
      console.log("err", err);
    });
}
// Bước 2: lấy thông tin từ form sau khi đã chỉnh sửa để cập nhật
function updateProduct() {
  var sp = getInfor();
  console.log("sp: ", sp);

  updateProductByID(sp.id, sp)
    .then(function (res) {
      console.log("res", res);

      //tắt modal sau khi update thành công
      $("#myModal").modal("hide");

      // lấy lại dssp mới nhất
      fetchProductsList();
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

//tìm kiếm
function searchProductByName() {
  var nameSearch = document.querySelector("#txtSearch").value.trim()?.toLowerCase();

  getProductList()
    .then(function (res) {
      console.log("res", res);

      //array data
      var productsList = res.data;

      //tìm kiếm tên người dùng nhập
      var result = productsList.filter(function (sp) {
        return sp.name.toLowerCase().includes(nameSearch);
      });

      //render lại kết quả tìm thấy
      renderProductsList(result);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

//tìm kiếm bằng sự kiện nhấn nút enter
document
  .querySelector("#txtSearch")
  .addEventListener("keydown", function (event) {
    console.log("event", event);
    // event laf 1 object chứa thông tin về sự kiện
    // event.target: trả ra cái element phát sinh ra sự kiện
    // event.key: trả ra phím vừa mới nhấn
    // khi nào người dùng nhấn enter mới bắt đầu tìm kiếm, tất cả những phím ko phải enter sẽ return

    if (event.key !== "Enter") return;

    var name = event.target.value;
    getProductList(name)
      .then(function (res) {
        console.log("res: ", res.data);
        renderProductsList(res.data);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  });

// bắt sự kiện thay đổi của select box bằng sự kiện onchange
function sortByPrice() {
  // console.log('h8i');
  // nếu tăng thì sắp xếp 
  let sortDesc = document.querySelector('#sort');
  let value = sortDesc.options[sortDesc.selectedIndex].value;
  console.log('value: ', value);
  if (value === 'tang') {
    getProductList()
      .then(function (res) {
        // console.log("res", res);

        //array data
        var productsList = res.data;
        var sortByPriceList = productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        // //tìm kiếm tên người dùng nhập
        // var sortByPriceList = productsList.filter(function (sp) {
        //   return sp.name.toLowerCase().includes(nameSearch);
        // });
console.log(sortByPriceList);
        //render lại kết quả tìm thấy
        renderProductsList(sortByPriceList);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }

  // sap xep giam dan
  if (value === 'giam') {
    getProductList()
      .then(function (res) {
        // console.log("res", res);

        //array data
        var productsList = res.data;
        var sortByPriceList = productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        sortByPriceList.reverse();
        // //tìm kiếm tên người dùng nhập
        // var sortByPriceList = productsList.filter(function (sp) {
        //   return sp.name.toLowerCase().includes(nameSearch);
        // });
console.log(sortByPriceList);
        //render lại kết quả tìm thấy
        renderProductsList(sortByPriceList);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }

}