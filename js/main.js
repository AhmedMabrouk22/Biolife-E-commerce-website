
let overlay = document.querySelector(`.overlay`);
let footerMobile = document.querySelector(`.mobile-footer`);
let scrollBtn = document.querySelector(`.scrollBtn`);
let specialSlider = document.querySelector('.special-slide');
let middelHeader = document.querySelector(`.middel-header`);

window.addEventListener("scroll",scrollFunction);

scrollBtn.firstElementChild.onclick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
}

function showOverlay() {
    if (!overlay.classList.contains("open")) {
        overlay.classList.add("open")
    } else {
        overlay.classList.remove("open")
    }
}

function changeNavState() {

}

function scrollFunction() {

    if (specialSlider === null) return;

    if (document.documentElement.scrollTop >= specialSlider.scrollHeight + specialSlider.clientHeight) {
        if (!scrollBtn.classList.contains("open")) {
            scrollBtn.classList.add("open")
        } 
    } else {
        if (scrollBtn.classList.contains("open")) {
            scrollBtn.classList.remove("open")
        } 
    }

    let x = window.matchMedia("(min-width: 992px)")

    if (document.documentElement.scrollTop >= specialSlider.scrollHeight + 250 && x.matches) {
        if (!middelHeader.classList.contains("fixed-state")) {
            middelHeader.classList.add("fixed-state")
        }
    } else {
        if (middelHeader.classList.contains("fixed-state")) {
            middelHeader.classList.remove("fixed-state")
        }
    }

}

//****************** Mobile Menu ******************* */
let openMenuBtn = document.querySelector(`.middel-header .cart-info .menu-mobile a`);
let footertMobileOpenBtn = document.querySelector(`.footer-mobile-menu`);
let closeMenuBtn = document.querySelector(`.main-panel .head .panel-icon.close`);
let mobileMenu = document.querySelector(`.main-panel`);
let history = [];
let undoBtn = document.querySelector(`.main-panel .head .panel-icon.undo`);
let headTitle = document.querySelector(`.main-panel .head .title`);

let openGlobelMenuBtn = document.querySelector(`.globel-footer-menu`)
let globelMenu = document.querySelector(`.global-panel`);
let closeGlobelMenuuBtn = document.querySelector(`.global-panel .head .panel-icon.close`);

openMenuBtn.addEventListener("click",openMobileMenu);
footertMobileOpenBtn.addEventListener("click",openMobileMenu);
closeMenuBtn.addEventListener("click",openMobileMenu);
undoBtn.addEventListener("click", closeSubMenu);

openGlobelMenuBtn.addEventListener("click",openGlobelMenu);
closeGlobelMenuuBtn.addEventListener("click",openGlobelMenu);

function openGlobelMenu() {
    globelMenu.classList.toggle("open");
    showOverlay();
}

function openMobileMenu() {
    mobileMenu.classList.toggle("open");
    showOverlay();
}

function getCurrentMenuData(cur) {
    let curMenuId = cur.getAttribute("id");
    let curMenuName = headTitle.textContent;
    let obj = {id:curMenuId,name:curMenuName};
    history.push(obj);
}

function getNewMenuData(cur) {
    let newMenuId = cur.getAttribute(`menu-target`);
    let newMenu = document.querySelector(newMenuId);
    newMenu.classList.add('open');
    newMenu.classList.add("cur-open");
    let newMenuName = cur.previousElementSibling.textContent;
    return newMenuName;
}

function openSubMenu(cur) {
    let curMenu = document.querySelector(".panel.cur-open");
    curMenu.classList.remove("cur-open");
    getCurrentMenuData(curMenu);
    curMenu.classList.add(`subOpen`);
    undoBtn.style.display="block";
    headTitle.textContent = getNewMenuData(cur);

}

function closeSubMenu() {
    
    let curMenu = document.querySelector(`.panel.cur-open`);
    curMenu.classList.remove(`cur-open`);
    curMenu.classList.remove(`open`);

    obj=history.pop();
    let newMenuId = obj.id;
    let newMenuName = obj.name;
    let newMenu = document.querySelector(`#${newMenuId}`);
    headTitle.textContent = newMenuName;
    newMenu.classList.remove(`subOpen`);
    newMenu.classList.add('cur-open');

    if (history.length === 0) {
        undoBtn.style.display="none";
        return;
    }

}

//***************** Mobile Serach *******************//
let mobileSearch = document.querySelector(`.mobile-search-contnet`);
let openMobileSearchBtn = document.querySelector(`.middel-header .cart-info .mobile-search a`);
let closeMobileSearchBtn = document.querySelector(`.mobile-search-contnet .close`);

