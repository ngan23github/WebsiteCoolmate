function show_product(type, name, link, sl, page) {
    let output = document.querySelector(`.${name}`);

    let valueoutput = '';;

    console.log(`type: ${type} name ${name}  link ${link} sl ${sl}  page ${page}`);

    if (sl > 12 || page >= 1) {
        //Chỉ số bắt đầu, số lượng trang
        valueoutput = ShowProduct(12 * (page - 1), 12 * page - 1, type, link);
    }
    if (page == null) {

        valueoutput = ShowProduct(0, 11, type, link);
    }
    console.log("test");
    console.log(valueoutput);

    output.innerHTML = valueoutput;
    // <i class="fa-solid fa-cart-plus"></i>
    // <span>add to cart</span>

}

function ShowProduct(a, b, type, link) {
    let valueoutput = ` <div class="hot-product-container">`;

    let i = 0;
    let c = 0;
    console.log(`a: ${a}  b: ${b} type: ${type}  link ${link}`);
    product.forEach((value) => {
        if (c <= b) {
            let d = 1;
            value.type.forEach((value1) => {
                if ((value1 == type || type == "all") && d) {

                    i++;
                    if (i >= a) {
                        c++;
                        d = 0;
                        if (1 == c % 4) {
                            valueoutput += ` </div>
                            <div class="hot-product-container">`;
                        }
                        valueoutput += `  <div class="hot-product-item row-grid product-detail-js" id="${value.id}">
                     <div>
                        <div class="hot-product-image" >
                            <img src="${link + value.img[0]}" alt="" />
                        </div >
                        <div class="hot-product-info">
                            <h3>${value.title}</h3>
                            <span>100% Cotton</span>
                            <div class="product-price">
                                <p>200.000đ <del>${value.price}đ</del></p>
                            </div>
                            <div class="button-1" id="${value.id}">
                               <div id="S" class="size-jss">
                               <button class="button-1-mini size-js active" id="S">S</button>
                               <button class="button-1-mini size-js" id="M">M</button>
                               <button class="button-1-mini size-js" id="L">L</button>
                               <button class="button-1-mini size-js" id="XL">XL</button>
                               </div>
                               
                                  Số lượng:
                                <div class="product-detail-right-quantity-input" id="${value.id}">
                                 
                                <i class="ri-subtract-fill"></i>
                               
                                <input class="quantity-input" type="number"  value="1"/>
                                <i class="ri-add-line"></i>
                               
                                </div>
                                    <div class="product-detail-right-addcart">
              <button class="main-btn add-cart-js">Thêm vào giỏ hàng</button>
            </div>
                            </div>
                        </div>
            </div >
          </div > `
                    }
                }
            });
        }
    });
    valueoutput += `</div > `;
    console.log(`hàm ${valueoutput}`);
    return valueoutput;
}
