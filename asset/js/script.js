
const sliderItem = document.querySelectorAll(".slider-item");
for (let i = 0; i < sliderItem.length; i++) {
  sliderItem[i].style.left = i * 100 + "%";
}

const slider = document.querySelector(".slider-container");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
if (next != null && prev != null) {
  let counter = 0;
  next.addEventListener("click", () => {
    counter++;
    carousel();
  });
  prev.addEventListener("click", () => {
    counter--;
    carousel();
  });
  function carousel() {
    if (counter < 0) {
      counter = sliderItem.length - 1;
    }
    if (counter === sliderItem.length) {
      counter = 0;
    }
    slider.style.transform = "translateX(" + -counter * 100 + "%)";
  }
}

//menu bar
const menu = document.querySelector(".header-bar-icon");
const nav = document.querySelector(".header-nav");
menu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

//header scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  header.classList.toggle("sticky", window.scrollY > 0);
});
// product detail
function showimgpd() {
  const imageSmall = document.querySelectorAll(".product-image-items img");
  const imageBig = document.querySelector(".product-image-main");
  console.log(`img nhỏ ${imageSmall}`);
  console.log(`img lớn ${imageBig}`);
  for (let i = 0; i < imageSmall.length; i++) {
    imageSmall[i].addEventListener("click", () => {
      imageBig.src = imageSmall[i].src;
      imageSmall[i].classList.add("active");
      for (let j = 0; j < imageSmall.length; j++) {
        if (i !== j) {
          imageSmall[j].classList.remove("active");
        }
      }
    });
  }
}

//Thêm số lượng sản phẩm
function Themslsp() {
  document.querySelectorAll(".ri-add-line").forEach((VALUE) => {
    VALUE.addEventListener("click", () => {
      let sl = 0;
      let size = VALUE.parentElement.parentElement.firstElementChild.id;
      console.log(VALUE.parentElement);
      product.forEach((value) => {
        if (value.id == VALUE.parentElement.id) {
          sl = value.size[size].SL;
        }
      });
      document.querySelectorAll(".quantity-input").forEach((value1) => {
        if (value1.parentElement.id == VALUE.parentElement.id && value1.value < sl) {
          value1.value++;
        }
      })
    });
  });
}

//Chọn size
function chonsize() {
  document.querySelectorAll(".size-jss").forEach((VALUE) => {
    let parentElementid = VALUE.parentElement.id;
    VALUE.querySelectorAll('*').forEach((value) => {
      value.addEventListener("click", () => {
        VALUE.querySelector(".active").classList.remove(("active"));
        value.classList.add("active");
        VALUE.id = value.id;
      })
    })
    // VALUE.addEventListener("click", () => {
    //   document.querySelector(".active").classList.remove("active");
    //   VALUE.parentElement.id = VALUE.id;
    //   VALUE.classList.add("active");
    // })
  })
}

chonsize();

//Giảm số lượng sp
function GiamSLSP() {
  document.querySelectorAll(".ri-subtract-fill").forEach((VALUE) => {
    VALUE.addEventListener("click", () => {
      let id = VALUE.parentElement.id;
      document.querySelectorAll(".quantity-input").forEach((value1) => {
        if (value1.parentElement.id == id && value1.value > 1) {
          value1.value--;
        }
      })
    });
  })
}
GiamSLSP();
//Ban đầu
function setcart() {
  let user = JSON.parse(localStorage.getItem('user'));
  let usercart = (user) ? user.cart : [];
  console.log("hi123");
  console.log(JSON.parse(localStorage.getItem('userList')));
  let sl = 0;
  if (usercart == null) {
    usercart = [];
  }

  usercart.forEach((value) => {
    sl += value.quantity;
  })
  document.querySelector(".ri-shopping-cart-line").setAttribute('number', sl);
}
function openModal() {
  document.getElementById('login-warning-modal').style.display = 'flex';
}

// Hàm đóng modal
function closeModal() {
  document.getElementById('login-warning-modal').style.display = 'none';
}

