function fetchProductsList() {
  onLoading();
  getProductList()
    .then(function (res) {
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
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

//Thêm sản phẩm
function addProduct() {

  var sp = getInfor();
  // =========================================
  // =========================================
  if (validateForm(sp)) {
    addNewProduct(sp)
      .then(function (res) {
        console.log("res", res);
        //   tắt modal của bs sau khi thêm thành công

        $("#myModal").modal("hide");

        //lấy danh sách sp mới nhất từ server
        fetchProductsList();
      })
      .catch(function (err) {
        console.log(err);
      });
  }



  // =========================================


}

// cập nhật sản phẩm :
// Bước 1: lấy thông tin sản phẩm cần sửa show lên form
function editProduct(id) {
  // ẩn button them
  document.querySelector("#btnAdd").style.display = "none";
  // hieenj button thêm món
  document.querySelector("#btnUpdate").style.display = "inline-block";
  getProductByID(id)
    .then(function (res) {
      // lấy được sp cần sửa
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
  if (validateForm(sp)) {
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

        //array data
        var productsList = res.data;
        var sortByPriceList = productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

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

        //array data
        var productsList = res.data;
        var sortByPriceList = productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        sortByPriceList.reverse();

        console.log(sortByPriceList);
        //render lại kết quả tìm thấy
        renderProductsList(sortByPriceList);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }

}



document.getElementById('btnThemSP').onclick = function () {
  document.querySelector('#btnUpdate').style.display='none';
  document.querySelector('#btnAdd').style.display='inline-block';
  reset();
}

// validation
function validateForm(prod) {

  var valid = true;
  // validate name
  valid &= validationEmptyForm(
    prod.name,
    '#spName',
    'Tên không được để trống!')
    // &&
    // validationName(
    //   prod.name,
    //   '#spName',
    //   'Tên không được chứa số!'
    // );

  // VALIDATE PRICE
  valid &=
    validationEmptyForm(
      prod.price,
      '#spPrice',
      'Giá không được để trống!')
    &&
    validationNumber(
      +prod.price,
      '#spPrice',
      'Giá sản phẩm phải là số dương!');



  // VALIDATE SIZE SCREEN
  valid &=
    validationEmptyForm(
      prod.screen,
      '#spSizeScreen',
      'Kích thước màn hình không được để trống!')
    &&
    validationNumber(
      prod.screen,
      '#spSizeScreen',
      'Kích thước màn hình phải là số dương!');


  // VALIDATE FRONT CAMERA
  valid &=
    validationEmptyForm(
      prod.frontCamera,
      '#spfrontCamera',
      'Camera trước không được để trống!')
    &&
    validationNumber(
      prod.screen,
      '#spfrontCamera',
      'Camera trước phải là số dương!');
  // VALIDATE BACK CAMERA
  valid &=
    validationEmptyForm(
      prod.backCamera,
      '#spbackCamera',
      'Camera sau không được để trống!')
    &&
    validationNumber(
      prod.backCamera,
      '#spbackCamera',
      'Camera sau phải là số dương!');
  // VALIDATE IMAGE
  valid &=
    validationEmptyForm(
      prod.img,
      '#spImg',
      'Hình ảnh không được để trống!')

  // VALIDATE DESCRIPTION
  valid &=
    validationEmptyForm(
      prod.desc,
      '#spDesc',
      'Mô tả không được để trống!');
  // VALIDATE TYPE
  valid &=
    validationType(
      prod.type,
      '#spType',
      'Bạn chưa chọn loại hàng!');
  // }


  return valid;
}

// mở modal khi click vao btnThemSP-sibar
const openModal = () => {
  $("#myModal").modal("show");
  document.querySelector('#btnUpdate').style.display='none';
  document.querySelector('#btnAdd').style.display='inline-block';


}
// $("#myModal").modal("show");
// console.log('$("#myModal").modal("show"): ', $("#myModal").modal("show"));