openMobileSearchBtn.addEventListener("click",openMobileSearch);
closeMobileSearchBtn.addEventListener("click",openMobileSearch);


function openMobileSearch() {
    mobileSearch.classList.toggle("open");
    overlay.classList.toggle("open");
}

//******************** Slider ***********************//

let allSliders = document.querySelectorAll(`.slider`);
let slidersArray = Array.from(allSliders);

slidersArray.forEach(slide => {
    creatrDots(slide);
})

function creatrDots(slider) {

    let mainUl = document.createElement("ul");
    mainUl.classList.add("slider-dots");
    mainUl.classList.add("flexitem");

    for(let i = 0 ; i < slider.children[1].children.length ; ++i) {
        let liElm = document.createElement("li");
        liElm.setAttribute("index",i+1);
        mainUl.appendChild(liElm);
    }

    mainUl.children[0].classList.add("active");
    slider.appendChild(mainUl);

    let sliderList = slider.children[1];
    let itemWidth = sliderList.children[0].clientWidth;
    for(let i = 0 ; i < mainUl.children.length; ++i) {
        mainUl.children[i].onclick = function () {
            removeActive(mainUl);
            sliderList.scrollLeft = i*itemWidth;
            mainUl.children[i].classList.add("active");
        }

    }

}

function removeActive(ul) 
{
    for(let i = 0 ; i < ul.children.length; ++i) {
        if (ul.children[i].classList.contains("active")) {
            ul.children[i].classList.remove("active")
            return;
        }
    }
}

function moveNxt(curBtn) {
    let par = curBtn.parentElement;
    let sliderList = par.children[1];
    let firstItem = sliderList.children[0];
    let style = window.getComputedStyle(firstItem);
    let sliderListGap = parseInt(window.getComputedStyle(sliderList).gap) || 0;
    if (sliderList.scrollLeft < sliderList.scrollWidth) {
        sliderList.scrollLeft += firstItem.clientWidth + parseInt(style.marginLeft) + parseInt(style.marginRight) + sliderListGap;
    }
}

function movePrv(curBtn) {
    let par = curBtn.parentElement;
    let sliderList = par.children[1];
    let firstItem = sliderList.children[0];
    let style = window.getComputedStyle(firstItem);
    let sliderListGap = parseInt(window.getComputedStyle(sliderList).gap) || 0;
    if (sliderList.scrollLeft < sliderList.scrollWidth) {
        sliderList.scrollLeft -= firstItem.clientWidth + parseInt(style.marginLeft) + parseInt(style.marginRight) + sliderListGap;
    }
}

//*************** Header ***************//
let allDropdwonMenus = document.querySelectorAll(`.nice-drobdown`);

function showDropdownMenu(cur) {
    cur.nextElementSibling.classList.toggle(`list-open`);
    cur.nextElementSibling.nextElementSibling.classList.toggle("open");
}

function changeMenuHead(cur) {
    let par = cur.parentNode;

    for(let i = 0 ; i < par.childNodes.length; ++i) {
        if (par.childNodes[i].classList !== undefined && par.childNodes[i].classList.contains("active")) {
            par.childNodes[i].classList.remove("active");
            break;
        }

    }

    let curSelect = par.previousElementSibling.previousElementSibling;
    curSelect.textContent = cur.childNodes[0].textContent;
    cur.classList.add("active");
    par.classList.toggle("open");
    par.previousElementSibling.classList.toggle("list-open");
} 

function showSecondMenu(cur) {
    cur.children[2].classList.toggle(`list-open`);
    cur.nextElementSibling.classList.toggle(`open`);
}



//************** Related Products *******************//

let headTabs = Array.from(document.querySelectorAll(`.related-products .tab-box .tab-head .tabs .tab`));

function tabClick(elm) {
    removeTabActive();
    elm.classList.add("active");
    let activeTab = document.querySelector(`.related-products .tab-box .tab-content .tab-table.active`);
    activeTab.classList.remove("active");
    let tabNumber = elm.getAttribute("tab-number");
    let curTab = document.querySelector(`#${tabNumber}`);
    curTab.classList.add("active");
}

function removeTabActive() {

    for (let i = 0 ; i < headTabs.length ; ++i) {
        
        if (headTabs[i].classList.contains("active")) {
            headTabs[i].classList.remove("active");
            return;
        }
    }

}


