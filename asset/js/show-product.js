let currentPage = 1; // Trang hiện tại
const productsPerPage = 9; // Số sản phẩm mỗi trang

// Hàm để render sản phẩm
function renderProducts(activeType = 'all') {
    const pathname = window.location.pathname;
    const isUserPath = pathname.includes('user'); // Kiểm tra đường dẫn
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Xóa nội dung cũ

    // Lọc sản phẩm theo loại
    const filteredProducts = activeType === 'all'
        ? products
        : products.filter(product => product.type.includes(activeType));

    // Tính toán giới hạn sản phẩm hiển thị
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Hiển thị sản phẩm
    paginatedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-xl-4', 'col-lg-4', 'col-md-6', 'col-sm-6');
        const imagePath = isUserPath
            ? `./../${product.img[0]}`
            : product.img[0];

        productElement.innerHTML = `
            <div class="card img-1 product-item" data-id="${product.id}">
                <img src="${imagePath}" class="card-img-top" alt="${product.title}">
                <div class="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                    <div class="mb-3">
                        <strong>Size:</strong>
                        <div class="btn-group" role="group" aria-label="Size">
                            ${Object.keys(product.size).map(size => `
                                <button 
                                    type="button" 
                                    class="btn btn-outline-light btn-sm size-btn" 
                                    data-size="${size}">
                                    ${size}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="d-flex align-items-center mb-3" style="color: white;">
                        <strong>Số lượng:</strong>
                        <div class="input-group" style="width: 100px;">
                            <button class="btn btn-outline-light decrease-btn">-</button>
                            <input type="number" class="form-control form-control-sm quantity-input" value="1" min="1" max="10" />
                            <button class="btn btn-outline-light increase-btn">+</button>
                        </div>
                    </div>
                    <button class="btn btn-warning w-100 py-2">Thêm vào giỏ hàng</button>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.price.toLocaleString()} VND</p>
                </div>
            </div>
        `;

        productList.appendChild(productElement);
    });

    attachProductEvents(); // Gắn sự kiện sau khi render
    renderPagination(filteredProducts.length, activeType); // Render phân trang
}

// Hàm gắn sự kiện
function attachProductEvents() {
    document.querySelectorAll(".card-img-top").forEach((imgElement) => {
        imgElement.addEventListener('click', () => {
            const pathname = window.location.pathname;
            const productId = imgElement.closest(".product-item").dataset.id;

            if (pathname.includes('user')) {
                window.location.href = `ProductDetail.html?id=${productId}`;
            } else {
                window.location.href = `user/ProductDetail.html?id=${productId}`;
            }
        });
    });

    // Xử lý tăng/giảm số lượng
    document.querySelectorAll(".quantity-input").forEach(input => {
        const parent = input.closest('.input-group');
        const decreaseBtn = parent.querySelector('.decrease-btn');
        const increaseBtn = parent.querySelector('.increase-btn');

        decreaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(input.value, 10) || 1;
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener("click", () => {
            let currentValue = parseInt(input.value, 10) || 1;
            if (currentValue < 10) {
                input.value = currentValue + 1;
            }
        });

        input.addEventListener("input", () => {
            let currentValue = parseInt(input.value, 10) || 1;
            if (currentValue < 1) input.value = 1;
            if (currentValue > 10) input.value = 10;
        });
    });

    // Xử lý chọn size
    document.querySelectorAll(".size-btn").forEach(sizeButton => {
        sizeButton.addEventListener("click", () => {
            const allSizes = sizeButton.parentElement.querySelectorAll(".size-btn");
            allSizes.forEach(btn => btn.classList.remove("active"));
            sizeButton.classList.add("active");
        });
    });
}

// Hàm render phân trang
function renderPagination(totalProducts, activeType) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = ""; // Xóa các trang cũ

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Nút "Trang trước"
    if (currentPage > 1) {
        const prevButton = document.createElement("li");
        prevButton.classList.add("page-item");
        prevButton.innerHTML = `<a class="page-link" href="#">Trang trước</a>`;
        prevButton.addEventListener("click", () => {
            currentPage--;
            renderProducts(activeType);
        });
        paginationContainer.appendChild(prevButton);
    }

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        if (i === currentPage) {
            pageItem.classList.add("active");
        }
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener("click", () => {

            currentPage = i;
            renderProducts(activeType);
        });
        paginationContainer.appendChild(pageItem);
    }

    // Nút "Trang sau"
    if (currentPage < totalPages) {
        const nextButton = document.createElement("li");
        nextButton.classList.add("page-item");
        nextButton.innerHTML = `<a class="page-link" href="#">Trang sau</a>`;
        nextButton.addEventListener("click", () => {
            console.log("click rồi");
            currentPage++;
            renderProducts(activeType);
            console.log(`type: ${activeType}`);
        });
        paginationContainer.appendChild(nextButton);
    }
}

// Gọi hàm render sản phẩm khi trang web tải
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});
