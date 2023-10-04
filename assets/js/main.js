function fetchProductsList() {
    

    getProductList()
        .then(function (res) {
            renderProductsListCustomer(res.data);
        })
        .catch(function (err) {
            console.log("err", err);
        });
}

fetchProductsList();

// tìm theo hãng
const findByType = () => {
    var valueType = document.getElementById('valueType').value;

    getProductList()
        .then(function (res) {
            

            if (valueType == 'iphone') {
                let listTypeIphone = res.data.filter((prod) => prod.type == 'iphone')
                renderProductsListCustomer(listTypeIphone);
            }
            else if (valueType == 'samsung') {
                let listTypeSamsung = res.data.filter((prod) => prod.type == 'samsung');
                renderProductsListCustomer(listTypeSamsung);
            }
            else {
                renderProductsListCustomer(res.data);
            }

        })
        .catch(function (err) {
            console.log("err", err);
        });

}
// =============