//******************** Cart *********************** */
let productsDiv = document.querySelector(`.middel-header .cart-info .cart-content .content .products`);
let messegeTxt = document.querySelector(`.middel-header .cart-info .cart-content .empty-txt`);
let cartBtns = document.querySelector(`.middel-header .cart-info .cart-content .content .buttons`);
let cartNumber = document.querySelector(`.middel-header .cart-info .minicart a .item-numbers`);
let cartTotal = document.querySelector(`.middel-header .cart-info .minicart .minicart-head .text span.total`);
let total = 0.00;
let oldValue;

function checker() {
    if (productsDiv.children.length > 0) {
        if (productsDiv.classList.contains("empty")) {
            productsDiv.classList.remove("empty");
        }

        if (cartBtns.classList.contains("empty")) {
            cartBtns.classList.remove("empty");
        }        

        if (messegeTxt.classList.contains("empty")) {
            messegeTxt.classList.remove("empty");
        }  
    } else {
        if (!productsDiv.classList.contains("empty")) {
            productsDiv.classList.add("empty");
        }

        if (!cartBtns.classList.contains("empty")) {
            cartBtns.classList.add("empty");
        }        

        if (!messegeTxt.classList.contains("empty")) {
            messegeTxt.classList.add("empty");
        }  
    }
    cartNumber.textContent = productsDiv.children.length;
}

function getProductData(id) {
    let productDiv = document.querySelector(`.related-products .tab-box .tab-content .tab-table .${id}`);
    let img = productDiv.querySelector(`.product-thumb a`);
    let name = productDiv.querySelector(`.product-info h4 a`);
    let price = productDiv.querySelector(`.product-info .price`);

    let productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.classList.add("flexitem");
    productItem.classList.add(id);

    productItem.innerHTML = `<div class="actions">
        <button onclick = "editCart(this)" product-target = "${id}" btn-type="edit" class="edit"><i class="fa fa-pencil"></i></button>
        <button onclick = "removeFromCart(this)" product-target = "${id}" class="del"><i class="fal fa-trash-alt"></i></button>
    </div>
    <div class="product-thumb">
        ${img.innerHTML}
    </div>
    <div class="product-info">
        <h4 class="product-title">${name.textContent}</h4>
        <div class="price">
            ${price.innerHTML}
        </div>
        <div class="quntity">
            <label>Quntity: </label>
            <input type="number" value="1" disabled>
        </div>
    </div>`;

    return productItem;
}

function addToCart(cur) {
    let productID = cur.getAttribute("product-target");
    let product = getProductData(productID);
    let isFound = productsDiv.querySelector(`.${productID}`);
    if (isFound === null) {
        let price = product.querySelector(`.product-info .price .cur`);
        total += parseFloat(price.textContent.slice(1));
        cartTotal.textContent = `$${total}`;
        productsDiv.prepend(product);
    } else {
        incQuntity(productID);
    }
    checker();
}

function removeFromCart(cur) {
    let productID = cur.getAttribute("product-target");
    let productDiv = productsDiv.querySelector(`.${productID}`);
    let price = productDiv.querySelector(`.product-info .price .cur`);
    let quntityElm = productDiv.querySelector(`.quntity input[type="number"]`);

    let num = parseInt(quntityElm.value);
    total -= parseFloat(price.textContent.slice(1)) * num;
    cartTotal.textContent = `$${total}`;

    productDiv.remove();
    checker();
}

function editCart(cur) {
    let productID = cur.getAttribute("product-target");
    let btnType = cur.getAttribute("btn-type");
    let productDiv = productsDiv.querySelector(`.${productID}`);
    let quntityElm = productDiv.querySelector(`.quntity input[type="number"]`);
    let price = productDiv.querySelector(`.product-info .price .cur`);


    if (btnType === "edit") {
        quntityElm.removeAttribute("disabled");
        cur.innerHTML = `<i class="fas fa-check"></i>`;
        cur.style.color = "#E73918";
        cur.setAttribute("btn-type","edit-state");
        oldValue = parseInt(quntityElm.value);
    } else {
        quntityElm.setAttribute("disabled","");
        cur.innerHTML = `<i class="fa fa-pencil"></i>`;
        cur.style.color = "#333333";
        cur.setAttribute("btn-type","edit");

        let newValue = parseInt(quntityElm.value);
        let diff = newValue - oldValue;

        total += parseFloat(price.textContent.slice(1)) * diff;
        cartTotal.textContent = `$${total}`;
        oldValue = 0;
    }

    
}

function incQuntity(id) {
    let productDiv = productsDiv.querySelector(`.${id}`);
    let quntityElm = productDiv.querySelector(`.quntity input[type="number"]`);

    let price = productDiv.querySelector(`.product-info .price .cur`);
    total += parseFloat(price.textContent.slice(1));
    cartTotal.textContent = `$${total}`;

    let val = parseInt(quntityElm.value);
    quntityElm.value = val + 1;

}

