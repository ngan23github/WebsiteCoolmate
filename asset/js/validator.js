
function ShowSignup() {

}
function Validator(option) {
    let selectorRules = {};
    //Hàm thực hiẹn validate
    function validate(inputElement, rule) {

        let rules = selectorRules[rule.selector];
        let input;
        for (let i = 0; i < rules.length; ++i) {
            input = rules[i](inputElement.value);
            if (input) { break; }
        }
        if (input) {

            inputElement.parentElement.querySelector('.invalid-message').innerHTML = input;
            Validator(option);
            inputElement.parentElement.classList.add('invalid');
            // console.log(inputElement.parentElement);
        }
        else {
            inputElement.parentElement.querySelector('.invalid-message').innerHTML = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return input;

    }
    let formElement = document.querySelector(option.form);
    console.log(formElement);

    if (formElement) {

        //Lấy element của form cần validate
        // console.log(formElement);

        formElement.onsubmit = function (e) {
            e.preventDefault();
            console.log("nút submit");
            let isFormValid = true;

            option.rules.forEach(function (rule) {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule);
                if (isValid && isFormValid) {
                    isFormValid = false;
                    console.log("false nè");
                }
            });

            if (isFormValid) {
                console.log("test");
                if (typeof option.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    let formValues = Array.from(enableInputs).reduce(function (values, input) {
                        return (values[input.name] = input.value) && values;
                    }, {});
                    option.onSubmit(formValues);
                    console.log(enableInputs);
                    console.log(formValues);
                    // console.log("hiiiiii");
                    // console.log(option.onSubmit);
                }

            }

        }
        option.rules.forEach(function (rule) {

            //Lưu lại cái rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }
            let inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                //Xử lí trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý trường hợp người dùng đang nhập 
                inputElement.oninput = function () {
                    inputElement.parentElement.querySelector('.invalid-message').innerHTML = '';
                    inputElement.parentElement.classList.remove('invalid');
                }

            }
        });
        // console.log(selectorRules);
    }
}

//Định nghĩa rule
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Trường này không được để trống';
        }
    };
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            return (regex.test(value) ? undefined : 'Vui lòng nhập đúng định dạng email');
        }
    };
}
Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getCofirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getCofirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}
// Validator.isNumber = function (selector) {
//     return {
//         selector: selector,
//         test: function (value) {
//             let num = /^[+-]?\d+(\.\d+)?$/;

//             return (num.test(value) ? undefined : 'Vui lòng nhập đúng định dạng số điện thoại');
//         }
//     };
// }
const passField = document.querySelector("#pass");
const showBtn = document.querySelector(".show-btn i");
showBtn.onclick = (() => {
    if (passField.type === "password") {
        passField.type = "text";
        showBtn.classList.add("hide-btn");
    } else {
        passField.type = "password";
        showBtn.classList.remove("hide-btn");
    }
});

function Validator_login(option) {
    let selectorRules = {};
    //Hàm thực hiẹn validate
    function validate(inputElement, rule) {

        let rules = selectorRules[rule.selector];
        let input;
        for (let i = 0; i < rules.length; ++i) {
            input = rules[i](inputElement.value);
            if (input) { break; }
        }
        if (input) {

            inputElement.parentElement.querySelector('.invalid-message').innerHTML = input;
            Validator(option);
            inputElement.parentElement.classList.add('invalid');
            // console.log(inputElement.parentElement);
        }
        else {
            inputElement.parentElement.querySelector('.invalid-message').innerHTML = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return input;

    }
    let formElement = document.querySelector(option.form);

    if (formElement) {

        //Lấy element của form cần validate
        // console.log(formElement);

        formElement.onsubmit = function (e) {
            e.preventDefault();
            let isFormValid = true;


            option.rules.forEach(function (rule) {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule);
                if (isValid && isFormValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof option.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    let formValues = Array.from(enableInputs).reduce(function (values, input) {
                        return (values[input.name] = input.value) && values;
                    }, {});
                    option.onSubmit(formValues);
                    // console.log(enableInputs);
                }

            }

        }
        option.rules.forEach(function (rule) {

            //Lưu lại cái rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }
            let inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                //Xử lí trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý trường hợp người dùng đang nhập 
                inputElement.oninput = function () {
                    inputElement.parentElement.querySelector('.invalid-message').innerHTML = '';
                    inputElement.parentElement.classList.remove('invalid');
                }

            }
        });
        // console.log(selectorRules);
    }
}

//Định nghĩa rule
Validator_login.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Trường này không được để trống';
        }
    };
}

// Pop up thông báo
function announcement(showUp) {
    let popUp = '';
    popUp += `
    <div class="modal_inner">
        <div class="modal_header">
        <div>
            <img class="tick-icon" src="${showUp.image}" alt="">
        </div>
        </div>
        <div class="modal_body">
        <p>${showUp.announce}</p>
        </div>
        <div class="modal_footer">
        <button class="btn_success">
            <a href="${showUp.new_page}">${showUp.mess}</a>
        </button>
        </div>
    </div>`;
    const modalsucess = document.querySelector('.modalSuccess');
    modalsucess.innerHTML = popUp;
    setTimeout(function () {
        modalsucess.classList.add('active');
    }, 1000)
}
function announce(showUp) {
    let popUp = '';
    popUp += `
    <div class="modal_inner">
        <div class="modal_header">
        <div>
            <img class="tick-icon" src="${showUp.image}" alt="">
        </div>
        </div>
        <div class="modal_body">
        <p>${showUp.announce}</p>
        </div>
        <div class="modal_footer">
        <button class="btn_success">
            <a href="${showUp.new_page}">${showUp.mess}</a>
        </button>
        </div>
    </div>`;
    const modalsucess = document.querySelector('.modal-background');
    modalsucess.innerHTML = popUp;
    setTimeout(function () {
        modalsucess.classList.add('active');
    }, 1000)
}