// let cart = [];
//THêm sản phẩm vào giỏ hàng
function addcart() {


  // let cart = [];user
  // console.log(cart);
  let usercart;


  document.querySelectorAll(".add-cart-js").forEach((Value) => {
    Value.addEventListener("click", () => {
      usercart = JSON.parse(localStorage.getItem('user'));
      if (usercart == null) {
        // Hàm mở 
        console.log("hong cz")
        console.log(usercart);
        openModal();
        return;
        // usercart.cart = [];
      }
      console.log(JSON.parse(localStorage.getItem('user')).cart);
      let Size = Value.parentElement.parentElement.firstElementChild.id;
      console.log(`size ${Value.parentElement.parentElement.firstElementChild.id}`)
      let productId = Value.parentElement.parentElement.id;
      console.log(`idsp ${Value.parentElement.parentElement.id}`)
      const productIndex = usercart.cart.findIndex(item => item.id === productId);
      let sl;

      try {
        // Lấy giá trị từ phần tử đầu tiên
        sl = parseInt(Value.parentElement.parentElement.children[1].children[1].value);
        if (isNaN(sl)) {
          sl = parseInt(Value.parentElement.parentElement.children[2].children[1].value);
        }
      } catch (e) {
        console.error("Error encountered: " + e);
        sl = parseInt(Value.parentElement.parentElement.children[2].children[1].value);
      }
      // console.log(sl);  // Kiểm tra kết quả của sl
      // let sl =(parseInt(Value.parentElement.parentElement.children[1].children[1].value)) ;
      // // 
      // console.log(Value.parentElement.parentElement.children[2].children[1].value);
      // console.log("hi");
      let number = document.querySelector(".ri-shopping-cart-line");
      if (productIndex !== -1 && usercart.cart[productIndex].size == Size) {
        usercart.cart[productIndex].quantity += sl;

      } else {
        console.log("chưa  có sản phẩm");
        // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
        usercart.cart.push({
          id: productId,
          size: Size,
          quantity: sl
        });
        console.log(usercart);
      }
      // cart.forEach((V) => {
      //   console.log(V);
      // })
      localStorage.setItem('user', JSON.stringify(usercart));
      console.log("hiện tại");
      console.log(usercart);
      console.log(JSON.parse(localStorage.getItem('user')));
      let userList = (JSON.parse(localStorage.getItem('userList'))) || [];
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].data.name === usercart.data.name && userList[i].data.password == usercart.data.password) {
          userList[i] = usercart;

        }
      }
      localStorage.setItem('userList', JSON.stringify(userList));
      console.log("sau khi thêm");
      console.log(JSON.parse(localStorage.getItem('userList')));
      setcart();
      // document.querySelector(".ri-shopping-cart-line").setAttribute('number', sl);

    });


  });
}




//Giỏ hàng

document.querySelector(".ri-shopping-cart-line").addEventListener("click", () => {

})

///Chi tiết sản phẩm
function showProductDetail() {
  console.log("hihi");
  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');
  id = (id == null) ? 1 : id;
  console.log(id);
  let pd;
  product.forEach((value) => {
    if (id == value.id) {
      pd = value;
    }
  })
  console.log(document.querySelector('script.showhotproduct'));

  let output = document.querySelector('.body').innerHTML;
  let valueoutput = "";
  valueoutput += `    <section class="product-detail p-to-top">
      <div class="container">
        <div class="row-flex row-flex-product-detail">
          <p>Sản phẩm</p>
          <i class="ri-arrow-right-line"> </i>
          <p>${pd.title}</p>
        </div>
        <div class="row-grid">
          <div class="product-detail-left">
            <img class="product-image-main"
              src="./../${pd.img[0]}" alt="" />
            <div class="product-image-items">`;
  pd.img.forEach((image) => {
    valueoutput += `<img src="./../${image}" alt="" />`;
    // valueoutput = valueoutput + `< img class="" src = "${image}" alt = "" />`;
  });
  valueoutput += `
            </div >
          </div >
      <div class="product-detail-right" id="${pd.id}">
        <div class="product-detail-right-info" id="S">
          <h1>${pd.title}</h1>
          <span>100% Coton</span>
          <div class="product-price">
            <p>200.000đ <del>300.000đ</del></p>
          </div>
        </div>
        <div class="product-detail-right-des">
          <h2>Đặc điểm nổi bật</h2>
          <ul>`
  pd.introduce.forEach((intro) => {
    valueoutput += `<li>${intro}</li>`;
  })

  valueoutput += `
          </ul >
        </div >
        <div class="product-detail-right-quantity">
         <div id="S" class="size-jss">
                               <button class="button-1-mini size-js active" id="S">S</button>
                               <button class="button-1-mini size-js" id="M">M</button>
                               <button class="button-1-mini size-js" id="L">L</button>
                               <button class="button-1-mini size-js" id="XL">XL</button>
                               </div>
          <h2>Số lượng:</h2>
          <div class="product-detail-right-quantity-input" id="${pd.id}">
            <i class="ri-subtract-fill"></i>
            <input class="quantity-input" type="number" value="1" />
            <i class="ri-add-line"></i>

        </div>
        <div class="product-detail-right-addcart">
          <button class="main-btn add-cart-js">Thêm vào giỏ hàng</button>
        </div>
         </div>
      </div >
        </div >
      <div class="row-flex">
        <div class="product-detail-content">
          <h2>Chi tiết sản phẩm</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatem facere, nulla provident delectus distinctio ad. Magni,
            facilis obcaecati rem eos nisi incidunt eius nobis adipisci ipsam
            explicabo dolore odio sit? Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Dolorem fugit corporis nesciunt! Temporibus quos
            odio cumque voluptates sunt aspernatur nostrum? Adipisci iure nisi
            reiciendis dignissimos ullam cupiditate quas, maxime ex!
          </p>
          <!-- <img src="asset/image/image-baner.jpg" alt="" /> -->
        </div>
      </div>
      </div >
    </section > `;
  console.log("điều hướng rồi");
  document.querySelector('.body').innerHTML = valueoutput;
  console.log(document.querySelector('.body'));
  showimgpd();
  //  document.querySelector(".product-image-items").firstElementChild;
  // document.querySelector(".showhotproduct").firstChild.innerHTML;
  // console.log(document.querySelector(".showhotproduct").firstChild.innerHTML);
  window.scrollTo(0, 0);
  // load();

}
function dieu_huong(a, b) {
  //id sanpham
  if (a == "ctsp") {
    let url = new URL(window.location.href);
    console.log("1");
    if (url.pathname == '/WEB/Webct/index.html') {
      location.href = `./user/ProductDetail.html?id=${b}`;
      load();
    }
    else {
      console.log("sai");
      location.href = `./ProductDetail.html?id=${b}`;
      load();
    }
    // show_product('hot', 'product-hot-js', '../', 3);
  }
  else if (a == "dk") {

  }
  else {
    console.log("hihi");
  }
}

