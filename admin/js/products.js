// Check if Loginned
let isLogin = JSON.parse(localStorage.getItem('isLogin'));
if(isLogin == false){
    window.location.href = "login.html";
}

// Menu Bar
const menu = document.querySelector('.toggle')
.addEventListener('click', ()=>{toggleMenu()})
function toggleMenu(){
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');
    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

// Admin info
const subMenu = document.querySelector('.sub-menu-wrap');
const userPic = document.querySelector('.user-pic');
userPic.addEventListener('click', ()=>{
    subMenu.classList.toggle('open-menu');
});

// Products

let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) :
[{
    productId: 'SP672831',
    productName: 'Áo thun Marvel',
    productImage: './img/2484.ULSMV.TSZ705__CLASSICVENOM_1_DEN.png',
    productCount: '384',
    productPrice: '220000',
    productStatus: 'true'
},{
    productId: 'SP823874',
    productName: 'Áo thun Venom',
    productImage: './img/2484.ULSMV.TSZ707_HEHEHEVENOM_0050__20_DEN.webp',
    productCount: '672',
    productPrice: '190000'
},{
    productId: 'SP172392',
    productName: 'Áo khoác thể thao có mũ',
    productImage: './img/ao-khoac-the-thao-co-mu.webp',
    productCount: '583',
    productPrice: '350000'
},{
    productId: 'SP283499',
    productName: 'Áo khoác thể thao cổ Rib',
    productImage: './img/ao-khoac-the-thao-co-rib.webp',
    productCount: '826',
    productPrice: '400000'
},{
    productId: 'SP789456',
    productName: 'Áo phao nhẹ',
    productImage: './img/ao-phao-nhe.webp',
    productCount: '429',
    productPrice: '380000'
},{
    productId: 'SP492748',
    productName: 'Áo sơ mi cổ tàu',
    productImage: './img/ao-so-mi-co-tau.webp',
    productCount: '732',
    productPrice: '430000'
},{
    productId: 'SP237891',
    productName: 'Áo sơ mi Modal Essential',
    productImage: './img/ao-so-mi-modal-essential.webp',
    productCount: '662',
    productPrice: '500000'
},{
    productId: 'SP628435',
    productName: 'Áo sơ mi Oxford Premium',
    productImage: './img/ao-so-mi-oxford.webp',
    productCount: '348',
    productPrice: '380000'
},{
    productId: 'SP827348',
    productName: 'Áo Sweater',
    productImage: './img/ao-sweater.webp',
    productCount: '723',
    productPrice: '250000'
},{
    productId: 'SP827348',
    productName: 'Áo Sweater',
    productImage: './img/ao-sweater.webp',
    productCount: '723',
    productPrice: '250000'
},{
    productId: 'SP827348',
    productName: 'Áo Sweater',
    productImage: './img/ao-sweater.webp',
    productCount: '723',
    productPrice: '250000'
},{
    productId: 'SP827348',
    productName: 'Áo Sweater',
    productImage: './img/ao-sweater.webp',
    productCount: '723',
    productPrice: '250000'
}];
// localStorage.setItem('products', JSON.stringify(products));
const popup_close_btn = document.querySelector('.popup-close-btn'); 
const popup_cancel_btn = document.querySelector('.popup-cancel-btn'); 
const delete_popup = document.querySelector('.delete-popup');
popup_close_btn.addEventListener('click', ()=>{
    delete_popup.classList.remove('active');
});
popup_cancel_btn.addEventListener('click', ()=>{
    delete_popup.classList.remove('active');
});
renderTable();
function renderTable(){
    let tableHTML = '';
    for(let i=0; i<products.length; i++){
        const {productId, productName, productImage, productCount, productPrice} = products[i];
        tableHTML += 
        `<tr>
            <td>${productId}</td>
            <td>${productName}</td>
            <td><img class="product-img" src="${productImage}" alt=""></td>
            <td>${productCount}</td>
            <td>${productPrice}</td>
            <td>
                <div class="tools">
                    <button class="edit-btn" onclick="editProduct('${i}','${productId}', '${productName}', '${productCount}', '${productPrice}', '${productImage}')"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>`;
    }
    document.querySelector('.products-list').innerHTML = tableHTML;

    document.querySelectorAll('.delete-btn').forEach((deleteButton) => {
        deleteButton.addEventListener('click', ()=>{
            delete_popup.classList.add('active');
            const popup_confirm_btn = document.querySelector('.popup-confirm-btn');
            popup_confirm_btn.addEventListener('click', ()=>{
                delete_popup.classList.remove('active');
            });
        });
    });
}

