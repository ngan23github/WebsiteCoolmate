function clickSearch() {
    document.querySelector('.clear-btn-js').addEventListener('click', function () {
        document.querySelector('.htsearch-js').style.display = "none";
        const header = document.querySelector('.mg-js');

        // Kiểm tra chiều cao của header
        const headerHeight = header.offsetHeight;
        console.log(headerHeight);
        document.querySelector('.mg-bg-js').style.marginTop = `${headerHeight + 1}px`;
    })
    document.querySelector('.search-click-js').addEventListener('click', function () {
        if (window.location.href.includes("index")) {
            const header = document.querySelector('.mg-js');

            // Kiểm tra chiều cao của header
            const headerHeight = header.offsetHeight;
            document.querySelector('.mg-bg-js').style.marginTop = `-45px`;
        }
        document.querySelector('.htsearch-js').style.display = "";
    });
    document.querySelector('.basic-search-btn1').addEventListener(("click"), function () {
        document.querySelector('.basic-search-btn2').classList.remove('active');
        this.classList.add('active');
        document.querySelector('.nc-js-2').style.display = "none";
        document.querySelector('.nc-js-2-2').style.display = "none";
        document.querySelector('.nc-js-2-3').style.display = "none";
        document.querySelector('.nc-js-1').style.display = "";
        document.querySelector('.nc-js-1-2').style.display = "";
        // document.getElementById('basic-search').placeholder = '';

    })
    document.querySelector('.basic-search-btn2').addEventListener(("click"), function () {
        document.querySelector('.basic-search-btn1').classList.remove('active');
        this.classList.add('active');
        document.querySelector('.nc-js-2').style.display = "";
        document.querySelector('.nc-js-2-2').style.display = "";
        document.querySelector('.nc-js-2-3').style.display = "";
        document.querySelector('.nc-js-1').style.display = "none";
        document.querySelector('.nc-js-1-2').style.display = "none";
        // document.querySelector('.nc-js-2-3').style.display = "none";

    })
}



function clickcard() {

    document.addEventListener('DOMContentLoaded', () => {
        // Lấy các phần tử cần thiết
        const cartIcon = document.querySelector('.header-cart i');
        const modal = document.getElementById('myModal');  // Sửa lại ID để khớp với HTML
        const closeModal = modal.querySelector('.close');
        const loginButton = modal.querySelector('.btn-login');
        const closeButton = modal.querySelector('.btn-close');

        // Mở modal khi click vào icon giỏ hàng
        cartIcon.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                // Nếu chưa đăng nhập, hiển thị modal
                modal.style.display = 'flex';
                document.querySelector('.modal-text').innerHTML = "Vui lòng đăng nhập để xem giỏ hàng"; // Thay đổi nội dung
            } else {
                // Nếu đã đăng nhập, chuyển hướng đến trang giỏ hàng
                if (window.location.href.includes('/user/')) {
                    window.location.href = './cart.html';
                } else {
                    window.location.href = './user/cart.html';
                }

            }
        });


        // Đóng modal khi click vào dấu X
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        // Chuyển hướng đến trang đăng nhập khi click vào nút "Đăng Nhập"
        loginButton.addEventListener('click', () => {
            let tmp = document.querySelector('.s-js').style.display;
            console.log(document.querySelector('.s-js'));
            if (tmp === "none") {
                document.querySelector('.s-js').style.display = "flex";
                modal.style.display = 'none';
            }
        });

        // Đóng modal khi click bên ngoài modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}
