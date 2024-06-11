// event el

const addEventOnElement = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback)
        }
    } else {
        elem.addEventListener(type, callback)
    }
}



// toggle navbar
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-navlink]");
const navToggler = document.querySelector("[data-nav-toggler]");
const header = document.querySelector('[data-header]');
const backTop = document.querySelector('[data-back-to-top]');
// drop down menu info
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdwon-menu");
const links = document.querySelectorAll(".navbar-link");
const dropdownBtnB = document.querySelectorAll('#drop-btn2');
// shop section information
const buyBtn = document.querySelectorAll(".buy-btn");
const addRemoveBtn = document.querySelectorAll(".add-remove span");
const productQuantity = parseInt(document.querySelector(".add-remove output"));
const popUpContainer = document.querySelector('.popup-container');
const closePopUp = document.querySelector('.close-btn');
var changeNumber = document.getElementById('output');
// const itemPrice = document.querySelectorAll('.price');

// form information's
const nameOfProduct = document.querySelector('.product-name');
var subTotal = (document.querySelector('.subtotal-element'));
var taxes = document.querySelector('.taxes');
var total = document.querySelector('.total-element');
const orderBtn = document.querySelector('.oreder-now');
const restBtn = document.querySelector('.rest-form')


// for values 
const orderForm = document.querySelector('#order-form')
const nameElement = document.querySelector('.name')
const emailElement = document.querySelector('.email')
const addressElement = document.querySelector('.address')
const postalCodeElement = document.querySelector('.postal-code')
const cityElement = document.querySelector('.city')
const numberElement = document.querySelector('.number')
const companyElement = document.querySelector('.company')
const orderBtnAnimation = document.querySelector('.order')






// var newValue = document.getElementById("output").innerHTML


// buyBtn.forEach((btn) => {
//     // console.log(btn)
//     btn.addEventListener('click', (event) => {
//         // console.log('working')
//         // popUpContainer.classList.add('active')
//         const parentCard = event.target.closest('.shop-card');
//         // console.log(parentCard)
//         const priceElement = parentCard.querySelector('.price');
//         const productElement = parentCard.querySelector('.card-title');
//         const productName = productElement.textContent.trim();
//         var price = parseFloat(priceElement.textContent.trim());
//         // console.log('Name:', productName);
//         console.log('Price:', price);
//         nameOfProduct.innerHTML = productName;
//         globalProductName = productName;
//         subTotal = price;
//         document.querySelector('.subtotal-element').innerHTML = `$ ${price}`;
//         calculateTax(subTotal);
//         calculateTotal(subTotal, calculateTax(subTotal));
//     })
// })



if (orderBtn) {
    orderBtn.onclick = (event) => {
        const requiredFields = orderForm.querySelectorAll('input[required]')
        let isFormValid = true;

        requiredFields.forEach(input => {
            if (input.value.trim() === "") {
                isFormValid = false;
                return;
            }
        })
        if (isFormValid) {
            console.log('form length', orderForm.value)
            orderBtnAnimation.classList.add('active')
            buyItem(orderBtnAnimation)
            orderForm.reset()
            // window.location.href = ('orderconfirmed.html')
        } else {
            alert('Make sure your form is filled ')
        }

        // popUpContainer.classList.remove('active')
    }
}

