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

// Statistic products
let products = [{
    productId: '789456',
    productName: 'Áo phao nhẹ',
    productImage: './img/ao-phao-nhe.webp',
    productAmount: 50,
    productPrice: 380000
},{
    productId: '823874',
    productName: 'Áo thun Venom',
    productImage: './img/2484.ULSMV.TSZ707_HEHEHEVENOM_0050__20_DEN.webp',
    productAmount: 30,
    productPrice: 190000
},{
    productId: '172392',
    productName: 'Áo khoác thể thao có mũ',
    productImage: './img/ao-khoac-the-thao-co-mu.webp',
    productAmount: 100,
    productPrice: 350000
},{
    productId: '283499',
    productName: 'Áo khoác thể thao cổ Rib',
    productImage: './img/ao-khoac-the-thao-co-rib.webp',
    productAmount: 150,
    productPrice: 400000
},{
    productId: '672831',
    productName: 'Áo thun Stitch',
    productImage: './img/stitchbeach2.jpg',
    productAmount: 80,
    productPrice: 220000
},{
    productId: '492748',
    productName: 'Áo sơ mi cổ tàu',
    productImage: './img/ao-so-mi-co-tau.webp',
    productAmount: 35,
    productPrice: 430000
},{
    productId: '237891',
    productName: 'Áo sơ mi Modal Essential',
    productImage: './img/ao-so-mi-modal-essential.webp',
    productAmount: 245,
    productPrice: 500000
},{
    productId: '628435',
    productName: 'Áo sơ mi Oxford Premium',
    productImage: './img/ao-so-mi-oxford.webp',
    productAmount: 180,
    productPrice: 380000
},{
    productId: '827348',
    productName: 'Áo Sweater',
    productImage: './img/ao-sweater.webp',
    productAmount: 190,
    productPrice: 250000
}];

function vnd(value){
    return value.toLocaleString("vi-VN");
}
// Product table
renderProduct();
function renderProduct(){
    products.sort((a,b)=> b.productAmount - a.productAmount);
    let tableHTML='';
    let total='';
    let totalPrice = 0;
    for(let i=0; i<products.length; i++){
        const{productId, productName, productImage, productAmount, productPrice} = products[i];
        let sum = productPrice*productAmount;
        tableHTML += 
        `<tr>
            <td>${productId}</td>
            <td>${productName}</td>
            <td><img class="product-img" src="${productImage}" alt=""></td>
            <td>${productAmount}</td>
            <td>${vnd(sum)}</td>
        </tr>`;
        totalPrice += sum;
        // <td><button class="product-detail"><i class="fas fa-eye"></i></button></td>
    }
    document.querySelector('.product-list').innerHTML = tableHTML;

    total += 
    `<tr>
        <td colspan="4">Tổng doanh thu trên các mặt hàng:</td>
        <td>${vnd(totalPrice)}</td>
    </tr>`;
    document.querySelector('.total-price').innerHTML = total;
    let min = products[0].productAmount;
    let max = products[0].productAmount;
    let vt_min=0;
    let vt_max=0;
    for(let i=0; i<products.length; i++){
        if(products[i].productAmount < min){
            vt_min = i;
            min = products[i].productAmount;
        }
        if((products[i].productAmount) > max){
            vt_max = i;
            max = products[i].productAmount;
        }
    }
    const rows = document.querySelector('.product-list').getElementsByTagName('tr');
    rows[vt_min].style.color = "red";
    rows[vt_max].style.color = "blue";
}

// filter
const option = document.getElementById('statistic-option');
const statis_products = document.querySelector('.products');
const statis_customers = document.querySelector('.customers');
option.addEventListener('change', ()=>{
    const selectValue = option.value;
    if(selectValue === "Tất cả"){
        statis_products.style.display = '';
        statis_customers.style.display = '';
    }
    if(selectValue === "Mặt hàng"){
        statis_products.style.display = '';
        statis_customers.style.display = 'none';
    }
    if(selectValue === "Khách hàng"){
        statis_customers.style.display = '';
        statis_products.style.display = 'none';
    }
});

// Statistic Customers
let customers = [{
    orderUsername: 'hello23hihi',
    orderId: 'DH728347',
    orderDate: '11/10/2024',
    orderTotal: 1300000
},{
    orderUsername: 'alice_wang',
    orderId: 'DH634281',
    orderDate: '12/1/2024',
    orderTotal: 850000
},{
    orderUsername: 'carol_jones',
    orderId: 'DH237848',
    orderDate: '12/20/2024',
    orderTotal: 2000000
},{
    orderUsername: 'bob_smith',
    orderId: 'DH127387',
    orderDate: '12/2/2024',
    orderTotal: 4200000
},{
    orderUsername: 'hello23hihi',
    orderId: 'DH538829',
    orderDate: '11/12/2024',
    orderTotal: 380000
},{
    orderUsername: 'frank_harris',
    orderId: 'DH823273',
    orderDate: '12/6/2024',
    orderTotal: 730000
},{
    orderUsername: 'henry_wilson',
    orderId: 'DH287375',
    orderDate: '12/10/2024',
    orderTotal: 550000
},{
    orderUsername: 'david_lee',
    orderId: 'DH587831',
    orderDate: '11/1/2024',
    orderTotal: 660000
},{
    orderUsername: 'alice_wang',
    orderId: 'DH938724',
    orderDate: '11/24/2024',
    orderTotal: 430000
}]; 

// Customer table
const order_popup = document.querySelector('.order-popup');
const close_btn = document.querySelector('.close-btn');
renderCustomer();
function renderCustomer(){
    customers.sort((a,b)=>b.orderTotal - a.orderTotal);
    let tableHTML = '';
    for(let i=0; i<customers.length; i++){
        const{orderUsername, orderId, orderDate, orderTotal} = customers[i];
        tableHTML +=
        `<tr>
            <td>${orderUsername}</td>
            <td>${orderId}</td>
            <td>${orderDate}</td>
            <td>${vnd(orderTotal)}</td>
            <td><button class="detail"><i class="fas fa-eye"></i></button></td>
        </tr>`;
    }
    document.querySelector('.customer-list').innerHTML = tableHTML;

    document.querySelectorAll('.detail').forEach((seenButton)=>{
        seenButton.addEventListener('click', ()=>{
            order_popup.classList.add('active');
            close_btn.addEventListener('click', ()=>{
                order_popup.classList.remove('active');
            });
        });
    });
}

// Filter order by date
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const searchButton = document.getElementById('search-btn');
const rows = document.querySelectorAll('.customer-list tr');
searchButton.addEventListener('click', filterByDateRange);
function filterByDateRange(){
    const startDate = new Date(startDateInput.value);
    startDate.setHours(0,0,0,0);
    const endDate = new Date(endDateInput.value);
    endDate.setHours(0,0,0,0);
    let count = 0;
    for(let i=0; i<rows.length; i++){
        const orderCell = rows[i].querySelector('td:nth-child(3)');
        const orderDate = new Date(orderCell.textContent);
        if(orderCell !== null){
            const orderDate = new Date(orderCell.textContent);
            orderDate.setHours(0,0,0,0);
        }
        if(orderDate >= startDate && orderDate <= endDate && count<5){
            rows[i].style.display = '';
            count++;
        }else{
            rows[i].style.display = 'none';
        }
    }
}