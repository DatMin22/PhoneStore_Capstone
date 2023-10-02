function renderProductsList(productsList) {
  var content = "";
  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];
    var contentTr = `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>

            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>

            <td>
            <img src="${product.img}" alt="" class="" 
        onerror="this.src=https:://i.ibb.co/qpB9ZCZ/placeholder.png" width="300" height="150">
            </td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-warning" onclick="editProduct(${product.id})">Sửa</button>
                <button class="btn btn-danger" onclick="delProduct(${product.id})">Xóa</button>
            </td>
        </tr>
        `;

    content += contentTr;
  }

  //in danh sách ra giao diện.
  document.querySelector("#tblDanhSachSP").innerHTML = content;
}

function getInfor() {
  var id = document.querySelector("#id").value;
  var name = document.querySelector("#name").value;
  var price = document.querySelector("#price").value;
  var screen = document.querySelector("#screen").value;
  var backCamera = document.querySelector("#backCamera").value;
  var frontCamera = document.querySelector("#frontCamera").value;
  var img = document.querySelector("#img").value;
  var desc = document.querySelector("#desc").value;
  var type = document.querySelector("#type").value;

  return new Product(id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type);
}

function onLoading() {
  document.querySelector("#spinner").style.display = "flex";
}

function offLoading() {
  document.querySelector("#spinner").style.display = "none";
}

function reset() {
  document.querySelector("#id").value = '';
  document.querySelector("#name").value = '';
  document.querySelector("#price").value = '';
  document.querySelector("#screen").value = '';
  document.querySelector("#backCamera").value = '';
  document.querySelector("#frontCamera").value = '';
  document.querySelector("#img").value = ''
  document.querySelector("#desc").value = '';
  let select = document.querySelector("#type");
  let selectedValue = select.options[0].text;
  document.querySelector("#type").value = selectedValue;

}