if (closePopUp) {
    closePopUp.onclick = () => {
        popUpContainer.classList.remove('active')
        // console.log(popUpContainer == true)

    }

}
const anyThing = async (id) => {
    popUpContainer.classList.add('active');

    try {
        const products = await fetchProducts();
        const item = products.find(item => item.id === id);

        if (!item) {
            console.error(`Product with id ${id} not found`);
            return;
        }

        const firmPrice = parseInt(item.productPrice);
        let subTotal = firmPrice;
        let newChangeNumber = 4; // Assuming initial quantity is 4

        nameOfProduct.innerHTML = item.productName;
        document.querySelector('.subtotal-element').innerHTML = `$${subTotal.toFixed(2)}`;

        const updateTotals = (subTotal) => {
            const tax = calculateTax(subTotal);
            const total = calculateTotal(subTotal, tax);
            // Update UI elements for tax and total if needed
        };

        updateTotals(subTotal);

        addRemoveBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                const action = btn.innerText;

                if (action === '-' && newChangeNumber > 4) {
                    newChangeNumber -= 1;
                    subTotal -= firmPrice / 4;
                } else if (action === '+') {
                    newChangeNumber += 1;
                    console.log(changeNumber)
                    subTotal += firmPrice / 4;
                } else {
                    alert('Cannot make orders less than 4');
                    return;
                }

                document.getElementById("output").innerHTML = newChangeNumber;
                document.querySelector('.subtotal-element').innerHTML = `$${subTotal.toFixed(2)}`;

                updateTotals(subTotal);
            });
        });
        if (restBtn) {
            restBtn.onclick = () => {

                console.log('resetinggg', item.id)
                const firmPrice = parseInt(item.productPrice);
                subTotal = firmPrice;
                newChangeNumber = 4; // Assuming initial quantity is 4
                changeNumber.textContent = 4
                console.log(changeNumber)


                document.querySelector('.subtotal-element').innerHTML = `$${subTotal.toFixed(2)}`;

                const updateTotals = (subTotal) => {
                    const tax = calculateTax(subTotal);
                    const total = calculateTotal(subTotal, tax);
                    // Update UI elements for tax and total if needed
                };

                updateTotals(subTotal);
            }
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};



function calculateTax(amount) {
    console.log(amount)
    pluTaxAmount = (amount * 0.13)
    return document.querySelector('.taxes').innerHTML = `$ ${Math.floor(pluTaxAmount * 100) / 100}`
}

function calculateTotal(subtotal, taxes) {
    var cleanedTaxes = "";
    for (var i = 0; i < taxes.length; i++) {
        if (taxes[i] !== ' ' && taxes[i] !== '$') {
            // console.log(taxes[i])
            cleanedTaxes += taxes[i];
        }
    }
    var cleanedTaxes = parseInt(cleanedTaxes)
    total = subtotal + (cleanedTaxes)
    console.log(total)
    return document.querySelector('.total-element').innerHTML = `$ ${Math.floor(total * 100) / 100}`
}




const togglerNavbar = function () {
    navbar.classList.toggle("active")
    navToggler.classList.toggle("active")

}

addEventOnElement(navToggler, 'click', togglerNavbar);

const closeNavbar = function () {
    navbar.classList.remove("active")
    navToggler.classList.remove("active")

}

addEventOnElement(navLinks, "click", closeNavbar)


// header active

window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        header.classList.add('active');
        backTop.classList.add('active');
    } else {
        header.classList.remove("active");
        backTop.classList.remove('active')
    }
});


// dropdown function 
function setAriaExpandedFalse() {
    dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdown() {
    dropdown.forEach((drop) => {
        drop.classList.remove("remove")
        drop.addEventListener("click", (e) => e.stopPropagation())
    });
}

dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const dropdownIndex = e.currentTarget.dataset.dropdown;
        // console.log(dropdownIndex)
        const dropdownElement = document.getElementById(dropdownIndex);

        dropdownElement.classList.toggle("active");
        // console.log(dropdownElement)



        // dropdown.forEach((drop) => {
        //     if (drop.id !== btn.dataset["dropdown"]) {
        //         drop.classList.remove("active")
        //     }
        // });
        btn.setAttribute(
            "aria-expanded",
            btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
        )
        e.stopPropagation()
    });

});

//  close dropdown menu when the dropdown links are clicked

links.forEach((link) => {
    link.addEventListener("click", (e) => {
        // console.log(link)
        e.stopPropagation();
        closeDropdown();
        setAriaExpandedFalse();
    });
});

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
    closeDropdown();
    setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        closeDropdown();
        setAriaExpandedFalse();
    }
})

// order style
const placeOrderAnimation = function (button) {
    // let button = this
    console.log(button)

    if (button && !button.classList.contains('animate')) {
        button.classList.add('animate');
        setTimeout(() => {
            button.classList.remove('animate');
            popUpContainer.classList.remove('active')
            window.location.href = 'index.html'
        }, 10000)

    }
};