// CLick nút thêm vào giỏ hàng
function clickaddpd() {
    // Lấy các phần tử của modal và các nút
    const modal = document.getElementById('myModal');  // Lấy modal theo ID
    const closeModal = modal.querySelector('.close'); // Lấy nút đóng modal
    const loginButton = modal.querySelector('.btn-login'); // Lấy nút đăng nhập
    let user = JSON.parse(localStorage.getItem('user'));
    // Đảm bảo modal được hiển thị khi trang được tải
    document.addEventListener('DOMContentLoaded', function () {
        // Lắng nghe sự kiện click vào các nút có class 'add-card-js'
        document.querySelectorAll('.add-card-js').forEach((value) => {
            value.addEventListener("click", function () {
                let user = JSON.parse(localStorage.getItem('user'));
                if (user == null) {

                    document.querySelector('.modal-text').innerHTML = "Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng";
                    modal.style.display = 'flex';
                }
                else {
                    console.log(value.parentElement);
                    Addsp();
                }

            });
        });

        // Đóng modal khi click vào dấu X
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Chuyển hướng đến trang đăng nhập khi click vào nút "Đăng Nhập"
        // loginButton.addEventListener('click', () => {
        //     let tmp = document.querySelector('.s-js').style.display;
        //     console.log(document.querySelector('.s-js'));
        //     if (tmp === "none") {
        //         document.querySelector('.modal-text').innerHTML = "Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng"; // Thay đổi nội dung
        //         document.querySelector('.s-js').style.display = "flex"; // Hiển thị phần đăng nhập
        //         modal.style.display = 'none'; // Đóng modal sau khi click
        //     }
        // });

        // Đóng modal khi click bên ngoài modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

function Addsp() {
    // Khởi tạo mảng giỏ hàng
    let cart = [];


    const productId = this.id;

    // Lấy thông tin size
    const sizeBtn = this.closest('.card-img-overlay').querySelector('.size-btn.active'); // Giả sử có class 'active' khi chọn size
    const size = sizeBtn ? sizeBtn.dataset.size : null;

    // Lấy số lượng
    const quantityInput = this.closest('.card-img-overlay').querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);

    if (!size) {
        alert('Vui lòng chọn size!');
        return;
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProduct = cart.find(item => item.id === productId && item.size === size);

    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        existingProduct.quantity += quantity;
    } else {
        // Nếu sản phẩm chưa có, thêm mới vào mảng giỏ hàng
        cart.push({
            id: productId,
            size: size,
            quantity: quantity
        });
    }

    console.log(cart); // Hiển thị giỏ hàng trong console để kiểm tra

    // // Xử lý chọn size (thêm class 'active' khi chọn)
    // document.querySelectorAll('.size-btn').forEach(button => {
    //     button.addEventListener('click', function () {
    //         // Bỏ class 'active' khỏi tất cả các nút size trong cùng nhóm
    //         this.closest('.btn-group').querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));

    //         // Thêm class 'active' vào nút được nhấn
    //         this.classList.add('active');
    //     });
    // });

}

// Kiểm tra chiều cao header
function margin_js() {
    const header = document.querySelector('.mg-js');

    // Kiểm tra chiều cao của header
    const headerHeight = header.offsetHeight;
    console.log(`chiều cao: ${headerHeight}`);
    document.querySelector('.mg-bg-js').style.marginTop = `${headerHeight - 1}px`;
}

document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử cần sử dụng
    const basicSearchInput = document.getElementById('basic-search');
    const basicSearchButton = document.getElementById('search-button');
    const advancedSearchButton = document.querySelector('.nc-js-2-3');
    const clearButton = document.getElementById('clear-btn');

    // Lắng nghe sự kiện "Enter" trên ô tìm kiếm cơ bản
    basicSearchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleSearch('cb'); // cb = cơ bản
        }
    });

    // Lắng nghe sự kiện click nút "Tìm kiếm cơ bản"
    basicSearchButton.addEventListener('click', function () {
        handleSearch('cb'); // cb = cơ bản
    });

    // Lắng nghe sự kiện click nút "Tìm kiếm nâng cao"
    advancedSearchButton.addEventListener('click', function () {
        handleSearch('nc'); // nc = nâng cao
    });

    // Lắng nghe sự kiện click nút "Tắt"
    clearButton.addEventListener('click', function () {
        clearSearch();
    });

    // Hàm xử lý tìm kiếm
    function handleSearch(type) {
        const queryParams = new URLSearchParams();

        // Nếu là tìm kiếm cơ bản
        if (type === 'cb') {
            const query = basicSearchInput.value.trim();
            if (query) {
                queryParams.append('cb', query);
            }
        }

        // Nếu là tìm kiếm nâng cao
        if (type === 'nc') {
            const category = document.getElementById('category-filter').value;
            const price = document.getElementById('price-filter').value;

            if (category) queryParams.append('category', category);
            if (price) queryParams.append('price', price);
        }

        // Chuyển hướng đến trang tìm kiếm với query params
        const searchType = type === 'cb' ? 'cb' : 'nc';
        window.location.href = `./user/Search.html?${searchType}&${queryParams.toString()}`;
    }

    // Hàm xóa tìm kiếm và ẩn modal
    function clearSearch() {
        basicSearchInput.value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('price-filter').value = '';
        document.querySelector('.search-css').style.display = 'none'; // Ẩn khung tìm kiếm
    }
});
