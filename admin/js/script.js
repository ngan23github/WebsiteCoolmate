// Check if Loginned
let isLogin = localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem('isLogin')) : false;
if(isLogin == false){
    window.location.href = "./login.html";
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

// List Khách Hàng
let userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) :
[{
    username: 'hello89hihi',
    email: 'abcd55@gmail.com',
    phone: '0859869534'
},{
    username: 'alice_wang',
    email: 'alice.wang@example.com',
    phone: '0987654321'
},{
    username: 'bob_smith',
    email: 'bob.smith@example.com',
    phone: '0234567894'
},{
    username: 'carol_jones',
    email: 'carol.jones@example.com',
    phone: '0867893123'
},{
    username: 'david_lee',
    email: 'david.lee@example.com',
    phone: '0345678901'
},{
    username: 'emma_clark',
    email: 'emma.clark@example.com',
    phone: '0945789012'
},{
    username: 'frank_harris',
    email: 'frank.harris@example.com',
    phone: '0878901234'
},{
    username: 'grace_martin',
    email: 'grace.martin@example.com',
    phone: '0789012345'
},{
    username: 'henry_wilson',
    email: 'henry.wilson@example.com',
    phone: '0890223456'
},{
    username: 'isabella_thompson',
    email: 'isabella.thompson@example.com',
    phone: '0909234567'
},{
    username: 'james_johnson',
    email: 'james.johnson@example.com',
    phone: '0385947836'
},{
    username: 'katherine_king',
    email: 'katherine.king@example.com',
    phone: '0758939482'
},{
    username: 'liam_lewis',
    email: 'liam.lewis@example.com',
    phone: '0128378293'
},{
    username: 'madison_miller',
    email: 'madison.miller@example.com',
    phone: '0812839034'
},{
    username: 'noah_nelson',
    email: 'noah.nelson@example.com',
    phone: '0823484737'
},{
    username: 'olivia_ben',
    email: 'olivia.ben@example.com',
    phone: '0928349873'
},{
    username: 'patrick_parker',
    email: 'patrick.parker@example.com',
    phone: '0872189234'
},{
    username: 'quinn_hally',
    email: 'quinn.hally@example.com',
    phone: '0781238924'
},{
    username: 'rachel_roberts',
    email: 'rachel.roberts@example.com',
    phone: '0890223456'
},{
    username: 'samuel_smith',
    email: 'samuel.smith@example.com',
    phone: '0909274673'
}];

const delete_popup = document.querySelector('.delete-popup');
const popup_close_btn = document.querySelector('.popup-close-btn'); 
const popup_cancel_btn = document.querySelector('.popup-cancel-btn'); 
popup_close_btn.addEventListener('click', ()=>{
    delete_popup.classList.remove('active');
});
popup_cancel_btn.addEventListener('click', ()=>{
    delete_popup.classList.remove('active');
});
renderTable();
function renderTable(){
    let tableHTML = '';
    for(let i=0; i<userList.length; i++){
        const {username, email, phone} = userList[i];
        tableHTML += 
        `<tr>
            <td>${username}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
                <div class="tools">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="lock-btn"><i class="fas fa-lock"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>`;
    }
    document.querySelector('.js-user-table').innerHTML = tableHTML;

    // Delete PopUp
    document.querySelectorAll('.delete-btn').forEach((deleteButton) => {
        deleteButton.addEventListener('click', ()=>{
            delete_popup.classList.add('active');
            const popup_confirm_btn = document.querySelector('.popup-confirm-btn');
            popup_confirm_btn.addEventListener('click', ()=>{
                delete_popup.classList.remove('active');
            });
        });
    });

    // Lock User PopUp
    const lock_popup = document.querySelector('.lock-popup');
    const l_popup_close_btn = document.querySelector('.l-popup-close-btn'); 
    const l_popup_cancel_btn = document.querySelector('.l-popup-cancel-btn');
    const l_popup_confirm_btn = document.querySelector('.l-popup-confirm-btn');
    document.querySelectorAll('.lock-btn').forEach((lockButton)=>{
        lockButton.addEventListener('click', ()=>{
            lock_popup.classList.add('active');
        });
        l_popup_close_btn.addEventListener('click', ()=>{
            lock_popup.classList.remove('active');
        });
        l_popup_cancel_btn.addEventListener('click', ()=>{
            lock_popup.classList.remove('active');
        });
        l_popup_confirm_btn.addEventListener('click', ()=>{
            lock_popup.classList.remove('active');
        });
    });

    // Edit User PopUp
    const edit_popup = document.querySelector('.edit-popup');
    const e_popup_close_btn = document.querySelector('.e-popup-close-btn');
    const e_cancel_button = document.querySelector('.e-cancel-button');
    const edit_button = document.querySelector('.edit-button');
    const edit_user = document.querySelector('#edit-user');
    const edit_email = document.querySelector('#edit-email');
    const edit_phone = document.querySelector('#edit-phone');
    e_popup_close_btn.addEventListener('click', ()=>{
        edit_popup.classList.remove('active');
    });
    e_cancel_button.addEventListener('click', ()=>{
        edit_popup.classList.remove('active');
    });
    document.querySelectorAll('.edit-btn').forEach((editButton, i)=>{
        editButton.addEventListener('click', ()=>{
            console.log(userList[i]);
            edit_user.value = userList[i].username;
            edit_email.value = userList[i].email;
            edit_phone.value = userList[i].phone;
            edit_popup.classList.add('active');
            edit_button.addEventListener('click', ()=>{
                // userList[i].username = edit_user.value;
                // userList[i].email = edit_email.value;
                // userList[i].phone = edit_phone.value;
                edit_popup.classList.remove('active');
                // renderTable();
            });
        });
        
    });
}

// Pagination
let thisPage = 1;
let limit = 7;
let list = document.querySelectorAll('.js-user-table tr');

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

// Add User PopUp
const add_user = document.querySelector('.add-user');
const add_popup = document.querySelector('.add-popup');
const a_popup_close_btn = document.querySelector('.a-popup-close-btn');
const cancel_button = document.querySelector('.cancel-button');
const add_button = document.querySelector('.add-button');
a_popup_close_btn.addEventListener('click', ()=>{
    add_popup.classList.remove('active');
});
cancel_button.addEventListener('click', ()=>{
    add_popup.classList.remove('active');
});
add_user.addEventListener('click', ()=>{
    add_popup.classList.add('active');
    document.querySelectorAll('.add-button').forEach((addButton)=>{
        addButton.addEventListener('click', ()=>{
            addUser();
            add_popup.classList.remove('active');
        });
    });
});

function addUser(){
    const nameInput = document.getElementById('user');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    if(name != '' && email != '' && phone != ''){
        userList.push({username: name, email: email, phone: phone});     
    }
    localStorage.setItem('userList', JSON.stringify(userList));
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    renderTable();
}