function clickSearch() {
    document.querySelector(".header-search").addEventListener("click", function () {
        console.log("click rồi nè");
        this.style.display = "none"; // Ẩn thẻ bằng cách đặt display thành "none"
        document.querySelector(".search-css").style.display = "";
        document.querySelector(".search-delete").style.display = "";
        // console.log(document.querySelector(".clear-btn"));
        // document.querySelector(".clear-btn").style.display = "";


    });
    document.querySelector(".clear-btn").addEventListener("click", function () {
        document.querySelector(".search-css").style.display = "none";
        document.querySelector(".search-delete").style.display = "none";
        document.querySelector(".header-search").style.display = "";
    })
    // document.querySelector(".sb-input").addEventListener("click", function () {
    //   console.log(document.querySelector(".sb-input").style);
    //   // document.querySelector(".sb-input").style;
    // })
    document.querySelector(".search-nc").addEventListener("click", function () {
        if (document.querySelector(".search-nc").innerHTML == "Tìm kiếm cơ bản") {
            document.querySelector(".category-css").style.display = "none";
            document.querySelector(".price-css").style.display = "none";
            document.querySelector(".search-nc").innerHTML = "Tìm kiếm nâng cao";
        }
        else {
            document.querySelector(".category-css").style.display = "";
            document.querySelector(".price-css").style.display = "";
            document.querySelector(".search-nc").innerHTML = "Tìm kiếm cơ bản";
        }



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
                window.location.href = './user/cart.html';
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
    console.log("đang chạy nè");

    // Lấy các phần tử của modal và các nút
    const modal = document.getElementById('myModal');  // Lấy modal theo ID
    const closeModal = modal.querySelector('.close'); // Lấy nút đóng modal
    const loginButton = modal.querySelector('.btn-login'); // Lấy nút đăng nhập

    // Đảm bảo modal được hiển thị khi trang được tải
    document.addEventListener('DOMContentLoaded', function () {
        // Lắng nghe sự kiện click vào các nút có class 'add-card-js'
        document.querySelectorAll('.add-card-js').forEach((value) => {
            value.addEventListener("click", function () {
                console.log("click thêm nè");
                modal.style.display = 'flex'; // Hiển thị modal
            });
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
                document.querySelector('.modal-text').innerHTML = "Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng"; // Thay đổi nội dung
                document.querySelector('.s-js').style.display = "flex"; // Hiển thị phần đăng nhập
                modal.style.display = 'none'; // Đóng modal sau khi click
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
