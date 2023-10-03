function fetchProductsList() {
    // onLoading();
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
            // console.log("res", res.data);
            renderProductsListCustomer(res.data);
            // offLoading();
        })
        .catch(function (err) {
            // offLoading();
            console.log("err", err);
        });
}

fetchProductsList();



//tìm kiếm
// function searchProductByName() {
//     var nameSearch = document.querySelector("#txtSearch").value.trim()?.toLowerCase();

//     getProductList()
//         .then(function (res) {
//             console.log("res", res);

//             //array data
//             var productsList = res.data;

//             //tìm kiếm tên người dùng nhập
//             var result = productsList.filter(function (sp) {
//                 return sp.name.toLowerCase().includes(nameSearch);
//             });

//             //render lại kết quả tìm thấy
//             renderProductsList(result);
//         })
//         .catch(function (err) {
//             console.log("err", err);
//         });
// }

// //tìm kiếm bằng sự kiện nhấn nút enter
// document
//     .querySelector("#txtSearch")
//     .addEventListener("keydown", function (event) {
//         console.log("event", event);
//         // event laf 1 object chứa thông tin về sự kiện
//         // event.target: trả ra cái element phát sinh ra sự kiện
//         // event.key: trả ra phím vừa mới nhấn
//         // khi nào người dùng nhấn enter mới bắt đầu tìm kiếm, tất cả những phím ko phải enter sẽ return

//         if (event.key !== "Enter") return;

//         var name = event.target.value;
//         getProductList(name)
//             .then(function (res) {
//                 console.log("res: ", res.data);
//                 renderProductsList(res.data);
//             })
//             .catch(function (err) {
//                 console.log("err", err);
//             });
//     });

// // bắt sự kiện thay đổi của select box bằng sự kiện onchange
// function sortByPrice() {
//     // console.log('h8i');
//     // nếu tăng thì sắp xếp 
//     let sortDesc = document.querySelector('#sort');
//     let value = sortDesc.options[sortDesc.selectedIndex].value;
//     console.log('value: ', value);
//     if (value === 'tang') {
//         getProductList()
//             .then(function (res) {
//                 // console.log("res", res);

//                 //array data
//                 var productsList = res.data;
//                 var sortByPriceList = productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//                 // //tìm kiếm tên người dùng nhập
//                 // var sortByPriceList = productsList.filter(function (sp) {
//                 //   return sp.name.toLowerCase().includes(nameSearch);
//                 // });
//                 console.log(sortByPriceList);
//                 //render lại kết quả tìm thấy
//                 renderProductsList(sortByPriceList);
//             })
//             .catch(function (err) {
//                 console.log("err", err);
//             });
//     }

//     // sap xep giam dan
//     if (value === 'giam') {
//         getProductList()
//             .then(function (res) {
//                 // console.log("res", res);

//                 //array data
//                 var productsList = res.data;
//                 var sortByPriceList = productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//                 sortByPriceList.reverse();
//                 // //tìm kiếm tên người dùng nhập
//                 // var sortByPriceList = productsList.filter(function (sp) {
//                 //   return sp.name.toLowerCase().includes(nameSearch);
//                 // });
//                 console.log(sortByPriceList);
//                 //render lại kết quả tìm thấy
//                 renderProductsList(sortByPriceList);
//             })
//             .catch(function (err) {
//                 console.log("err", err);
//             });
//     }

// }
