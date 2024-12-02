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

// Order List
let orderList = [{
    orderId: 'DH912873',
    orderUser: 'hello23hihi',
    orderTotal: '1280000',
    orderDate: '10/10/2024',
    orderAddress: '8',
    orderStatus: 'Thành công',
    classStatus: 'delivered'
},{
    orderId: 'DH882948',
    orderUser: 'alice_wang',
    orderTotal: '1000000',
    orderDate: '12/1/2024',
    orderAddress: '10',
    orderStatus: 'Chưa xử lý',
    classStatus: 'pending'
},{
    orderId: 'DH234738',
    orderUser: 'bob_smith',
    orderTotal: '450000',
    orderDate: '11/25/2024',
    orderAddress: '3',
    orderStatus: 'Đang giao hàng',
    classStatus: 'inprogress'
},{
    orderId: 'DH723791',
    orderUser: 'carol_jones',
    orderTotal: '600000',
    orderDate: '11/21/2024',
    orderAddress: 'Tân Phú',
    orderStatus: 'Đã hủy',
    classStatus: 'return'
},{
    orderId: 'DH123929',
    orderUser: 'david_lee',
    orderTotal: '200000',
    orderDate: '11/22/2024',
    orderAddress: '5',
    orderStatus: 'Thành công',
    classStatus: 'delivered'
},{
    orderId: 'DH643823',
    orderUser: 'emma_clark',
    orderTotal: '500000',
    orderDate: '12/3/2024',
    orderAddress: '2',
    orderStatus: 'Đang giao hàng',
    classStatus: 'inprogress'
},{
    orderId: 'DH239493',
    orderUser: 'frank_harris',
    orderTotal: '350000',
    orderDate: '11/30/2024',
    orderAddress: 'Bình Tân',
    orderStatus: 'Chưa xử lý',
    classStatus: 'pending'
},{
    orderId: 'DH873827',
    orderUser: 'grace_martin',
    orderTotal: '700000',
    orderDate: '10/14/2024',
    orderAddress: '7',
    orderStatus: 'Đã hủy',
    classStatus: 'return'
},{
    orderId: 'DH299310',
    orderUser: 'henry_wilson',
    orderTotal: '300000',
    orderDate: '11/23/2024',
    orderAddress: 'Phú Nhuận',
    orderStatus: 'Thành công',
    classStatus: 'delivered'
},{
    orderId: 'DH829123',
    orderUser: 'isabella_thompson',
    orderTotal: '550000',
    orderDate: '11/21/2024',
    orderAddress: '12',
    orderStatus: 'Đang giao hàng',
    classStatus: 'inprogress'
}];

// Order Details
const order_popup = document.querySelector('.order-popup');
const close_btn = document.querySelector('.close-btn');
renderDetails();
function renderDetails(){
    let tableHTML='';
    for(let i=0; i<orderList.length; i++){
        const {orderId, orderUser, orderTotal, orderDate, orderAddress, orderStatus, classStatus} = orderList[i];
        tableHTML +=
        `<tr>
            <td>${orderId}</td>
            <td>${orderUser}</td>
            <td>${orderTotal}</td>
            <td>${orderDate}</td>
            <td>${orderAddress}</td>
            <td><span class="status ${classStatus}">${orderStatus}</span></td>
            <td><button class="detail"><i class="fas fa-eye"></i></button></td>
        </tr>`;
    }
    document.querySelector('.order-table').innerHTML = tableHTML;

    document.querySelectorAll('.detail').forEach((seenButton)=>{
        seenButton.addEventListener('click', ()=>{
            order_popup.classList.add('active');
            close_btn.addEventListener('click', ()=>{
                order_popup.classList.remove('active');
            });
        });
    });
}

// Sort Quận
const un_sort = document.querySelector('.unSort i');
un_sort.onclick = (()=>{
    if(!un_sort.classList.contains('reverse')){
        un_sort.classList.add('reverse');
        renderDetails_bySort();
    }else{
        un_sort.classList.remove('reverse');
        location.reload();
    }
});

function renderDetails_bySort(){
    sortQuan();
    let tableHTML='';
    for(let i=0; i<orderList.length; i++){
        const {orderId, orderUser, orderTotal, orderDate, orderAddress, orderStatus, classStatus} = orderList[i];
        tableHTML +=
        `<tr>
            <td>${orderId}</td>
            <td>${orderUser}</td>
            <td>${orderTotal}</td>
            <td>${orderDate}</td>
            <td>${orderAddress}</td>
            <td><span class="status ${classStatus}">${orderStatus}</span></td>
            <td><button class="detail"><i class="fas fa-eye"></i></button></td>
        </tr>`;
    }
    document.querySelector('.order-table').innerHTML = tableHTML;

    document.querySelectorAll('.detail').forEach((seenButton)=>{
        seenButton.addEventListener('click', ()=>{
            order_popup.classList.add('active');
            close_btn.addEventListener('click', ()=>{
                order_popup.classList.remove('active');
            });
        });
    });
}

function sortQuan(){
    orderList.sort((a,b)=>{
        let compareNum = a.orderAddress - b.orderAddress;
        let compareName = a.orderAddress.localeCompare(b.orderAddress);
        return compareNum || compareName;
    });
}

// Filter order status
const deliver_status = document.getElementById('deliver-status');
deliver_status.addEventListener('change', ()=>{
    renderDetails_bySort();
    const selectValue = deliver_status.value;
    const order_table = document.querySelector('.order-table');
    const rows = order_table.getElementsByTagName('tr');
    for(let i=0; i<rows.length; i++){
        const row = rows[i];
        const statusOrder = row.cells[5].textContent.trim();

        if(selectValue === 'Tình trạng' || statusOrder === selectValue){
            row.style.display = '';
        }else{
            row.style.display = 'none';
        }
    }
});

// Filter order by date
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', filterByDateRange);
function filterByDateRange(){
    const startDate = new Date(startDateInput.value);
    startDate.setHours(0,0,0,0);
    const endDate = new Date(endDateInput.value);
    endDate.setHours(0,0,0,0);
    const rows = document.querySelectorAll('.order-table tr');
    rows.forEach(row => {
        const orderCell = row.querySelector('td:nth-child(4)');
        const orderDate = new Date(orderCell.textContent);
        if(orderCell !== null){
            const orderDate = new Date(orderCell.textContent);
            orderDate.setHours(0,0,0,0);
        }
        if(orderDate >= startDate && orderDate <= endDate){
            row.style.display = '';
        }else{
            row.style.display = 'none';
        }
    });
}