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

        // document.getElementById('myModal')
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



document.getElementById('btnThemSP').onclick = function () {
  reset();
  // console.log('vgfvsdgmnsd');
}

// validation
function validateForm(prod) {

  var valid = true;
  // validate name
  valid &= validationEmptyForm(
    prod.name,
    '#spName',
    'Tên không được để trống!')
    &&
    validationName(
      prod.name,
      '#spName',
      'Tên không được chứa số!'
    );

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
  let typeInputValue = prod.type;
  console.log('typeInputValue: ', typeInputValue);
  // if (typeInputValue === -1 || typeInputValue =='' ) {
  valid &=
    validationType(
      prod.type,
      '#spType',
      'Bạn chưa chọn loại hàng!');
  // }



  //   kiemTraTrung(prod.taiKhoan,
  //     dsnv.Employees,
  //     "#tbTKNV",
  //     "Mã nhân viên đã tồn tại!")
  //   && validationTaikhoan(
  //     prod.taiKhoan,
  //     '#tbTKNV',
  //     'Tài khoản phải có 4 đến 6 kí tự!');

  // // validate FullName
  // valid &= validationEmptyForm(
  //   prod.fullName,
  //   '#tbTen',
  //   'Tên không được để trống!')
  //   &&
  //   validationName(
  //     prod.fullName,
  //     '#tbTen',
  //     'Tên phải là chữ!');
  // // validate email
  // valid &= validationEmptyForm(
  //   prod.email,
  //   '#tbEmail',
  //   'Email không được để trống!')
  //   &&
  //   validationEmail(
  //     prod.email,
  //     '#tbEmail',
  //     'Email không đúng định dạng!')
  // // validate mật khẩu
  // valid &= validationEmptyForm(
  //   prod.password,
  //   '#tbMatKhau',
  //   'Mật khẩu không được để trống!')

  //   && validationPassword(
  //     prod.password,
  //     '#tbMatKhau',
  //     'Mật khẩu chưa đúng định dạng!')


  // // ngày vào làm
  // valid &= validationEmptyForm(
  //   prod.dateBeginWork,
  //   '#tbNgay',
  //   'Bạn chưa nhập ngày vào làm!')


  // // validate Lương cơ bản
  // valid &= validationNumber(
  //   prod.basicSalary,
  //   '#tbLuongCB',
  //   'Lương không được để trống.'
  // )
  //   &&
  //   validationBasicSalary(
  //     prod.basicSalary,
  //     '#tbLuongCB',
  //     'Lương phải từ 1 triệu đến 20 triệu.'
  //   )
  //   ;

  // // validate chức vụ
  // valid &= validationPosition(
  //   prod.option,
  //   '#tbChucVu',
  //   'Bạn chưa chọn chức vụ!');
  // // validate số giờ làm
  // valid &=
  //   validationNumber(
  //     prod.totalHourWork,
  //     "#tbGiolam",
  //     "Số giờ không được để trống!.")
  //   &&
  //   validationWorkingHourPerMonth(
  //     prod.totalHourWork,
  //     "#tbGiolam",
  //     "Số giờ làm mỗi tháng phải từ 80 đến 200.");

  return valid;
}