// when click on oreder now.
const buyItem = async (button) => {
    console.log('working');

    const form = document.getElementById('order-form')
    const formData = new FormData(form)

    const formValues = {
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
        postalCode: formData.get('postal-code'),
        city: formData.get('city'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        quantity: document.getElementById('output').innerText,  // Get the quantity from the output element
        product: document.querySelector('.product-name').innerText,  // Get product name
        subtotal: document.querySelector('.subtotal-element').innerText,  // Get subtotal
        taxes: document.querySelector('.taxes').innerText,  // Get taxes
        total: document.querySelector('.total-element').innerText
    }



    const url = `http://127.0.0.1:5000/place-order`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formValues)
    };
    try {

        const response = await fetch(url, options)
        if (response.ok) {
            console.log('Confirmation email sent successfully');
        } else {
            console.error('Failed to send confirmation email');
        }
    } catch (error) {
        console.log('Error: ', error)

    }

    orderForm.classList.add('hide-form')
    console.log(button)


    placeOrderAnimation(button)


}


// CREATE UPDATE DELETE product page functionality ...
const onSubmit = async (event) => {
    event.preventDefault();

    console.log('submitting is working')


    const productForm = document.getElementById('product-formB')
    var productName = document.getElementById('product-name').value
    var productPrice = document.getElementById('product-price').value
    var productImg = document.getElementById('product-img').value
    var productQuantity = document.getElementById('product-quan').value
    var productFile = document.getElementById('product-file').files[0]



    const data = new FormData();
    data.append("productName", productName)
    data.append("productPrice", productPrice)
    data.append("productImg", productImg)
    data.append("productQuantity", productQuantity)

    if (productFile) { data.append("productFile", productFile) }

    console.log("dataaa", ...data)


    const url = ` https://dragonnier-site-be.onrender.com/create-product`;
    const options = {
        method: "POST",
        body: data
    };


    try {
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 201 && response.status === 200) {
            console.log('data is uploaded', data)
        } else {
            alert('Couldn\'t post product check the server ')
        }
    } catch (error) {
        console.error('Error', error)
        alert('An error occurred while uploading the product.');

    }

}




const fetchProducts = async () => {
    try {
        const response = await fetch('https://dragonnier-site-be.onrender.com/product')
        const data = await response.json()
        // console.log(data.products)
        const products = data.products
        return products

    } catch (error) {
        console.error('Not able to fetch data', error)
        
    }
}

const deleteProduct = async (id) => {
    try {
        console.log(id)
        const url = `https://dragonnier-site-be.onrender.com/delete-product/${id}`
        const options = {
            method: "DELETE"
        }
        const response = await fetch(url, options)
        console.log(response)
        if (response.status === 200) {
            console.log('Product was deleted successfully ')
            window.location.href = "post-product.html"
        } else { console.error('Failed to delete product') }
    } catch (error) { alert(error) }
}

const checkImgFiles = (path) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
        console.log('Is URL ')
        console.log(path)
        return false
    } else {
        console.log('Is File')
        return true
    }

}

// rendering products on the update page 
const createProductCard = (product) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="shop-card grid">
    <figure class="card-banner img-holder" style="--width: 860; --height: 645;">
      <img src="${product.productImg}" width="860" height="646" loading="lazy" alt="${product.productName}" class="img-cover">
    </figure>
    <div class="card-content">
      <h3 class="h3">
        <a href="#" class="card-title">${product.productName}</a>
      </h3>
      <p class="price-tag"> $<span class="price">${product.productPrice}</span> </p>
      <p class="price-tag"> Quantity: <span class="price"> ${product.productQuantity}</span> </p>
      <button class="btn btn-secondary edit" onClick=handleUpdating(${product.id})>Edit product</button>
      <button class="btn btn-secondary" onClick=handleId(${product.id}) >Delete product</button>
    </div>
  </div>
    `;


    return li;
}
//  rendering products on the index (home ) page 
const createProductCardInHome = (product) => {
    // console.log(product.length)
    const loading = document.querySelector('.section-loading')
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="${product.id === 1 ? "shop-card" : "shop-card grid"}"  id="first-grid">

    <figure class="card-banner img-holder" style="--width: 860; --height: 645;">
    <img src="${product.productImg}" width="860" height="646" loading="lazy" alt="${product.productName}" class="img-cover">
  </figure>

    <div class="card-content">
        
        <h3 class="h3">
            <a href="#" class="card-title">${product.productName}</a>
        </h3>
        <p class="price-tag"> $<span class="price">${product.productPrice}</span> </p>
        <div class="container buy-add-btn">
        
            <button class="btn btn-secondary buy-btn" onclick=anyThing(${product.id}) >Buy now</button>
        </div>
    </div>

    </div>
    `;
    const arrOb = Object.keys(product)
    console.log(loading, arrOb.length)
    if (arrOb.length > 0) {loading.classList.add('active')}

    return li;
}