//************** product-quickview ********************/
let quickview = document.querySelector(`.product-quickview`);
let closeBtn = document.querySelector(`.product-quickview .close`);
let inputText = document.querySelector(`.product-quickview .product-details .add-cart .input-number .in-text`);
let upBtn = document.querySelector(`.product-quickview .product-details .add-cart .input-number .btn-up`);
let downBtn = document.querySelector(`.product-quickview .product-details .add-cart .input-number .btn-down`);
let quickviewSlider = document.querySelector(`.product-quickview .product-img .slider-list`);
let imgPreview = document.querySelector(`.product-quickview .product-img .img-preview`);

upBtn.addEventListener("click", () => {
    let val = parseInt(inputText.value);
    inputText.value = val + 1;
})

downBtn.addEventListener("click", () => {
    let val = parseInt(inputText.value);
    if (val <= 1) {
        return;
    }
    inputText.value = val - 1;
})

closeBtn.addEventListener("click",showQuickview);

function showQuickview() {
    quickview.classList.toggle("open");
    overlay.classList.toggle("open");
}

function showImage(cur) {
    imgPreview.innerHTML = cur.innerHTML;
}

function quickviewMoveNxt() {
    let sliderList = quickviewSlider;
    let curItem = document.querySelector(`.product-quickview .product-img .slider-item.active`);
    if (curItem.nextElementSibling && sliderList.scrollLeft < sliderList.scrollWidth) {
        curItem.classList.remove("active");
        sliderList.scrollLeft += 91 + 10;
        curItem.nextElementSibling.classList.add("active");
        showImage( curItem.nextElementSibling);
    }
}

function quickviewMovePrv() {
    let sliderList = quickviewSlider;
    let curItem = document.querySelector(`.product-quickview .product-img .slider-item.active`);
    if (curItem.previousElementSibling && sliderList.scrollLeft < sliderList.scrollWidth) {
        curItem.classList.remove("active");
        sliderList.scrollLeft -= 91 + 10;
        curItem.previousElementSibling.classList.add("active");
        showImage( curItem.previousElementSibling);
    }
}

for(let i = 0 ; i < quickviewSlider.children.length; ++i) {
    quickviewSlider.children[i].onclick = function () {
        removeActive(quickviewSlider);
        quickviewSlider.scrollLeft = i*(91 + 10);
        showImage(quickviewSlider.children[i]);
        quickviewSlider.children[i].classList.add("active");
    }

}


//****************** Countdown **********************//

let counts = document.querySelectorAll(`.top-rated .deals-of-day .product-item .countdown`);
let second = 59;
let mint = 59;
let hours = 24;
let days = 5;

let count1 = setInterval(()=>{

    let dayNumber = counts[0].querySelector(`.countdown .days .numbers`);
    let hoursNumber = counts[0].querySelector(`.countdown .hours .numbers`);
    let minNumber = counts[0].querySelector(`.countdown .mins .numbers`);
    let secNumber = counts[0].querySelector(`.countdown .secs .numbers`);
    

    second -=1;
    if (second < 0) {
        second = 59;
        mint -=1;
    }

    if (mint < 0 && second == 59) {
        mint = 59;
        hours -= 1;
    }

    if (hours == 0 && mint == 59) {
        hours = 24;
        days -= 1;
    }

    if (days == 0 && hours == 0 && mint == 0 && second == 0) {
        clearInterval(count1);
    }  
    
        dayNumber.textContent = (days >= 10 ? days : `0${days}`);
        hoursNumber.textContent = (hours >= 10 ? hours : `0${hours}`);
        minNumber.textContent = (mint >= 10 ? mint : `0${mint}`);
        secNumber.textContent = (second >= 10 ? second : `0${second}`);
    

},1000);

document.body.addEventListener("click", (e) => {

    allDropdwonMenus.forEach(elm => {
        if (!elm.contains(e.target) && elm.children[2].classList.contains("open")) {
            showDropdownMenu(elm.children[0]);
        }
    })


    if (mobileMenu.classList.contains("open") && !mobileMenu.contains(e.target) 
        && e.target != openMenuBtn.children[0]) {
        if (!footerMobile.contains(e.target)) {
            openMobileMenu();
        }
    }

    if (globelMenu.classList.contains("open") && !globelMenu.contains(e.target)) {
        if (!footerMobile.contains(e.target)) {
            openGlobelMenu();
        }
    }


    if (mobileSearch.classList.contains("open") && !mobileSearch.contains(e.target) && e.target != openMobileSearchBtn.children[0]) {
        openMobileSearch();
    }

})