// Pagination
let thisPage = 1;
let limit = 4;
let list = document.querySelectorAll('.products-list tr');

function loadItem(){
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key)=>{
        if(key >= beginGet && key <= endGet){
            item.style.display = '';
        }else{
            item.style.display = 'none';
        }
    });
    listPage();
}
loadItem();
function listPage(){
    let count = Math.ceil(list.length/limit);
    document.querySelector('.listPage').innerHTML = '';
    if(thisPage != 1){
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }
    for(let i=1; i<= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPage){
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }
    if(thisPage != count){
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}
function changePage(i){
    thisPage = i;
    loadItem();
}

// Add Product PopUp
const add_product = document.querySelector('.add-product');
const add_product_popup = document.querySelector('.add-product-popup');
const a_p_popup_close_btn = document.querySelector('.a-p-popup-close-btn');
const a_p_cancel_button = document.querySelector('.a-p-cancel-button');
const add_p_button = document.querySelector('.add-p-button');
add_product.addEventListener('click', ()=>{
    add_product_popup.classList.add('active');
});
a_p_popup_close_btn.addEventListener('click', ()=>{
    add_product_popup.classList.remove('active');
});
a_p_cancel_button.addEventListener('click', ()=>{
    add_product_popup.classList.remove('active');
});
add_p_button.addEventListener('click', ()=>{
    add_product_popup.classList.remove('active');
    addProduct();
    renderTable();
});

const imgInput = document.querySelector('.img');
const file = document.getElementById('imgInput');
const idInput = document.getElementById('product-id');
const nameInput = document.getElementById('product-name');
const countInput = document.getElementById('product-count');
const priceInput = document.getElementById('product-price');
const edit_product_id = document.getElementById('edit-product-id');
const edit_product_name = document.getElementById('edit-product-name');
const edit_product_count = document.getElementById('edit-product-count');
const edit_product_price = document.getElementById('edit-product-price');
const edit_img = document.querySelector('.edit-img');
const edit_file = document.getElementById('edit-imgInput')
file.onchange = function(){
    const fileReader = new FileReader();
    fileReader.onload = function(e){
        const imgUrl = e.target.result;
        imgInput.src = imgUrl;
    }
    fileReader.readAsDataURL(file.files[0]);
}
edit_file.onchange = function(){
    const fileReader = new FileReader();
    fileReader.onload = function(e){
        const imgUrl = e.target.result;
        edit_img.src = imgUrl;
    }
    fileReader.readAsDataURL(edit_file.files[0]);
}

function addProduct(){
    const id = idInput.value; 
    const name = nameInput.value; 
    const count = countInput.value; 
    const price = priceInput.value; 
    const img = imgInput.src;
    if(id != '' && name != '' && count != '' && price != '' && img != ''){
        products.push({productId: id, productName: name, productImage: img, productCount: count, productPrice: price});
    }
    localStorage.setItem('products', JSON.stringify(products));
    idInput.value = '';
    nameInput.value = '';
    countInput.value = '';
    priceInput.value = '';
    imgInput.src = './img/upload.jpg';
}


// Edit Product PopUp
function editProduct(index, id, name, count, price, img){
    const edit_popup = document.querySelector('.edit-popup');
    const e_popup_close_btn = document.querySelector('.e-popup-close-btn');
    const e_cancel_button = document.querySelector('.e-cancel-button');
    const e_button = document.querySelector('.e-button');
    
    edit_popup.classList.add('active');
    edit_product_id.value = id;
    edit_product_name.value = name;
    edit_product_count.value = count;
    edit_product_price.value = price;
    edit_img.src = img;

    e_popup_close_btn.addEventListener('click', ()=>{
        edit_popup.classList.remove('active');
    });
    e_cancel_button.addEventListener('click', ()=>{
        edit_popup.classList.remove('active');
    });
    e_button.addEventListener('click', ()=>{
        // products[index].productId = edit_product_id.value;
        // products[index].productName = edit_product_name.value;
        // products[index].productCount = edit_product_count.value;
        // products[index].productPrice = edit_product_price.value;
        // products[index].productImage = edit_img.src;
        edit_popup.classList.remove('active');
        // renderTable();
    });
}