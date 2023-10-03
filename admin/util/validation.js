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
const validationNumber = (value, idErr, message) => {
    // const regexNumber = /\S/g;
    // regex số âm
    const regexNegativeNumber = /-/;
    var isNegativeNumber = regexNegativeNumber.test(value);
    console.log('isNegativeNumber: ', isNegativeNumber);
    console.log('value: ', typeof value);
    let DOMidErr = document.querySelector(idErr);

    if (!isNaN(value) && !isNegativeNumber) {
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

// validate type
function validationType(value, idErr, message) {
    let DOMidErr = document.querySelector(idErr);

    if (value === -1 || value == '') {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    } else {
        DOMidErr.style.display = 'none';

        DOMidErr.innerHTML = '';
        return true;
    }
}