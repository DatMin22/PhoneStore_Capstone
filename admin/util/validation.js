function validationEmptyForm(value, idErr, message) {
    let DOMidErr = document.querySelector(idErr);

    if (value.trim() === '') {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    } else {
        DOMidErr.style.display = 'none';

        DOMidErr.innerHTML = '';
        return true;
    }
}
// kiểm tra tên
function validationName(value, idErr, message) {
    // validate name have to letters by regex
    let DOMidErr = document.querySelector(idErr);
    const regexName = /[a-zA-Z]/g;
    const regexNumber = /\d/;
    const regexSpacing = /\S/g;
    var isName = regexName.test(value);
    var isNumber = regexNumber.test(value);
    var isSpacing = regexSpacing.test(value);
    if (isName && !isNumber && isSpacing) {
        DOMidErr.style.display = 'none';

        DOMidErr.innerHTML = '';

        return true;
    }
    else {
        DOMidErr.style.display = 'inline';

        DOMidErr.innerHTML = message;
        return false;
    }

}

function validationNumber(value, idErr, message) {
    let DOMidErr = document.querySelector(idErr);
    if (value === 0) {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    }
    else {

        DOMidErr.style.display = 'none';
        DOMidErr.innerHTML = '';
        return true;
    }

}

function kiemTraTrung(id, listProducts, idErr, message) {
    let DOMidErr = document.querySelector(idErr);

    let viTri = listProducts.findIndex(function (prod) {
        return prod.id == id;
    });
    if (viTri != -1) {
        // ko tìm thấy
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    } else {
        DOMidErr.style.display = 'none';
        DOMidErr.innerHTML = "";
        return true;
    }
}