//click vào sp
function clickproduct() {
  document.querySelectorAll(".hot-product-image").forEach((value) => {
    value.addEventListener('click', function () {
      // document.querySelector('script.showhotproduct').innerHTML = document.querySelector('script.showhotproduct').innerHTML.replace('11', '3');
      let productId = this.closest('.hot-product-item').id;
      console.log(productId);
      dieu_huong("ctsp", productId);
      // history.replaceState(null, '', './ProductDetail.html?html');
    });
  })

}
load();
function load() {

  console.log("đg load");
  clickproduct();
  chonsize();
  Themslsp();
  GiamSLSP();
  setcart();
  clickSearch();
  addcart();
  PhanTrang();
  clickaccount();
  // let url = new URL(window.location.href);
  // console.log(`url hiện tại: ${url}`)

  document.querySelector(".sign-in-js").addEventListener(("click"), function () {
    let tmp = document.querySelector('.s-js').style.display;
    console.log(tmp);
    console.log(document.querySelector('.s-js'));
    if (tmp === "none") {
      document.querySelector('.s-js').style.display = "flex";
    }
  });
  document.querySelector(".register-js").addEventListener(("click"), function () {
    let tmp = document.querySelector('.r-js').style.display;
    console.log(tmp);
    console.log(document.querySelector('.r-js'));
    if (tmp === "none") {
      console.log("hi");
      document.querySelector('.r-js').style.display = "flex";
    }
  });
  // document.querySelector(".s-js").addEventListener("click", function () {
  //   let tmp = document.querySelector('.s-js').style.display;
  //   if (tmp !== 'none') {
  //     document.querySelector('.s-js').style.display = "none";
  //   }
  // })
  // document.querySelector(".form-wrapper").addEventListener("click", function () {

  // })
  // document.querySelector(".r-js").addEventListener("click", function () {

  //   let tmp = document.querySelector('.r-js').style.display;
  //   if (tmp !== 'none') {
  //     document.querySelector('.r-js').style.display = "none";
  //   }
  // })

  const bodySignup = document.querySelectorAll('.body-signup');
  const formWrapper = document.querySelectorAll('.form-wrapper');
  const closeBtn = document.querySelectorAll('.close-btn');
  const body = document.querySelector('.body-signup');

  // Thêm sự kiện click vào nút đóng để ẩn form đăng ký
  closeBtn.forEach((close) => {
    close.addEventListener('click', function () {

      bodySignup.forEach((value) => {
        if (value.style.display != 'none') {
          console.log(value.style.display);
          console.log("HTD");
          value.style.display = 'none'; // 
        }
      })
    });
  })


  // document.addEventListener('click', function (event) {
  //   // Kiểm tra nếu click ở ngoài form-wrapper (form đăng ký)

  //   if (!formWrapper.contains(event.target) && !body.contains(event.target) && !document.querySelector('.sign-in-js').contains(event.target) && !document.querySelector('.register-js').contains(event.target)) {
  //     bodySignup.forEach((value) => {

  //       if (value.style.display !== 'none') {
  //         value.style.display = 'none';
  //         console.log("hihihi");
  //       }
  //     })

  //     // Ẩn form đăng ký nếu click ngoài form
  //   }
  // });


  //Ẩn form đăng ký/đăng nhập
  function DK() {


    document.addEventListener('click', function (event) {
      let fr1 = document.querySelector('.fws-js');
      let fr2 = document.querySelector('.fwr-js');

      //Kiểm tra xem trang nào đang được mở
      if (document.querySelector('.s-js').style.display != 'none') {

        if (!fr1.contains(event.target) && !document.querySelector('.sign-in-js').contains(event.target) && !document.querySelector('.submit-button').contains(event.target)) {
          document.querySelector('.s-js').style.display = 'none';
        }
      }
      if (document.querySelector('.r-js').style.display != 'none') {

        if (!fr2.contains(event.target) && !document.querySelector('.register-js').contains(event.target) && !document.querySelector('.sign-up-button').contains(event.target)) {
          document.querySelector('.r-js').style.display = 'none';
          console.log("nút đăng ký");
        }
      }

    })
  }


  // Thêm sự kiện để hiển thị form đăng ký (ở nơi bạn muốn gọi nó)

}
//Tìm kiếm sản phẩm
function clickSearch() {
  document.querySelector(".header-search").addEventListener("click", function () {

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

}


//Phân trang:))))
function PhanTrang() {
  console.log("test hàm");
  document.querySelectorAll(".share-pg-mini").forEach((value) => {
    value.addEventListener("click", function () {
      const activeButton = document.querySelector(".share-pg-mini.active");
      // Kiểm tra nếu nút không phải là spml, spmr và chưa có class "active"
      if (!value.classList.contains("active") && !value.classList.contains("spml") && !value.classList.contains("spmr")) {
        // Xóa lớp "active" khỏi tất cả các nút
        document.querySelectorAll(".share-pg-mini").forEach((btn) => {
          btn.classList.remove("active");
        });
        // Thêm lớp "active" vào nút vừa nhấn
        value.classList.add("active");
      }

      // Xử lý trường hợp nhấn nút "spml" (<<)
      if (value.classList.contains("spml")) {

        const activeButton = document.querySelector(".share-pg-mini.active");
        if (activeButton.previousElementSibling && activeButton.previousElementSibling.classList.contains("share-pg-mini")) {
          // Di chuyển active sang nút trước

          if (!activeButton.previousElementSibling.classList.contains("spml")) {
            activeButton.classList.remove("active");
            activeButton.previousElementSibling.classList.add("active");
          }

        }
      }

      // Xử lý trường hợp nhấn nút "spmr" (>>)
      if (value.classList.contains("spmr")) {

        const activeButton = document.querySelector(".share-pg-mini.active");
        if (activeButton.nextElementSibling && activeButton.nextElementSibling.classList.contains("share-pg-mini")) {
          // Di chuyển active sang nút sau
          if (!activeButton.nextElementSibling.classList.contains("spmr")) {
            activeButton.classList.remove("active");
            activeButton.nextElementSibling.classList.add("active");
          }


        }
      }

      if (activeButton != document.querySelector(".share-pg-mini.active")) {
        ///Chuyển trang
        let page = document.querySelector(".share-pg-mini.active").textContent;
        show_product("all", 'product-all-js', './../', '', page);
        load();

      }
    });
  });



}

function clickaccount() {
  document.addEventListener("DOMContentLoaded", function () {
    const accountIcon = document.getElementById("accounts-icon");
    const accountMenu = document.getElementById("account-menu");

    // Toggle menu visibility when the icon is clicked
    accountIcon.addEventListener("click", function () {
      accountMenu.style.display = accountMenu.style.display === "block" ? "none" : "block";
    });

    // Close menu if clicking outside
    document.addEventListener("click", function (event) {
      if (!accountIcon.contains(event.target) && !accountMenu.contains(event.target)) {
        accountMenu.style.display = "none";
      }
    });
  });

  document.getElementById("logout").addEventListener("click", function (e) {
    // e.preventDefault();
    // Xóa thông tin người dùng (nếu sử dụng localStorage/sessionStorage)
    localStorage.removeItem("user");
    // Chuyển hướng đến trang đăng nhập
    document.querySelector(".header-account").style.display = "none";
    document.querySelector(".show-signup").style.display = "";
    setcart();

  });


}