// rendering products on the shop page 
const createProductCardInShop = (product) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="project-card">

        <figure class="card-banner img-holder" style="--width: 860; --height: 645;">
        <img src="${ product.productImg}" width="860" height="646" loading="lazy" alt="${product.productName}" class="img-cover">
      </figure>

            <div class="card-content">

                <h3 class="h3">${product.productName}</h3>

                <p class="card-subtitle">
                    $${product.productPrice}
                </p>

                <button class="btn btn-secondary buy-btn" onclick=anyThing(${product.id}) >Buy now</button>


            </div>

        </div>
        `;


    return li;
}


const handleId = (id) => {
    console.log('id', id)
    deleteProduct(id)

}

const handleUpdating = async (id) => {
    products = await fetchProducts()
    const productForm = document.getElementById('product-formB')
    var productName = document.getElementById('product-name').value
    var productPrice = document.getElementById('product-price').value
    var productImg = document.getElementById('product-img').value
    var productQuantity = document.getElementById('product-quan').value
    let updateNow = false



    popUpContainer.classList.add('active')
    console.log('updating is true what do u want to do ')
    console.log(products)
    item = (products.find(item => item.id === id))
    productForm[0].value = item.productName
    productForm[1].value = item.productPrice
    productForm[2].value = item.productImg
    productForm[3].value = item.productQuantity
    const updateBtn = document.getElementById('update-product')

    const data = {
        productName,
        productPrice,
        productImg,
        productQuantity
    }

    data.productName = item.productName
    data.productPrice = item.productPrice
    data.productImg = item.productImg
    data.productQuantity = item.productQuantity

    console.log(data)

    productForm[0].addEventListener("change", (e) => {
        data.productName = e.target.value
        console.log(productName)
    })
    productForm[1].addEventListener("change", (e) => {
        data.productPrice = e.target.value
    })
    productForm[2].addEventListener("change", (e) => {
        data.productImg = e.target.value
    })
    productForm[3].addEventListener("change", (e) => {
        data.productQuantity = e.target.value
    })




    updateBtn.onclick = (e) => {
        if (data.productName === item.productName && data.productPrice === item.productPrice && data.productImg === item.productImg && data.productQuantity === item.productQuantity) {
            alert("No updates are made make sure to update the product ")
        }

        else {
            getUpdatesInfo(data, id)
            e.stopPropagation()
            // window.location.href = ('post-product.html')
        }
    }
}

const getUpdatesInfo = async (data, id) => {
    console.log(data)
    console.log(id)

    const url = `https://dragonnier-site-be.onrender.com/update-product/${id}`
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }


    const response = await fetch(url, options)
    console.log('working', response)
    if (response.status === 201 && response.status === 200) {
        console.log('Data is updated successfully ')
    } else {
        const data = await response.json()
        alert('Couldn\'t post product check the server ', data)
    }


}

const renderProductCard = async () => {
    const productList = document.querySelector('.container .ul');
    const productList2 = document.querySelector('.container .pro');
    try {
        const products = await fetchProducts();
        console.log(products)
        products.forEach((product, index) => {
            // console.log(product)
            const card = createProductCard(product)
            const secondCard = createProductCardInHome(product)
            const thirdCard = createProductCardInShop(product)
            if (window.location.pathname === "/post-product.html" || window.location.pathname === "/post-product") {

                productList.appendChild(card)
            } if (window.location.pathname === "/shop.html" || window.location.pathname === "/shop") {

                productList.appendChild(thirdCard)

            } if ((window.location.pathname === "/index.html" || window.location.pathname === "/") && index <= 5) {
                console.log(window.location.pathname)
                console.log('second', index)
                productList2.appendChild(secondCard)
            }
        })
    } catch (error) { console.error('Error rendering product card: ', error) }
}


renderProductCard()

